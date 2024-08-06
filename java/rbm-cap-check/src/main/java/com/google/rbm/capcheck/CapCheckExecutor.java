/*
Copyright 2021 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.google.rbm.capcheck;

// [START import_libraries]

import com.google.rbm.RbmApiHelper;
import com.google.api.services.rcsbusinessmessaging.v1.model.BatchGetUsersResponse;

import java.io.*;
import java.text.NumberFormat;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
// [END import_libraries]

/**
 * RCS Business Messaging bulk capability check execution.
 * <p>
 * The output of the script will show the potential reachability of the provided users based on random sampling. If your
 * RBM agent is launched, the script will also output all reachable phone numbers for the carriers in which your agent
 * is launched for.
 * <p>
 * To execute: mvn compile && mvn exec:java -Dexec.args="INPUT_FILE OUTPUT_FILE NUM_OF_THREADS START_INDEX END_INDEX",
 * see README.md for more details.
 */
public class CapCheckExecutor implements Runnable {
  // Provide your agent id (the part before @rbm.goog) 
  private static final String AGENTID = "SET AGENT ID HERE";

  private static final Logger logger = Logger.getLogger(CapCheckExecutor.class.getName());

  private static final String EXCEPTION_WAS_THROWN = "an exception was thrown";

  // The default total threads to use if no value is passed in as an argument
  private static final int DEFAULT_THREAD_COUNT = 10;

  // The maximum number of devices for a single bulk capability check.
  // Above this number, results become a statistical average.
  // See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/users/batchGet
  private static final int MAX_DEVICES = 499;

  // Reference to the RBM api
  private static RbmApiHelper rbmApiHelper;

  // List of capability check results
  private static List<BatchGetUsersResponse> capCheckResults = Collections.synchronizedList(new ArrayList());

  // A given thread's input of phone numbers to check
  private List<String> phoneNumbers;

  /**
   * Constructor of the CapCheckExecutor class.
   */
  public CapCheckExecutor(List<String> phoneNumbers) {
    this.phoneNumbers = phoneNumbers;
  }

  // [START run_application]
  public static void main(String[] args) {
    if (!(args.length >= 2 && args.length <= 5)) {
      logger.info("Usage: mvn exec:java " +
          "-Dexec.args=\"<INPUT_CSV_FILE_LOCATION> <OUTPUT_CSV_FILE_LOCATION> <THREADS> <START_INDEX> <END_INDEX>\"");

      System.exit(-1);
    }

    // Parse the input arguments
    String inputFileLocation = args[0];
    String outputFileLocation = args[1];

    int threadCount = DEFAULT_THREAD_COUNT;
    if (args.length >= 3) {
      threadCount = Integer.parseInt(args[2]);
    }

    int startIndex = 0;
    if (args.length >= 4) {
      startIndex = Integer.parseInt(args[3]);
    }

    int endIndex = Integer.MAX_VALUE;
    if (args.length == 5) {
      endIndex = Integer.parseInt(args[4]);
    }

    try {
      // Create static reference to the RBM API helper class to be used across all threads
      Class<? extends CapCheckExecutor> aClass = CapCheckExecutor.class;
      rbmApiHelper = new RbmApiHelper();

      rbmApiHelper.setAgentId(AGENTID);

      // Read devices
      List<String> phoneNumbers = readDevices(startIndex, endIndex, inputFileLocation);
      int totalInputUsers = phoneNumbers.size();

      // Calculate the split for threads
      int sizeOfChunk = phoneNumbers.size() / threadCount;
      int index = 0;
      int i = 0;

      // Time before capability check
      long startTime = System.currentTimeMillis() / 1000;

      // Threads for capability check
      ExecutorService taskExecutor = Executors.newFixedThreadPool(threadCount);
      List<Runnable> capCheckTasks = new ArrayList<>();

      logger.info(String.format("Starting capability check of %s users.",
          NumberFormat.getNumberInstance(Locale.US).format(phoneNumbers.size())));

      // Create and start capability check threads
      while (index < phoneNumbers.size()) {
        List<String> subList = new ArrayList<>(phoneNumbers.subList(index,
            Math.min(index + sizeOfChunk, totalInputUsers)));

        capCheckTasks.add(new CapCheckExecutor(subList));

        index += sizeOfChunk;
      }

      // Run all threads and block until all capability checks are complete
      CompletableFuture<?>[] futures = capCheckTasks.stream()
          .map(task -> CompletableFuture.runAsync(task, taskExecutor))
          .toArray(CompletableFuture[]::new);
      CompletableFuture.allOf(futures).join();
      taskExecutor.shutdown();

      // Creates line break after threads complete running
      System.out.println();

      long elapsedTimeSeconds = (System.currentTimeMillis() / 1000) - startTime;

      logger.info(String.format("Time elapsed: %s seconds", elapsedTimeSeconds));
      if (elapsedTimeSeconds > 0) {
        logger.info(String.format("Devices checked per second: %s",
            NumberFormat.getNumberInstance(Locale.US).format((totalInputUsers / elapsedTimeSeconds))));
      }

      printSummary();

      // Store results to the output file
      writeResults(outputFileLocation);
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }
  }

