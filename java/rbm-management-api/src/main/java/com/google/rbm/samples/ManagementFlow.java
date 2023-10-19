/*
Copyright 2022 Google Inc. All rights reserved.

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

package com.google.rbm.samples;

// [START import_libraries]

import com.google.api.services.businesscommunications.v1.model.Agent;
import com.google.api.services.businesscommunications.v1.model.AgentLaunch;
import com.google.api.services.businesscommunications.v1.model.AgentVerification;
import com.google.api.services.businesscommunications.v1.model.AgentVerificationContact;
import com.google.api.services.businesscommunications.v1.model.Brand;

import com.google.api.services.businesscommunications.v1.model.ListAgentsResponse;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingLaunchQuestionnaire;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgent;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingRegion;
import com.google.api.services.rcsbusinessmessaging.v1.model.AgentMessage;
import com.google.api.services.rcsbusinessmessaging.v1.model.BatchGetUsersResponse;
import com.google.api.services.rcsbusinessmessaging.v1.model.Tester;
import com.google.rbm.samples.lib.AgentFactory;
import com.google.rbm.samples.lib.RbmApiOperations;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
// [END import_libraries]

/**
 * RBM Management sample flow. Please follow README.
 */
public class ManagementFlow {

  private static final Logger logger = Logger.getLogger(ManagementFlow.class.getName());
  private static final String TEST_LAUNCH_REGION_ID = "/v1/regions/dogfood-prod-us";

  private final RbmApiOperations api;
  private final Map<String, String> flags;

  /**
   * Constructor of the FirstAgent class.
   */
  public ManagementFlow(Map<String, String> flags) {
    logger.info("Initializing the client: flags: " + flags);
    // Set flags.
    this.flags = flags;
    // initialize the API helper
    this.api = new RbmApiOperations();
  }

  // [START run_application]
  public static void main(String[] args) throws IOException {
    Map<String, String> parsedFlags = parseFlags(args);
    new ManagementFlow(parsedFlags).run();
  }

