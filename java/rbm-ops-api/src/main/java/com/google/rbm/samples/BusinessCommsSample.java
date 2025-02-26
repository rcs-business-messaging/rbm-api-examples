package com.google.rbm.samples;

import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.businesscommunications.v1.BusinessCommunications;
import com.google.api.services.businesscommunications.v1.model.ListAgentsResponse;
import java.net.URL;
import java.io.FileNotFoundException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;


class BusinessCommsSample {
    private static final String RBM_MANAGEMENT_API_URL = "https://businesscommunications.googleapis.com/";
    private GoogleCredentials credentials;

    protected static final String EXCEPTION_WAS_THROWN = "an exception was thrown";
    protected static final Logger logger = Logger.getLogger(ListAgents.class.getName());

    protected BusinessCommunications.Builder bcBuilder;

    protected BusinessCommsSample() {
        String credentialsFileLocation = "rbm-agent-service-account-credentials.json";

        initCredentials(credentialsFileLocation);
        initBusinessCommsApi();

        try {
            HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            // create instance of the RBM API
            bcBuilder = new BusinessCommunications.Builder(httpTransport, jsonFactory,
                null).setApplicationName(((ServiceAccountCredentials) credentials).getProjectId())
                .setSuppressPatternChecks(true);

            // set the API credentials and endpoint
            bcBuilder.setHttpRequestInitializer(new HttpCredentialsAdapter(credentials) {
                @Override
                public void initialize(HttpRequest request) throws IOException {
                request.setCurlLoggingEnabled(true);
                request.setLoggingEnabled(true);
                super.initialize(request);
                }
            });
            bcBuilder.setRootUrl(RBM_MANAGEMENT_API_URL);
        } catch (Exception e) {
            logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
        }
    }


    private void initCredentials(String credentialsFileLocation) {
        logger.info("Initializing credentials for Businesss Comms API...");
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            URL resource = classLoader.getResource(credentialsFileLocation);
            if (resource == null) {
                throw new FileNotFoundException(credentialsFileLocation + " was not found.");
            }
            File file = new File(resource.getFile());

            this.credentials = GoogleCredentials.fromStream(new FileInputStream(file)).createScoped(
                Arrays.asList("https://www.googleapis.com/auth/businesscommunications"));
            this.credentials.refreshIfExpired();
        } catch (Exception e) {
            logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
        }
    }


    private void initBusinessCommsApi() {
        logger.info("Initializing Businesss Comms API...");

        try {
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        // create instance of the RBM API
        bcBuilder = new BusinessCommunications.Builder(httpTransport, jsonFactory,
            null).setApplicationName(((ServiceAccountCredentials) credentials).getProjectId())
            .setSuppressPatternChecks(true);

        // set the API credentials and endpoint
        bcBuilder.setHttpRequestInitializer(new HttpCredentialsAdapter(credentials) {
            @Override
            public void initialize(HttpRequest request) throws IOException {
            request.setCurlLoggingEnabled(true);
            request.setLoggingEnabled(true);
            super.initialize(request);
            }
        });
        bcBuilder.setRootUrl(RBM_MANAGEMENT_API_URL);
        } catch (Exception e) {
            logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
        }
    }

}