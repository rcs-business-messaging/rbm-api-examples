/*
Copyright 2024 Google Inc. All rights reserved.

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

import com.google.api.gax.core.CredentialsProvider;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.pubsub.v1.AckReplyConsumer;
import com.google.cloud.pubsub.v1.MessageReceiver;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.rbm.RbmApiHelper;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
// [END import_libraries]

/**
 * RCS Business Messaging sample first agent.
 * <p>
 * Sends the following message to a user: "What is your favorite color?"
 * Parses the user's response and echos it in a new message.
 */
public class FirstAgent {
    // Provide your agent id (the part before @rbm.goog) if you are using the new RBM
    // partner-based model. You will need to set PARTNERMODEL to true.
    private static final String AGENTID = "my_new_agent_vkkv5eld_agent";

    private static final boolean PARTNERMODEL = true;

    private static final Logger logger = Logger.getLogger(FirstAgent.class.getName());

    private static final String EXCEPTION_WAS_THROWN = "an exception was thrown";

    // the name of the pub/sub pull subscription
    private static final String PUB_SUB_NAME = "rbm-agent-subscription";

    // pubsub subscription service for our pull requests
    private Subscriber subscriber;

    private RbmApiHelper rbmApiHelper;

    // the phone number, in E.164 format, to start a conversation with
    private String msisdn;

    /**
     * Constructor of the FirstAgent class.
     */
    public FirstAgent(String msisdn) {
        logger.info("Initializing the agent.");

        this.msisdn = msisdn;

        // initialize pub/sub for pull monitoring
        if (!PARTNERMODEL) initPubSub("rbm-agent-service-account-credentials.json");

        // initialize the API helper
        this.rbmApiHelper = new RbmApiHelper();

        if (PARTNERMODEL) this.rbmApiHelper.setAgentId(this.AGENTID);
    }

    /**
     * Creates a MessageReceiver handler for pulling new messages from
     * the pubsub subscription.
     *
     * @return The MessageReceiver listener.
     */
    private MessageReceiver getMessageReceiver() {
        return new MessageReceiver() {
            /**
             * Handle incoming message, then ack/nack the received message.
             *
             * @param message The message sent by the user.
             * @param consumer Consumer for accepting a reply.
             */
            public void receiveMessage(PubsubMessage message, AckReplyConsumer consumer) {
                String jsonResponse = message.getData().toStringUtf8();

                logger.info("Id : " + message.getMessageId());
                logger.info(jsonResponse);

                // use Gson to convert JSON response into a Map
                Gson gson = new Gson();
                Type type = new TypeToken<Map<String, String>>() {
                }.getType();
                Map<String, String> jsonMap = gson.fromJson(jsonResponse, type);

                // make sure the map contains response text
                if (jsonMap.containsKey("text")) {
                    String userResponseText = jsonMap.get("text");
                    String senderPhoneNumber = jsonMap.get("senderPhoneNumber");
                    String messageId = jsonMap.get("messageId");

                    // let the user know we received and read the message
                    rbmApiHelper.sendReadMessage(messageId, senderPhoneNumber);

                    // forward the response to our handler
                    handleUserResponse(userResponseText, senderPhoneNumber);
                }

                // let the service know we successfully processed the response
                consumer.ack();
            }
        };
    }

    /**
     * Initializes a pull subscription to receive user responses.
     */
    private void initPubSub(String credentialsFileLocation) {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(credentialsFileLocation).getFile());

            CredentialsProvider credentialsProvider =
                    FixedCredentialsProvider.create(ServiceAccountCredentials
                            .fromStream(
                                    new FileInputStream(file)
                            )
                    );

            GoogleCredentials credentials =
                    GoogleCredentials.fromStream(new FileInputStream(file))
                            .createScoped(
                                    Collections.singletonList("https://www.googleapis.com/auth/pubsub"));
            credentials.refreshIfExpired();

            String projectId = ((ServiceAccountCredentials) credentials).getProjectId();

            ProjectSubscriptionName subscriptionName =
                    ProjectSubscriptionName.of(projectId, PUB_SUB_NAME);