  private void run() throws IOException {
    LocalDateTime now = LocalDateTime.now();
    if (getBooleanFlag("enable_verbose_logging")) {
      enableVerboseLogging();
    }

    ///////////////// RBM, Management API ////////////////////

    // Listing regions.
    if (getBooleanFlag("list_regions")) {
      List<RcsBusinessMessagingRegion> regions = api.listAllRbmLaunchRegions();
      List<String> regionIds = regions.stream().map(RcsBusinessMessagingRegion::getName).sorted()
          .collect(Collectors.toList());
      logger.info("Fetched region Ids: " + regionIds);
    }

    // Listing brands.
    if (getBooleanFlag("list_brands")) {
      List<Brand> brands = api.listBrands().stream().sorted(Comparator.comparing(Brand::getName))
          .collect(Collectors.toList());
      logger.info(String.format("Found %d brands", brands.size()));
      for (Brand brand : brands) {
        logger.info(String.format("Brand [%s]: '%s'", brand.getName(), brand.getDisplayName()));
      }
    }

    // Create brand if needed.
    if (getBooleanFlag("create_brand")) {
      String displayName = flags.getOrDefault("brand_name", "Test brand: " + now.getSecond());
      Brand brand = api.createBrand(displayName);
      logger.info("New brand id: " + brand.getName());
    }

    String brandId = flags.get("brand_id");
    // Read brand.
    if (isNotBlank(brandId)) {
      Brand brand = api.getBrand(brandId);
      logger.info("Brand: " + brand);
    }

    // Remove brand.
    if (getBooleanFlag("remove_brand")) {
      Brand brand = api.getBrand(brandId);
      logger.info("Brand: " + brand);
      api.removeBrand(brand.getName());
    }

    // List agents.
    if (getBooleanFlag("list_agents")) {
      Brand brand = api.getBrand(brandId);
      logger.info("Brand: " + brand);
      ListAgentsResponse response = api.listAllAgents(brand);
      List<Agent> agents = response.getAgents().stream()
          .sorted(Comparator.comparing(Agent::getName)).collect(Collectors.toList());
      logger.info(String.format("Found %d agents", response.getAgents().size()));
      for (Agent agent : agents) {
        logger.info(String.format("Agent [%s]: '%s'", agent.getName(), agent.getDisplayName()));
      }
    }

    // Create agent.
    if (getBooleanFlag("create_agent")) {
      Brand brand = api.getBrand(brandId);
      logger.info("Brand to operate on: " + brand);
      String displayName = flags.getOrDefault("agent_name", "Test RBM Agent: " + now.getSecond());
      String suffix = flags.getOrDefault("agent_data_suffix", "API");
      RcsBusinessMessagingAgent agentData = AgentFactory.createRbmAgent(suffix);
      Agent agent = api.createRbmAgent(brand, displayName, agentData);
      logger.info("RBM agent has been created: " + agent);
    }

    // From now, brand and agent are required to perform agent level operations.
    if (flags.get("agent_id") == null) {
      logger.warning("Next set of operations requires `agent_id` set");
      return;
    }
    Agent agent = api.getAgent(flags.get("agent_id"));
    logger.info("Agent: " + agent);

    // Update agent.
    if (getBooleanFlag("update_agent")) {
      agent = api.updateRbmAgent(agent);
      logger.info("Updated RBM agent data: " + agent);
    }

    // Remove agents.
    if (getBooleanFlag("remove_agent")) {
      api.removeAgent(agent.getName());
      return;
    }

    // Read agent launch.
    if (getBooleanFlag("get_agent_launch")) {
      AgentLaunch launch = api.getAgentLaunch(agent.getName());
      logger.info("RBM agent launch: " + launch);
    }

    // Launch an agent.
    List<String> regionIds = Collections.singletonList(
        flags.getOrDefault("region", TEST_LAUNCH_REGION_ID));
    if (getBooleanFlag("launch_agent")) {
      Optional<RcsBusinessMessagingLaunchQuestionnaire> q = Optional.of(AgentFactory.createRbmQuestionnaire());
      AgentLaunch launch = api.requestRbmAgentLaunch(agent.getName(), regionIds, q);
      logger.info("RBM agent updated launch: " + launch);
    } else if (getBooleanFlag("unlaunch_agent")) {
      AgentLaunch updated = api.unlaunchRbmAgentLaunch(agent.getName(), regionIds);
      logger.info("RBM agent updated launch: " + updated);
    }

    // Read agent verification.
    if (getBooleanFlag("get_agent_verification")) {
      AgentVerification verification = api.getAgentVerification(agent.getName());
      logger.info("RBM agent verification: " + verification);
    }

    // Request agent verification.
    if (getBooleanFlag("request_verification")) {
      AgentVerificationContact contact = AgentFactory.createRbmAgentVerification();
      AgentVerification verification = api.requestAgentVerification(agent.getName(), contact);
      logger.info("Verification requested: " + verification);
    } else if (getBooleanFlag("unverify_agent")) {
      // Request unverification.
      AgentVerification verification = api.unverify(agent.getName());
      logger.info("Unverification requested: " + verification);
    }

    ///////////////// RBM, Messaging API ////////////////////

    // Create agent tester.
    String testMsisdn = flags.get("add_test_device");
    if (isNotBlank(testMsisdn)) {
      Tester tester = api.createTester(agent.getName(), testMsisdn);
      logger.info("Tester: " + tester);
    }

    // Send a message from an agent.
    String messageMsisdn = flags.get("send_message_to");
    if (isNotBlank(messageMsisdn)) {
      String messageText = flags.getOrDefault("message", "Hello from RBM API!" + now);
      AgentMessage message = api.sendMessage(agent.getName(), messageMsisdn, messageText);
      logger.info("Sent message: " + message);
    }

    // Batch capabilities request.
    String msisdnsCsv = flags.get("get_batch_capabilities");
    if (isNotBlank(msisdnsCsv)) {
      List<String> msisdns = Arrays.stream(msisdnsCsv.trim().split(","))
          .filter(p -> p.startsWith("+")).collect(Collectors.toList());
      BatchGetUsersResponse result = api.getBatchCapabilities(agent.getName(), msisdns);
      logger.info("Capabilities: " + result);
    }
  }

  private boolean getBooleanFlag(String name) {
    return Boolean.TRUE.toString().equalsIgnoreCase(flags.get(name));
  }

  private static Map<String, String> parseFlags(String[] args) {
    Map<String, String> parsedFlags = new HashMap<>();
    for (String arg : args) {
      arg = arg.trim();
      if (arg.isEmpty()) {
        continue;
      }
      String[] pair = arg.split("=");
      if (pair.length >= 2) {
        parsedFlags.put(pair[0].trim(), pair[1].trim());
      }
    }
    return parsedFlags;
  }

  private static boolean isNotBlank(String str) {
    return str != null && !str.trim().isEmpty();
  }

  private static void enableVerboseLogging() {
    Logger root = Logger.getLogger("");
    root.setLevel(Level.CONFIG);
    boolean hasConsoleHandler = false;
    for (Handler handler : root.getHandlers()) {
      if (handler instanceof ConsoleHandler) {
        hasConsoleHandler = true;
        break;
      }
    }
    if (!hasConsoleHandler) {
      root.addHandler(new ConsoleHandler());
    }
    for (Handler handler : root.getHandlers()) {
      handler.setLevel(Level.CONFIG);
    }
  }
  // [END run_application]
}