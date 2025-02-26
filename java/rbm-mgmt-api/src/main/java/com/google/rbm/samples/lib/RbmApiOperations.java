/*
 * Copyright (C) 2022 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package com.google.rbm.samples.lib;

// [START of the RBM API Helper]

// [START import_libraries]

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.businesscommunications.v1.BusinessCommunications;
import com.google.api.services.businesscommunications.v1.model.Agent;
import com.google.api.services.businesscommunications.v1.model.AgentLaunch;
import com.google.api.services.businesscommunications.v1.model.AgentVerification;
import com.google.api.services.businesscommunications.v1.model.AgentVerificationContact;
import com.google.api.services.businesscommunications.v1.model.Brand;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentEmailEntry;
import com.google.api.services.businesscommunications.v1.model.ListAgentsResponse;
import com.google.api.services.businesscommunications.v1.model.ListBrandsResponse;
import com.google.api.services.businesscommunications.v1.model.ListRegionsResponse;
import com.google.api.services.businesscommunications.v1.model.Phone;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentPhoneEntry;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingLaunchQuestionnaire;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgent;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingLaunch;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingRegion;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingRegionLaunch;
import com.google.api.services.businesscommunications.v1.model.RequestAgentLaunchRequest;
import com.google.api.services.businesscommunications.v1.model.RequestAgentVerificationRequest;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentWebEntry;
import com.google.api.services.rcsbusinessmessaging.v1.RCSBusinessMessaging;
import com.google.api.services.rcsbusinessmessaging.v1.model.AgentContentMessage;
import com.google.api.services.rcsbusinessmessaging.v1.model.AgentMessage;
import com.google.api.services.rcsbusinessmessaging.v1.model.BatchGetUsersRequest;
import com.google.api.services.rcsbusinessmessaging.v1.model.BatchGetUsersResponse;
import com.google.api.services.rcsbusinessmessaging.v1.model.Tester;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.common.base.Strings;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;
// [END import_libraries]

/**
 * API container for using the RBM Management & Messaging APIs.
 */
public final class RbmApiOperations {

  private static final Logger logger = Logger.getLogger(RbmApiOperations.class.getName());

  private static final String EXCEPTION_WAS_THROWN = "an exception was thrown";

  // URLs for the API endpoints
  private static final String RBM_API_URL = "https://rcsbusinessmessaging.googleapis.com/";
  private static final String RBM_MANAGEMENT_API_URL = "https://businesscommunications.googleapis.com/";

  // credentials used for RBM agent API
  private GoogleCredentials credentials;

  // reference to the Business Communications (RBM Management) API builder
  private BusinessCommunications.Builder bcBuilder;
  // reference to the RBM API builder
  private RCSBusinessMessaging.Builder rbmBuilder;

  public RbmApiOperations() {
    logger.info("Initializing management helper");
    String credentialsFileLocation = "rbm-agent-service-account-credentials.json";

    // initialize all libraries for sending and receiving messages
    initCredentials(credentialsFileLocation);
    initManagementApi();
    initRbmApi();
  }

  /**
   * Initializes credentials used by the RBM API.
   *
   * @param credentialsFileLocation The location for the GCP service account file.
   */
  private void initCredentials(String credentialsFileLocation) {
    logger.info("Initializing credentials for RBM Management API...");
    try {
      ClassLoader classLoader = getClass().getClassLoader();
      URL resource = classLoader.getResource(credentialsFileLocation);
      if (resource == null) {
        throw new FileNotFoundException(credentialsFileLocation + " was not found.");
      }
      File file = new File(resource.getFile());

      this.credentials = GoogleCredentials.fromStream(new FileInputStream(file)).createScoped(
          Arrays.asList("https://www.googleapis.com/auth/rcsbusinessmessaging",
              "https://www.googleapis.com/auth/businesscommunications"));
      this.credentials.refreshIfExpired();
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }
  }

