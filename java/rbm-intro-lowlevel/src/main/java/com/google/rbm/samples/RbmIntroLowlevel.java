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


import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.rcsbusinessmessaging.v1.RCSBusinessMessaging;
import com.google.rcsbusinessmessaging.v1.model.*;

import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.UUID;


public class RbmIntroLowlevel {
    // Provide your agent id (the part before @rbm.goog).
    private static final String AGENTID = "AGENTID";

    private static final Logger logger = Logger.getLogger(RbmIntroLowlevel.class.getName());

    public RbmIntroLowlevel() {
    }

    public void sendMessage(String msisdn, String messageText) {
        String credentialsFileLocation = "rbm-agent-service-account-credentials.json";
        GoogleCredentials credentials = null;

        // Service URL - prefixes could also be 'asia-' or 'us-'
        String rbmApiUrl = "https://europe-rcsbusinessmessaging.googleapis.com/";

        RCSBusinessMessaging.Builder builder = null;

        logger.info("Initializing credentials for RBM.");

        try {
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(credentialsFileLocation).getFile());

            credentials =
                    GoogleCredentials.fromStream(new FileInputStream(file))
                            .createScoped(
                                    Collections.singletonList("https://www.googleapis.com/auth/rcsbusinessmessaging"));
            credentials.refreshIfExpired();
        } catch(Exception e) {
            logger.log(Level.SEVERE, "Exception", e);
        }

        try {
            HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            GsonFactory gsonFactory = GsonFactory.getDefaultInstance();

            // create instance of the RBM API
            builder = new RCSBusinessMessaging
                    .Builder(httpTransport, gsonFactory, null)
                    .setApplicationName(((ServiceAccountCredentials) credentials).getProjectId());

            // set the API credentials and endpoint
            builder.setHttpRequestInitializer(new HttpCredentialsAdapter(credentials));
            builder.setRootUrl(rbmApiUrl);
        } catch(Exception e) {
            logger.log(Level.SEVERE, "Exception", e);
        }

        AgentContentMessage agentContentMessage = new AgentContentMessage();

        agentContentMessage.setText(messageText);

        // attach content to message
        AgentMessage agentMessage = new AgentMessage();
        
        agentMessage.setContentMessage(agentContentMessage);

        try {
            RCSBusinessMessaging.Phones.AgentMessages.Create message =
                    builder.build().phones().agentMessages().create("phones/" + msisdn, agentMessage);

            // generate a unique message id
            message.setMessageId(UUID.randomUUID().toString());
            message.setAgentId(this.AGENTID);

            logger.info("Sending message to client " + msisdn);

            // execute the request, sending the text to the user's phone
            logger.info(message.execute().toString());
        } catch(IOException e) {
            logger.log(Level.SEVERE, "Exception", e);
        }
    }


    public static void main(String[] args) {
        RbmIntroLowlevel intro = new RbmIntroLowlevel();

        // Target MSISDN +CCNNNNNNNNNN
        String msisdn = "MSISDN";

        intro.sendMessage(msisdn, "Hello World");
    }
}