            // Instantiate an asynchronous message receiver
            MessageReceiver receiver = this.getMessageReceiver();

            // create PubSub subscription
            this.subscriber = Subscriber.newBuilder(subscriptionName, receiver)
                    .setCredentialsProvider(credentialsProvider)
                    .build();

            logger.info("Starting Pub/Sub listener");
            this.subscriber.startAsync();
        } catch (Exception e) {
            logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
        }
    }

    public void subscribeAsyncExample(String projectId, String subscriptionId, String credentialsFileLocation) {
        ProjectSubscriptionName subscriptionName =
                ProjectSubscriptionName.of(projectId, subscriptionId);

        // Instantiate an asynchronous message receiver.
        MessageReceiver receiver =
                (PubsubMessage message, AckReplyConsumer consumer) -> {
                    // Handle incoming message, then ack the received message.
                    System.out.println("Id: " + message.getMessageId());
                    System.out.println("Data: " + message.getData().toStringUtf8());
                    consumer.ack();
                };

        Subscriber subscriber = null;
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(credentialsFileLocation).getFile());

            CredentialsProvider credentialsProvider =
                    FixedCredentialsProvider.create(ServiceAccountCredentials
                            .fromStream(
                                    new FileInputStream(file)
                            )
                    );

            subscriber = Subscriber.newBuilder(subscriptionName, receiver).setCredentialsProvider(credentialsProvider).build();
            // Start the subscriber.
            subscriber.startAsync().awaitRunning();
            System.out.printf("Listening for messages on %s:\n", subscriptionName.toString());
            // Allow the subscriber to run for 30s unless an unrecoverable error occurs.
            subscriber.awaitTerminated(30, TimeUnit.SECONDS);
        } catch (Exception e) {
            // Shut down the subscriber after 30s. Stop receiving messages.
            subscriber.stopAsync();
        }
    }

    /**
     * Takes the user's response and creates an appropriate response.
     * <p>
     * In this sample, the RBM agent responds with "I like USER_RESPONSE too!"
     *
     * @param responseText      The response the user sent to the agent.
     * @param senderPhoneNumber The phone number that send the response.
     */
    private void handleUserResponse(String responseText, String senderPhoneNumber) {
        responseText = responseText.toLowerCase();

        if (responseText.equals("stop")) {
            // Any real agent must support this command
            // TODO: Client typed stop, agent should no longer send messages to this msisdn
            logger.info(msisdn + " asked to stop agent messaging");
        } else {
            rbmApiHelper.sendIsTypingMessage(senderPhoneNumber);

            try {
                rbmApiHelper.sendTextMessage("I like " + responseText + " too!",
                        senderPhoneNumber);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void endSubscription() {
        if (!PARTNERMODEL) this.subscriber.stopAsync();
    }

    /**
     * Sends a user an invite to test this agent.
     */
    private void sendTesterInvite() {
        try {
            rbmApiHelper.registerTester(msisdn);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sends the initial greeting of "What is your favorite color?" to the user.
     */
    private void sendGreeting() {
        try {
            rbmApiHelper.sendTextMessage("What is your favorite color?",
                    msisdn);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // [START run_application]
    public static void main(String[] args) {
        if (args.length != 2 && args.length != 3) {
            logger.info("Usage: mvn exec:java " +
                    "-Dexec.args=\"<PHONE E.164> <MODE>\"");

            System.exit(-1);
        }

        try {
            String msisdn = args[0];
            String mode = "chat";

            if (args.length > 1) {
                mode = args[1];
            }

            // create agent
            FirstAgent firstAgent = new FirstAgent(msisdn);

            if (mode.equals("chat")) {
                // send opening message to user
                firstAgent.sendGreeting();

                // run until terminated
                while (true) {
                    Thread.sleep(Long.MAX_VALUE);
                }
            } else {
                // send tester invite to user
                firstAgent.sendTesterInvite();

                logger.info("Tester invite sent to " + msisdn);
            }

            firstAgent.endSubscription();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    // [END run_application]
}