  private void initManagementApi() {
    logger.info("Initializing RBM Management API...");

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

  private void initRbmApi() {
    logger.info("Initializing RBM API...");
    try {
      HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
      JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

      // create instance of the RBM API
      rbmBuilder = new RCSBusinessMessaging.Builder(httpTransport, jsonFactory,
          null).setApplicationName(((ServiceAccountCredentials) credentials).getProjectId());

      // set the API credentials and endpoint
      rbmBuilder.setHttpRequestInitializer(new HttpCredentialsAdapter(credentials) {
        @Override
        public void initialize(HttpRequest request) throws IOException {
          request.setCurlLoggingEnabled(true);
          request.setLoggingEnabled(true);
          super.initialize(request);
        }
      });
      rbmBuilder.setRootUrl(RBM_API_URL);
    } catch (Exception e) {
      logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
    }
  }

  /**
   * Lists RBM regions.
   *
   * @throws IOException In case of any IO problems.
   */
  public List<RcsBusinessMessagingRegion> listAllRbmLaunchRegions() throws IOException {
    logger.info("Listing RBM regions...");
    ListRegionsResponse response = bcBuilder.build().regions().list().execute();
    List<RcsBusinessMessagingRegion> result = response.getRegions();
    result = result == null ? Collections.emptyList() : result;
    logger.info("Returning RBM regions: " + result.size());
    return result;
  }


  /**
   * Lists brands for underlying Solution provider.
   *
   * @throws IOException In case of any IO problems.
   */
  public List<Brand> listBrands() throws IOException {
    logger.info("Listing brands...");
    ListBrandsResponse response = bcBuilder.build().brands().list().execute();
    List<Brand> result = response.getBrands();
    result = result == null ? Collections.emptyList() : result;
    logger.info("Returning brands: " + result.size());
    return result;
  }

  /**
   * Reads brand by brands id (name).
   *
   * @param name Brand id (name).
   * @throws IOException In case of any IO problems.
   */
  public Brand getBrand(String name) throws IOException {
    checkBrandId(name);
    logger.info("Getting brand: " + name);
    Brand response = bcBuilder.build().brands().get(name).execute();
    if (response == null) {
      throw new IllegalArgumentException("Brand " + name + " was not found. "
          + "Please create or find existing brand id (brand_id='Value'");
    }
    logger.info("Returning brand: " + response.getName());
    return response;
  }

  /**
   * Lists all agents for underlying brand, owned by  current Solution Provider.
   *
   * @throws IOException In case of any IO problems.
   */
  public ListAgentsResponse listAllAgents(Brand brand) throws IOException {
    return listAgents(brand, null, 50);
  }

  /**
   * Lists agents for underlying brand, owned by  current Solution Provider.
   */
  public ListAgentsResponse listAgents(Brand brand, String nextPageToken, int size)
      throws IOException {
    checkBrandForRequest(brand);
    logger.info(String.format("Listing agents for: %s [%s]...", brand.getName(),
        nextPageToken == null ? "page1" : nextPageToken));
    BusinessCommunications.Brands.Agents.List listRequest = bcBuilder.build().brands().agents()
        .list(brand.getName());
    if (!Strings.isNullOrEmpty(nextPageToken)) {
      listRequest.setPageToken(nextPageToken);
    }
    if (size > 0) {
      listRequest.setPageSize(size);
    }
    ListAgentsResponse response = listRequest.execute();
    if (response.getAgents() == null) {
      response.setAgents(Collections.emptyList());
    }
    logger.info("Returning agents: " + response.getAgents().size());
    return response;
  }

  /**
   * Loads an agent.
   *
   * @param name Agent name (id).
   * @return Agent by given id.
   * @throws IOException In case of any IO problems.
   */
  public Agent getAgent(String name) throws IOException {
    checkAgentId(name);
    logger.info(String.format("Loading agent: %s...", name));
    Agent result = bcBuilder.build().brands().agents().get(name).execute();
    if (result == null) {
      throw new IllegalArgumentException(
          "Agent " + name + " was not found. " + "Please create or find existing agent id");
    }
    logger.info(String.format("Returning agent %s: ", result.getName()));
    return result;
  }

  /**
   * Creates RBM agent with the given data.
   *
   * @param brand Brand to use.
   * @param displayName RBM Agent display name.
   * @param rbmAgent RBM Agent data
   * @return Created agent.
   * @throws IOException In case of any IO problems.
   */
  public Agent createRbmAgent(Brand brand, String displayName, RcsBusinessMessagingAgent rbmAgent)
      throws IOException {
    checkBrandForRequest(brand);
    displayName = checkNotEmpty(displayName, "Agent name is expected");

    if (rbmAgent == null) {
      throw new IllegalArgumentException("Valid agent with logo & hero images is required.");
    }
    checkNotEmpty(rbmAgent.getHeroUri(), "Agent's hero image is required");
    checkNotEmpty(rbmAgent.getLogoUri(), "Agent's logo image is required");
    checkNotEmpty(rbmAgent.getDescription(), "Agent's description is required");
    checkNotEmpty(rbmAgent.getColor(), "Agent's color is required");

    checkNotNull(rbmAgent.getPrivacy(), "Agent's privacy reference is required");
    checkNotEmpty(rbmAgent.getPrivacy().getUri(), "Agent's privacy URL is required");
    checkNotNull(rbmAgent.getTermsConditions(), "Agent's TOS are required");
    checkNotEmpty(rbmAgent.getTermsConditions().getUri(), "Agent's privacy URL is required");

    checkCollectionNotEmpty(rbmAgent.getEmails(), "Agent must contain valid email entries",
        RcsBusinessMessagingAgentEmailEntry::getAddress, RcsBusinessMessagingAgentEmailEntry::getLabel);
    checkCollectionNotEmpty(rbmAgent.getWebsites(), "Agent must contain valid web entries",
        RcsBusinessMessagingAgentWebEntry::getUri, RcsBusinessMessagingAgentWebEntry::getLabel);
    checkCollectionNotEmpty(rbmAgent.getPhoneNumbers(), "Agent must contain valid phone entries",
        ph -> ph.getPhoneNumber() != null ? ph.getPhoneNumber().getNumber() : null,
        RcsBusinessMessagingAgentPhoneEntry::getLabel);

    String restName = brand.getName() + "/agents/";
    Agent agent = new Agent().setName(restName).setDisplayName(displayName)
        .setRcsBusinessMessagingAgent(rbmAgent);
    checkAgentForCreation(agent);
    logger.info("Creating agent under: " + restName);
    Agent createdAgent = bcBuilder.build().brands().agents().create(brand.getName(), agent)
        .execute();
    logger.info("Created agent: " + createdAgent.getName());
    return createdAgent;
  }

  /**
   * Patches selected fields of an RBM agent.
   *
   * @param rbmAgent Agent to take info from.
   * @return Patched agent.
   * @throws IOException In case of any IO problems.
   */
  public Agent updateRbmAgent(Agent rbmAgent) throws IOException {
    checkAgentId(rbmAgent.getName());
    checkNotNull(rbmAgent, "RBM agent data is expected");
    String newDisplayName = "Updated: " + System.currentTimeMillis(); // This is actually ignored
    Agent agentToUpdate = new Agent().setName(rbmAgent.getName()).setDisplayName(newDisplayName)
        .setRcsBusinessMessagingAgent(new RcsBusinessMessagingAgent().setHeroUri(
                "https://www.gstatic.com/rbmconsole/images/google_logo_background_white_color_1440x720px.png")
            .setPhoneNumbers(Collections.singletonList(new RcsBusinessMessagingAgentPhoneEntry().setLabel("Main")
                .setPhoneNumber(new Phone().setNumber("+16509966666")))));

    String mask = String.join(",", new String[]{"rcs_business_messaging_agent.hero_uri",
        "rcs_business_messaging_agent.phone_numbers"});
    return bcBuilder.build().brands().agents().patch(rbmAgent.getName(), agentToUpdate)
        .setUpdateMask(mask).execute();
  }

  // Agent verification RPCs.

  /**
   * Reads agent verification.
   *
   * @param agentId Agent id string.
   * @return Agent verification object.
   * @throws IOException In case of any IO problems.
   */
  public AgentVerification getAgentVerification(String agentId) throws IOException {
    checkAgentId(agentId);
    String restName = agentId + "/verification";
    logger.info("Reading agent verification: " + restName);
    return bcBuilder.build().brands().agents().getVerification(restName).execute();
  }

  /**
   * Reads existing agent verification and requests agent verification with contact if not yet
   * requested.
   *
   * @param agentId Agent id string.
   * @param contact Contact information for the verification.
   * @return Agent verification object.
   * @throws IOException In case of any IO problems.
   */
  public AgentVerification requestAgentVerification(String agentId,
      AgentVerificationContact contact) throws IOException {
    checkAgentId(agentId);
    checkNotNull(contact, "Verification contact is required.");
    checkNotEmpty(contact.getBrandContactEmailAddress(), "Brand contact email required.");
    checkNotEmpty(contact.getPartnerEmailAddress(), "Partner contact email required.");

    AgentVerification ver = getAgentVerification(agentId);
    logger.info("Agent verification: " + ver);
    String state = ver.getVerificationState();
    if (ver.getAgentVerificationContact() != null &&
        !"VERIFICATION_STATE_UNVERIFIED".equals(state)) {
      logger.warning(String.format("Verification state is already: %s", state));
      return ver;
    }

    String restName = agentId; // Note: don't add ":requestVerification" - added automatically
    RequestAgentVerificationRequest request = new RequestAgentVerificationRequest();
    request.setAgentVerificationContact(contact);
    logger.info("Requesting agent verification: " + restName);
    AgentVerification requestedVerification = bcBuilder.build().brands().agents()
        .requestVerification(restName, request).execute();
    logger.info("Requested verification: " + requestedVerification.getName() + ": "
        + requestedVerification.getVerificationState());
    return requestedVerification;
  }

  /**
   * Unverifies existing agent (the only operation allowed in updateVerification).
   *
   * @param agentId Agent id string.
   * @return Updated agent verification object.
   * @throws IOException In case of any IO problems.
   */
  public AgentVerification unverify(String agentId) throws IOException {
    checkAgentId(agentId);
    String restName = agentId + "/verification";
    logger.info("Reading agent verification: " + restName);
    AgentVerification verification = // The only allowed type.
        new AgentVerification().setVerificationState("VERIFICATION_STATE_UNVERIFIED");
    AgentVerification updatedVerification = bcBuilder.build().brands().agents()
        .updateVerification(restName, verification).setUpdateMask("").execute();
    logger.info("Updated agent verification: " + updatedVerification);
    return updatedVerification;
  }

  // Agent launches RPCs.

  /**
   * Reads agent launch data.
   *
   * @param agentId Agent id (name).
   * @return Current launch data.
   * @throws IOException In case of any IO problems.
   */
  public AgentLaunch getAgentLaunch(String agentId) throws IOException {
    checkAgentId(agentId);
    String restName = agentId + "/launch";
    logger.info("Reading agent launch: " + restName);
    return bcBuilder.build().brands().agents().getLaunch(restName).execute();
  }

  /**
   * Updates existing RBM launch with new regions or questionnaire. Note: all new agents will be in
   * LAUNCHED_STATE_UNLAUNCHED state, existing states aren't updated.
   *
   * @param agentId Agent name (id).
   * @param regionIdsToAdd Regions to add.
   * @param questionnaire Optional questionnaire.
   * @return Updated RBM launch.
   * @throws IOException In case of any IO problems.
   */
  public AgentLaunch requestRbmAgentLaunch(String agentId, List<String> regionIdsToAdd,
      Optional<RcsBusinessMessagingLaunchQuestionnaire> questionnaire) throws IOException {
    if (regionIdsToAdd.isEmpty() && !questionnaire.isPresent()) {
      throw new IllegalArgumentException("Questionnaire or list of regions is required");
    }
    AgentLaunch existing = getAgentLaunch(agentId);
    RcsBusinessMessagingLaunch rbmLaunch = existing.getRcsBusinessMessaging();
    if (rbmLaunch == null) {
      rbmLaunch = new RcsBusinessMessagingLaunch().setLaunchDetails(new HashMap<>());
      existing.setRcsBusinessMessaging(rbmLaunch);
    }
    Map<String, RcsBusinessMessagingRegionLaunch> existingRegions = rbmLaunch.getLaunchDetails();
    if (existingRegions == null) {
      existingRegions = new HashMap<>();
      rbmLaunch.setLaunchDetails(existingRegions);
    }
    Set<String> existingRegionIds = rbmLaunch.getLaunchDetails().keySet();
    logger.info("Existing launch regions: " + existingRegionIds);
    for (String regionId : existingRegionIds) { // Reset launch state to unspecified.
      existingRegions.put(regionId, new RcsBusinessMessagingRegionLaunch());
      if (regionId.contains("dogfood-prod-us")) {
        existingRegions.put(regionId,
            new RcsBusinessMessagingRegionLaunch().setLaunchState("LAUNCH_STATE_UNLAUNCHED"));
      }
    }
    logger.info(String.format("Existing regions in %s launch: %s: ", agentId, existingRegionIds));
    // We add additional regions to existing ones as per documentation.
    for (String regionId : regionIdsToAdd) {
      if (!existingRegions.containsKey(regionId)) {
        rbmLaunch.getLaunchDetails().put(regionId, new RcsBusinessMessagingRegionLaunch());
      }
    }
    if (questionnaire.isPresent()) {
      rbmLaunch.setQuestionnaire(questionnaire.get());
    }
    logger.info(String.format("Requesting launch of %s in: %s: ", agentId,
        rbmLaunch.getLaunchDetails().keySet()));
    return requestRbmAgentLaunch(agentId, existing);
  }

  /**
   * Requests agent's launch. Note: will only accept agents in LAUNCHED_STATE_UNLAUNCHED states,
   * replacing existing values on the server.
   *
   * @param agentId Agent id.
   * @param data Launch data.
   * @return Requested launch data.
   * @throws IOException In case of any IO problems.
   */
  public AgentLaunch requestRbmAgentLaunch(String agentId, AgentLaunch data) throws IOException {
    checkAgentId(agentId);
    checkNotNull(data, "Launch data is required");
    String restName = agentId;
    RequestAgentLaunchRequest request = new RequestAgentLaunchRequest().setAgentLaunch(
        data.setName(null)); // Clear the name for the creation.
    logger.info("Requesting agent launch: " + restName);
    return bcBuilder.build().brands().agents().requestLaunch(restName, request).execute();
  }

  /**
   * Unlaunches given agent on a given region.
   *
   * @param agentId Agent id.
   * @param regionIds Region ids to unlaunch on.
   * @return Updated launch data.
   * @throws IOException In case of any IO problems.
   */
  public AgentLaunch unlaunchRbmAgentLaunch(String agentId, Collection<String> regionIds)
      throws IOException {
    checkAgentId(agentId);
    regionIds.forEach(RbmApiOperations::checkRegionId);
    if (regionIds.isEmpty()) {
      throw new IllegalArgumentException("At least one region is required to unlaunch");
    }
    String now = Instant.now().toString();
    RcsBusinessMessagingLaunch rbmLaunch = new RcsBusinessMessagingLaunch();
    rbmLaunch.setLaunchDetails(new HashMap<>());
    for (String regionId : regionIds) {
      rbmLaunch.getLaunchDetails().put(regionId,
          new RcsBusinessMessagingRegionLaunch().setLaunchState("LAUNCH_STATE_UNLAUNCHED")
              .setUpdateTime(now));
    }
    rbmLaunch.setQuestionnaire(new RcsBusinessMessagingLaunchQuestionnaire().setOptinDescription("Patched at " + now));
    String mask = "agent_launch.rcs_business_messaging.questionnaire.optin_description";
    return updateAgentLaunch(agentId, new AgentLaunch().setRcsBusinessMessaging(rbmLaunch), mask);
  }

  /**
   * Updates agent launch.
   *
   * @param agentId Agent name (id).
   * @param launch Launch data.
   * @param updateMask Update mask.
   * @return Updated agent launch
   * @throws IOException In case of any IO problems.
   */
  public AgentLaunch updateAgentLaunch(String agentId, AgentLaunch launch, String updateMask)
      throws IOException {
    checkAgentId(agentId);
    checkNotNull(launch, "Launch data is required");

    String restName = agentId + "/launch";
    logger.info("Updating agent launch: " + restName);
    AgentLaunch updatedLaunch = bcBuilder.build().brands().agents().updateLaunch(restName, launch)
        .setUpdateMask(updateMask).execute();
    logger.info("Updating launch: " + updatedLaunch.getName());
    return updatedLaunch;
  }

  /**
   * Creates brand with a given name.
   *
   * @param displayName Display name.
   * @return Created brand instance.
   * @throws IOException In case of any IO errors.
   */
  public Brand createBrand(String displayName) throws IOException {
    displayName = checkNotEmpty(displayName, "Brand display name is expected");
    logger.info("Creating brand: " + displayName);
    Brand brand = new Brand().setDisplayName(displayName);
    brand = bcBuilder.build().brands().create(brand).execute();
    logger.info("New brand id (name): " + brand.getName());
    return brand;
  }

  /**
   * Removes a given brand.
   *
   * @param name Brand name (id).
   * @throws IOException In case of any error.
   */
  public void removeBrand(String name) throws IOException {
    checkBrandId(name);
    logger.info("Removing brand: " + name);
    bcBuilder.build().brands().delete(name).execute();
  }

  /**
   * Removes a given agent.
   *
   * @param name Agent name (id).
   * @throws IOException In case of any error.
   */
  public void removeAgent(String name) throws IOException {
    checkAgentId(name);
    logger.info("Removing agent: " + name);
    bcBuilder.build().brands().agents().delete(name).execute();
  }


  /**
   * Retrieves batch capabilities on behalf of an agent.
   *
   * @param agentApiId Agent id (name).
   */
  public BatchGetUsersResponse getBatchCapabilities(String agentApiId, List<String> msisdns)
      throws IOException {
    checkAgentId(agentApiId);
    String agentId = getAgentEntityId(agentApiId);
    logger.info(String.format("Capabilities for %s, %d users...", agentId, msisdns.size()));
    BatchGetUsersResponse response = rbmBuilder.build().users()
        .batchGet(new BatchGetUsersRequest().setAgentId(agentId).setUsers(msisdns)).execute();
    logger.info(
        String.format("Capabilities for %s: %d reachable sample count, %d total sample size.",
            agentId, response.getReachableRandomSampleUserCount(),
            response.getTotalRandomSampleUserCount()));
    return response;
  }

  /**
   * Requests adding a test device.
   *
   * @param agentApiId Agent id (name).
   * @param testMsisdn Test MSISDN.
   */
  public Tester createTester(String agentApiId, String testMsisdn) throws IOException {
    checkNotEmpty(testMsisdn, "Must be a valid MSISDN");
    checkAgentId(agentApiId);
    String agentEntityId = getAgentEntityId(agentApiId);
    String parent = "phones/" + testMsisdn;
    logger.info("Creating tester for: " + agentEntityId + ": " + testMsisdn);
    RCSBusinessMessaging.Phones.Testers.Create createTester = rbmBuilder.build().phones().testers()
        .create(parent, new Tester()).setAgentId(agentEntityId);
    Tester result = createTester.execute();
    logger.info("Create tester response: " + result);
    return result;
  }

  /**
   * Send message.
   *
   * @param agentApiId Agent id (name).
   * @param msisdn MSISDN of a recepient.
   * @param messageText Message text.
   */
  public AgentMessage sendMessage(String agentApiId, String msisdn, String messageText)
      throws IOException {
    checkNotEmpty(msisdn, "Must be a valid MSISDN");
    checkAgentId(agentApiId);
    String id = UUID.randomUUID().toString();
    String parent = "phones/" + msisdn;
    String agentEntityId = getAgentEntityId(agentApiId);
    AgentContentMessage agentContentMessage = new AgentContentMessage();
    agentContentMessage.setText(messageText);
    AgentMessage agentMessage = new AgentMessage();
    agentMessage.setContentMessage(agentContentMessage);
    AgentMessage message = rbmBuilder.build().phones().agentMessages().create(parent, agentMessage)
        .setMessageId(id).setAgentId(agentEntityId).execute();
    logger.info("Create message response: " + message.getName());
    return message;
  }

  private static void checkRegionId(String regionId) {
    String message = "Valid region id '/v1/regions/REGION_ID' is required";
    checkNotEmpty(regionId, message);
    if (!regionId.startsWith("/v1/regions")) {
      throw new IllegalArgumentException(message + ". Provided: " + regionId);
    }
  }

  private static void checkBrandId(String brandId) {
    checkNotEmpty(brandId, "Valid brand id is required: `brands/*`");
    if (!brandId.startsWith("brands/") || brandId.contains("/agents/")) {
      throw new IllegalArgumentException(
          "Brand id must look like `brands/{brand_id}`. Provided: " + brandId);
    }
  }

  private static void checkAgentId(String agentId) {
    checkNotEmpty(agentId, "Non-empty agent id is required: `brands/*/agents/*`");
    if (!agentId.startsWith("brands/") || !agentId.contains("/agents/")) {
      throw new IllegalArgumentException(
          "Agent id must look like `brands/{brand_id}/agents/{agent_id}`. Provided: " + agentId);
    }
  }

  private static String getAgentEntityId(String agentId) {
    checkAgentId(agentId);
    int index = agentId.indexOf("/agents/") + "/agents/".length();
    return agentId.substring(index);
  }

  private static void checkBrandForRequest(Brand brand) {
    if (brand == null || brand.getName() == null) {
      throw new IllegalArgumentException("Valid brand with id(name) is required.");
    }
  }

  @SafeVarargs
  private static <T> void checkCollectionNotEmpty(List<T> collection, String error,
      Function<T, String>... methodsToCheck) {
    checkCollectionNotEmpty(collection, Arrays.asList(methodsToCheck), error);
  }

  private static <T> void checkCollectionNotEmpty(List<T> collection,
      Collection<Function<T, String>> methodsToCheck, String error) {
    if (collection == null || collection.isEmpty()) {
      throw new IllegalArgumentException(error);
    }
    for (T item : collection) {
      for (Function<T, String> getter : methodsToCheck) {
        String value = getter.apply(item);
        checkNotEmpty(value, error);
      }
    }
  }

  private static String checkNotEmpty(String input, String error) {
    if (Strings.isNullOrEmpty(input)) {
      throw new IllegalArgumentException(error);
    }
    return input.trim();
  }

  private static void checkNotNull(Object input, String error) {
    if (input == null) {
      throw new IllegalArgumentException(error);
    }
  }

  private static void checkAgentForCreation(Agent agent) {
    if (agent == null || Strings.isNullOrEmpty(agent.getDisplayName())) {
      throw new IllegalArgumentException("Valid agent with display name is required.");
    }
    if (agent.getBusinessMessagesAgent() == null && agent.getRcsBusinessMessagingAgent() == null) {
      throw new IllegalArgumentException("Valid agent with detailed info is required.");
    }
  }

  private static String encode(String component) throws IOException {
    return URLEncoder.encode(component, "UTF-8").replace("+", "%20");
  }
}
// [END of the RBM API Helper]