  /**
   * Reads the first maxDevices from the file and adds them into a list to be checked.
   *
   * @param startIndex The starting index in the device list to run the cap check against.
   * @param endIndex The ending index in the device list to run the cap check against.
   * @param inputFileLocation The file location of the device list.
   * @return A list of phone numbers.
   */
  private static List<String> readDevices(int startIndex, int endIndex, String inputFileLocation) {
    File file = new File(inputFileLocation);

    // Use a Set in order to de-dupe phone numbers in the list
    Set<String> phoneNumbers = new HashSet<String>();

    try {
      BufferedReader br = new BufferedReader(new FileReader(file));

      String st;
      while ((st = br.readLine()) != null) {
        // Add + to start of country code if not present
        if (!st.startsWith("+")) {
          st = "+" + st;
        }

        phoneNumbers.add(st);
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }

    // Sublist of numbers based on the start and end indices
    List<String> subListOfPhoneNumbers = phoneNumbers
        .stream()
          .skip(startIndex)
          .limit(Math.min(endIndex, phoneNumbers.size()))
          .collect(Collectors.toList());

    return subListOfPhoneNumbers;
  }

  /**
   * Prints summary information about the bulk capability check including the potential reach percentage and
   * the total reachable user base for launched agents.
   */
  private static void printSummary() {
    int totalRandomSampleUserCount = 0;
    int reachableRandomSampleUserCount = 0;
    int reachableUsers = 0;

    for (BatchGetUsersResponse userResponse : capCheckResults) {
      try {
        totalRandomSampleUserCount += userResponse.getTotalRandomSampleUserCount();
        reachableRandomSampleUserCount += userResponse.getReachableRandomSampleUserCount();
        reachableUsers += userResponse.getReachableUsers().size();
      } catch (NullPointerException e) {
      } // Ignore this error
    }

    if (totalRandomSampleUserCount > 0) {
      double potentialReach = (double) reachableRandomSampleUserCount / (double) totalRandomSampleUserCount;
      logger.info(String.format("Potential reachability: %s",
          NumberFormat.getPercentInstance(Locale.US).format(potentialReach)));
    } else {
      logger.info("Cannot report potential reachability since input file had less than 500 users.");
    }

    logger.info(String.format("Total reachable users: %s.\n\nSee the output CSV file for details. "
            + "Note that these values are only be available if your RBM agent is launched.",
        NumberFormat.getNumberInstance(Locale.US).format(reachableUsers)));
  }

  /**
   * Writes the results to the bulk capability check into the specified file.
   *
   * @param outputFileName The output file location.
   */
  private static void writeResults(String outputFileName) {
    File file = new File(outputFileName);

    try {
      FileWriter fr = new FileWriter(file);

      for (BatchGetUsersResponse capCheckResult : capCheckResults) {
        if (capCheckResult != null && capCheckResult.getReachableUsers() != null) {
          capCheckResult.getReachableUsers().stream().forEach(phoneNumber -> {
            try {
              fr.write(phoneNumber + "\n");
            } catch (IOException e) {
              logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
            }
          });
        }
      }

      fr.close();
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }
  }

  public void run() {
    try {
      capCheckResults.addAll(getUsers(phoneNumbers));
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }
  }

  /**
   * Performs a batch user capability check. If the list of phone numbers has more than 500 values, the list is
   * split into sublists of a maximum 500 numbers each. One batch call is made for each sublist.
   *
   * @param phoneNumbers List of user phone numbers to check.
   * @return A list of response objects for each request.
   * @throws Exception
   */
  private List<BatchGetUsersResponse> getUsers(List<String> phoneNumbers) throws Exception {
    List<BatchGetUsersResponse> usersResponses = new ArrayList<>();
    int index = 0;
    while (index < phoneNumbers.size()) {
      List<String> subList = new ArrayList<>(phoneNumbers.subList(index,
          Math.min(index + MAX_DEVICES, phoneNumbers.size())));

      System.out.print(".");

      index += MAX_DEVICES;
      usersResponses.add(rbmApiHelper.batchGet(subList));
    }

    return usersResponses;
  }
  // [END run_application]
}