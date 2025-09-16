// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
  BaseExternalAccountClient,
  GaxiosResponseWithHTTP2,
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  StreamMethodOptions,
  GlobalOptions,
  GoogleAuth,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';
import {Readable} from 'stream';

export namespace businesscommunications_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?:
      | string
      | OAuth2Client
      | JWT
      | Compute
      | UserRefreshClient
      | BaseExternalAccountClient
      | GoogleAuth;

    /**
     * V1 error format.
     */
    '$.xgafv'?: string;
    /**
     * OAuth access token.
     */
    access_token?: string;
    /**
     * Data format for response.
     */
    alt?: string;
    /**
     * JSONP
     */
    callback?: string;
    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string;
    /**
     * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
     */
    key?: string;
    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string;
    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean;
    /**
     * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Legacy upload protocol for media (e.g. "media", "multipart").
     */
    uploadType?: string;
    /**
     * Upload protocol for media (e.g. "raw", "multipart").
     */
    upload_protocol?: string;
  }

  /**
   * Business Communications API
   *
   *
   *
   * @example
   * ```js
   * const {google} = require('googleapis');
   * const businesscommunications = google.businesscommunications('v1');
   * ```
   */
  export class Businesscommunications {
    context: APIRequestContext;
    analytics: Resource$Analytics;
    brands: Resource$Brands;
    criticalAgents: Resource$Criticalagents;
    partners: Resource$Partners;
    regions: Resource$Regions;
    subscriberProfiles: Resource$Subscriberprofiles;
    surveyQuestions: Resource$Surveyquestions;
    testers: Resource$Testers;
    v1: Resource$V1;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.analytics = new Resource$Analytics(this.context);
      this.brands = new Resource$Brands(this.context);
      this.criticalAgents = new Resource$Criticalagents(this.context);
      this.partners = new Resource$Partners(this.context);
      this.regions = new Resource$Regions(this.context);
      this.subscriberProfiles = new Resource$Subscriberprofiles(this.context);
      this.surveyQuestions = new Resource$Surveyquestions(this.context);
      this.testers = new Resource$Testers(this.context);
      this.v1 = new Resource$V1(this.context);
    }
  }

  /**
   * A conversational entity that represents a brand.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Agent {
    /**
     * Output only. The name of the brand associated with the agent.
     */
    brandName?: string | null;
    /**
     * Required. The name that the agent displays to users. Maximum 100 characters. Not modifiable after agent verification.
     */
    displayName?: string | null;
    /**
     * The unique identifier of the agent. Read-only. Defined by the platform.
     */
    name?: string | null;
    /**
     * Detailed agent information for RCS for Business.
     */
    rcsBusinessMessagingAgent?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgent;
  }
  /**
   * Details about an agent launch.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch {
    /**
     * Required. The identifier for launch.
     */
    name?: string | null;
    /**
     * Launch details for an RCS for Business agent.
     */
    rcsBusinessMessaging?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunch;
  }
  /**
   * Performance metrics for an agent in a country. *Note*: This API is expected to evolve. Your client should be resilient to the addition of new fields in the future.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentPerformance {
    /**
     * The agent's use case
     */
    agentUseCase?: string | null;
    /**
     * The country dimension for the given performance metrics. Given as an [ISO 3166 Alpha-2 country code](https://www.iso.org/obp/ui/#search/code/). For example, "US" for the United States of America.
     */
    countryCode?: string | null;
    /**
     * Required. The name that the agent displays to users. Maximum 100 characters. Not modifiable after agent verification.
     */
    displayName?: string | null;
    /**
     * The timestamp representing the end of the period for which metrics were calculated. Metrics, including reputation, are calculated based on data up to this timestamp. This timestamp is the most recent midnight Pacific Time (PT). *Note*: Due to daily processing after midnight PT, metrics might not be updated until several hours after midnight PT.
     */
    metricsPeriodEndTime?: string | null;
    /**
     * The unique identifier of the agent. Defined by the platform.
     */
    name?: string | null;
    /**
     * Reputation of the agent in the given country.
     */
    reputation?: string | null;
    /**
     * Traffic limit for the agent (messages per user per month) in the given country. If the agent is not subject to traffic limits, the value will not be set.
     */
    trafficLimit?: number | null;
  }
  /**
   * Details about the verification information for an agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification {
    /**
     * Required. The contact details.
     */
    agentVerificationContact?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerificationContact;
    /**
     * Required. The identifier for verification.
     */
    name?: string | null;
    /**
     * The verification state.
     */
    verificationState?: string | null;
  }
  /**
   * Verification contact details for an agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerificationContact {
    /**
     * Required. The email address of the brand representative.
     */
    brandContactEmailAddress?: string | null;
    /**
     * Required. Name of a brand representative who can verify the accuracy of the launch details and that the partner represents the brand.
     */
    brandContactName?: string | null;
    /**
     * Required. The public website of the brand to verify the domain.
     */
    brandWebsiteUrl?: string | null;
    /**
     * Required. The email address of the partner.
     */
    partnerEmailAddress?: string | null;
    /**
     * Required. The name of the partner requesting the verification.
     */
    partnerName?: string | null;
  }
  /**
   * Information about webhook for a Business Messages agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentWebhookIntegration {
    /**
     * Input only. The verification token.
     */
    verificationToken?: string | null;
    /**
     * Required. The webhook URL where the messages are delivered.
     */
    webhookUri?: string | null;
  }
  /**
   * A brand (business, organization, or group) that is represented by an agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Brand {
    /**
     * Required. The display name of the brand. Maximum 100 characters.
     */
    displayName?: string | null;
    /**
     * Output only. The unique identifier of the brand. Defined by the platform.
     */
    name?: string | null;
  }
  /**
   * RCS for Business critical agent information.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent {
    /**
     * Required. Output only. Identifier. The agent ID of the critical agent, for example abc@rbm.goog.
     */
    name?: string | null;
  }
  /**
   * Information about a Business Messages agent and Dialogflow CX project association.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowCxIntegration {
    /**
     * Required. If `ENABLED`, Business Messages automatically sends the Dialogflow responses to users.
     */
    autoResponseStatus?: string | null;
    /**
     * Required. The Dialogflow Agent ID.
     */
    dialogflowAgentId?: string | null;
    /**
     * Required. The Dialogflow project ID. Non-editable. To change this value, you must delete the Dialogflow project from this agent, then create a new integration.
     */
    dialogflowProjectId?: string | null;
    /**
     * Output only. The service account that must be configured in the Dialogflow project with the "Dialogflow Console Agent Editor" and "Dialogflow API Client" roles. This is required to provide access to the Dialogflow API.
     */
    dialogflowServiceAccountEmail?: string | null;
    /**
     * Output only. Information about the operating state of the Dialogflow integration.
     */
    operationInfo?: Schema$GoogleCommunicationsBusinesscommunicationsV1OperationInfo;
  }
  /**
   * A knowledge base document. A document can be either a website URL or a URL to a CSV file. URLs must be publicly available. CSV files must contain one or more question/answer pairs, with one row for each pair.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowDocument {
    /**
     * Required. Display name of a FAQ document.
     */
    displayName?: string | null;
    /**
     * URL of a FAQ document.
     */
    faqUrl?: string | null;
    /**
     * System-generated Document ID. If the brand identifier is "1234", the agent identifier is "5678", the integration identifier is "9092", the knowledge base identifier is "1111", and the document identifier is "2222", this parameter resolves to "brands/1234/agents/5678/integrations/9092/knowledgebases/1111/documents/2222".
     */
    name?: string | null;
    /**
     * Output only. Operation Information is populated only when a document is added to an existing knowledge base.
     */
    operationInfo?: Schema$GoogleCommunicationsBusinesscommunicationsV1OperationInfo;
    /**
     * The raw content of the document.
     */
    rawContent?: string | null;
    /**
     * Output only. Time at which the document was created/updated.
     */
    updateTime?: string | null;
  }
  /**
   * Information about a Business Messages agent and Dialogflow ES project association.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowEsIntegration {
    /**
     * Required. If `ENABLED`, Business Messages automatically sends the Dialogflow responses to users.
     */
    autoResponseStatus?: string | null;
    /**
     * Knowledge bases associated with the Dialogflow project. Optional
     */
    dialogflowKnowledgeBases?: Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowKnowledgebase[];
    /**
     * Required. The Dialogflow project ID. Non-editable. To change this value, you must delete the Dialogflow project from this agent, then create a new integration.
     */
    dialogflowProjectId?: string | null;
    /**
     * Output only. The service account that must be configured in the Dialogflow project with the "Dialogflow Console Agent Editor" and "Dialogflow API Client" roles. This is required to provide access to the Dialogflow API.
     */
    dialogflowServiceAccountEmail?: string | null;
    /**
     * Output only. Information about the operating state of the Dialogflow integration.
     */
    operationInfo?: Schema$GoogleCommunicationsBusinesscommunicationsV1OperationInfo;
  }
  /**
   * Knowledge base information. A knowledge base can have multiple FAQ URLs.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowKnowledgebase {
    /**
     * Required. Knowledge base display name.
     */
    displayName?: string | null;
    /**
     * Knowledge base documents. Optional
     */
    documents?: Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowDocument[];
    /**
     * Output only. Knowledgebase ID. Unique identifier returned by Dialogflow service after creation of a knowledge base. If the brand identifier is "1234", the agent identifier is "5678", the integration identifier is "9092", and the knowledge base identifier is "1111", this parameter resolves to "brands/1234/agents/5678/integrations/9092/knowledgebases/1111".
     */
    name?: string | null;
    /**
     * Output only. Time at which the knowledge base was created or updated.
     */
    updateTime?: string | null;
  }
  /**
   * Information about the integration.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Integration {
    /**
     * Information about webhook for an agent. If a webhook is configured at an agent level, it will override the webhook at the partner level.
     */
    agentWebhookIntegration?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentWebhookIntegration;
    /**
     * Information about an associated Dialogflow CX project. https://cloud.google.com/dialogflow/cx/docs/basics
     */
    dialogflowCxIntegration?: Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowCxIntegration;
    /**
     * Information about an associated Dialogflow ES project. https://cloud.google.com/dialogflow/es/docs
     */
    dialogflowEsIntegration?: Schema$GoogleCommunicationsBusinesscommunicationsV1DialogflowEsIntegration;
    /**
     * Output only. The unique identifier of the integration. Read-only. Defined by the platform.
     */
    name?: string | null;
    /**
     * Output only. Integration status.
     */
    status?: string | null;
  }
  /**
   * Returns a list of agent performances.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse {
    /**
     * List of agent performances.
     */
    agentPerformances?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentPerformance[];
    /**
     * Optional. The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
  }
  /**
   * A list of agents.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse {
    /**
     * List of agent information.
     */
    agents?: Schema$GoogleCommunicationsBusinesscommunicationsV1Agent[];
    /**
     * The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
  }
  /**
   * A list of brands.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse {
    /**
     * List of brand information.
     */
    brands?: Schema$GoogleCommunicationsBusinesscommunicationsV1Brand[];
    /**
     * The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
  }
  /**
   * A list of critical agents.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse {
    /**
     * List of critical agents.
     */
    criticalAgents?: Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent[];
    /**
     * Optional. The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response for ListIntegrations.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse {
    /**
     * List of integrations.
     */
    integrations?: Schema$GoogleCommunicationsBusinesscommunicationsV1Integration[];
    /**
     * Currently this field is unsupported because the number of agent-level integrations is too few for pagination to be needed. The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
  }
  /**
   * A list of all RCS for Business regions.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse {
    /**
     * List of all RCS for Business regions.
     */
    regions?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegion[];
  }
  /**
   * A list of subscriber profiles.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse {
    /**
     * Optional. The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
     */
    nextPageToken?: string | null;
    /**
     * List of subscriberProfile information.
     */
    subscriberProfiles?: Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile[];
  }
  /**
   * A list of all Google provided template questions.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse {
    /**
     * List of Google provided template survey question information.
     */
    surveyQuestions?: Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyQuestion[];
  }
  /**
   * Response for ListTesters.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse {
    /**
     * List of testers.
     */
    testers?: Schema$GoogleCommunicationsBusinesscommunicationsV1Tester[];
  }
  /**
   * The Dialogflow operation information.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1OperationInfo {
    /**
     * Output only. Error result, if any.
     */
    error?: Schema$GoogleRpcStatus;
    /**
     * Output only. The server-assigned name (operation Id), which is only unique within the same service that originally returns it.
     */
    operationName?: string | null;
    /**
     * Output only. Dialogflow Operation state.
     */
    operationState?: string | null;
    /**
     * Output only. Dialogflow Operation type.
     */
    operationType?: string | null;
  }
  /**
   * Partner that is onboarded with a supported product.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Partner {
    /**
     * Optional. The company name of the partner.
     */
    company?: string | null;
    /**
     * Optional. The list of contact emails.
     */
    contactEmails?: string[] | null;
    /**
     * Output only. Service account with access to the Dialogflow Client API role. This account is created by the platform and provides access to Dialogflow.
     */
    dialogflowServiceAccountEmail?: string | null;
    /**
     * Required. The display name of the partner.
     */
    displayName?: string | null;
    /**
     * Immutable. The unique identifier of the partner. Defined by the platform.
     */
    name?: string | null;
    /**
     * The product capabilities of the partner.
     */
    productCapabilities?: Schema$GoogleCommunicationsBusinesscommunicationsV1ProductCapability[];
    /**
     * Optional. The technical point of contact of the partner.
     */
    technicalContact?: Schema$GoogleCommunicationsBusinesscommunicationsV1PartnerContact;
  }
  /**
   * Contact details
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1PartnerContact {
    /**
     * Email of the contact person.
     */
    email?: string | null;
    /**
     * Name of the contact person.
     */
    name?: string | null;
    /**
     * Phone number of the contact person.
     */
    phoneNumber?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone;
  }
  /**
   * Phone number.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Phone {
    /**
     * Required. Phone number string in E.164 format or unformatted local/toll-free number.
     */
    number?: string | null;
  }
  /**
   * The product capabilities that the partner supports.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ProductCapability {
    /**
     * The product supported by the partner.
     */
    product?: string | null;
    /**
     * RCS for Business capability = 4;
     */
    rcsBusinessMessagingCapability?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingCapability;
  }
  /**
   * Agent information specifically related to RCS for Business. For agent creation, it's recommended to provide at least one contact method (phone, email, or website) with a corresponding label. For agent launch, at least one phone or email contact with a corresponding label is required.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgent {
    /**
     * Optional. Use case of bot.
     */
    agentUseCase?: string | null;
    /**
     * Required. Billing configuration for the agent.
     */
    billingConfig?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentBillingConfig;
    /**
     * Required. Theme color of the agent that is visible to users in hex format. For example, #FF6347.
     */
    color?: string | null;
    /**
     * Required. Description of the agent that is visible to users. Maximum 100 characters. See [Edit agent information](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/agents/edit-agent-information?hl=en#edit_your_agents_information) for detailed requirements.
     */
    description?: string | null;
    /**
     * Optional. Email addresses associated with the agent. Required if phone number and website are not provided.
     */
    emails?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentEmailEntry[];
    /**
     * Required. Publicly available URL of the hero image for the agent. Maximum 200 KB. Not modifiable after agent verification.
     */
    heroUri?: string | null;
    /**
     * Required. Hosting region for an agent.
     */
    hostingRegion?: string | null;
    /**
     * Output only. Launch details for the agent. Only populated for carriers, and only with the launch details related to the carrier making the call.
     */
    launchDetails?: {
      [
        key: string
      ]: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegionLaunch;
    } | null;
    /**
     * Required. Publicly available URL of the logo for the agent. Maximum 50 KB. Not modifiable after agent verification.
     */
    logoUri?: string | null;
    /**
     * Output only. Partner associated with the agent.
     */
    partner?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentPartnerEntry;
    /**
     * Optional. Phone numbers associated with the agent. Required if email and website are not provided.
     */
    phoneNumbers?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentPhoneEntry[];
    /**
     * Required. Privacy policy associated with the agent.
     */
    privacy?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentWebEntry;
    /**
     * Required. Terms and conditions associated with the agent.
     */
    termsConditions?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentWebEntry;
    /**
     * Optional. Websites associated with the agent. Maximum 3. Required if phone number and email are not provided.
     */
    websites?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentWebEntry[];
  }
  /**
   * Billing configuration for the agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentBillingConfig {
    /**
     * Billing category for the agent.
     */
    billingCategory?: string | null;
  }
  /**
   * An email associated with the agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentEmailEntry {
    /**
     * Required. An email address.
     */
    address?: string | null;
    /**
     * Required. Label for the email address.
     */
    label?: string | null;
  }
  /**
   * Partner associated with the agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentPartnerEntry {
    /**
     * Output only. The public name of the company for the given partner. E.g. Twilio, HeyMarket etc.
     */
    company?: string | null;
    /**
     * Output only. The name that will be displayed to businesses to associate partners for products. Should be unique among partners.
     */
    displayName?: string | null;
    /**
     * Output only. Unique identifier for partner.
     */
    partnerId?: string | null;
  }
  /**
   * A phone number associated with the agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentPhoneEntry {
    /**
     * Required. Label for the phone number.
     */
    label?: string | null;
    /**
     * Required. Phone number in two possible formats: either the full E.164 format (for example, "+12223334444") or an unformatted local/toll-free phone number without '+', prefix, or country code (for example, "6502530000"). Note: emergency numbers are not allowed.
     */
    phoneNumber?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone;
  }
  /**
   * A web-based resource associated with the agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentWebEntry {
    /**
     * Required. Label for the URI.
     */
    label?: string | null;
    /**
     * Required. A publicly accessible URI associated with the agent. Must use the HTTP or HTTPS protocol.
     */
    uri?: string | null;
  }
  /**
   * RCS for Business capabilities
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingCapability {
    /**
     * Required. The webhook URL where the messages are delivered.
     */
    webhookUrl?: string | null;
  }
  /**
   * Details about an RCS for Business agent launch.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunch {
    /**
     * Required. Launch details for each supported region. Key represented by RcsBusinessMessagingRegion.name. To launch an agent (when the agent hasn't launched before), add an object containing a map of only keys for all regions you want the agent to launch to. To launch an agent (when the agent has launched before), add an object containing a map of only keys for all regions the agent is already launched on and all regions the agent wants to launch to. For more information, see the Launch an agent to one or more regions documentation.
     */
    launchDetails?: {
      [
        key: string
      ]: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegionLaunch;
    } | null;
    /**
     * Launch region for an agent. Ignored: This field is deprecated. Hosting region can only be specified during agent creation.
     */
    launchRegion?: string | null;
    /**
     * Required. Questionnaire about agent launch details.
     */
    questionnaire?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunchQuestionnaire;
  }
  /**
   * If Google manages the launch region, questionnaire details are available to Google for the purpose of reviewing the agent's launch.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunchQuestionnaire {
    /**
     * Required. Agent access instructions.
     */
    agentAccessInstructions?: string | null;
    /**
     * Required. Point of contacts.
     */
    contacts?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunchQuestionnaireContact[];
    /**
     * Required. Description of interactions the agent will have with users.
     */
    interactionsDescription?: string | null;
    /**
     * Optional. Description of how you obtain opt-in to message users with the agent.
     */
    optinDescription?: string | null;
    /**
     * Required. Description of the message the agent sends when a user opts out.
     */
    optoutDescription?: string | null;
    /**
     * Optional. Publicly available URIs for screenshots of the agent. For review purposes only.
     */
    screenshotUris?: string[] | null;
    /**
     * Required. Description of actions that trigger messages to users.
     */
    triggerDescription?: string | null;
    /**
     * Optional. Publicly available URIs for videos of the agent. For review purposes only.
     */
    videoUris?: string[] | null;
  }
  /**
   * Point of contact.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunchQuestionnaireContact {
    /**
     * Email address of the contact.
     */
    email?: string | null;
    /**
     * Name of the contact.
     */
    name?: string | null;
    /**
     * Title of the contact.
     */
    title?: string | null;
  }
  /**
   * RCS for Business region information.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegion {
    /**
     * The display name of the region.
     */
    displayName?: string | null;
    /**
     * The management type of the region.
     */
    managementType?: string | null;
    /**
     * Required. The identifier for the region.
     */
    name?: string | null;
  }
  /**
   * Details about RCS for Business agent launch for each region.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegionLaunch {
    /**
     * Optional. Specifies the party designation of the agent launch.
     */
    agentLaunchPartyDesignation?: string | null;
    /**
     * Comment from the carrier.
     */
    comment?: string | null;
    /**
     * The launch state for a region.
     */
    launchState?: string | null;
    /**
     * Last updated time.
     */
    updateTime?: string | null;
  }
  /**
   * Request to launch an agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentLaunchRequest {
    /**
     * Required. The agent launch to create. Name and Launch status are ignored.
     */
    agentLaunch?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch;
  }
  /**
   * Request to begin business information verification for an agent.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentVerificationRequest {
    /**
     * Required. Verification contact details for the agent.
     */
    agentVerificationContact?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerificationContact;
  }
  /**
   * RCS for Business subscriber profile information.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile {
    /**
     * Optional. If true, no messages are sent to this number unless they are from critical agents. If false, no messages are sent to this number from agents on blockedAgentIds list. If not specified, will default to false.
     */
    blockAll?: boolean | null;
    /**
     * Optional. Cannot send messages even if block_all is false.
     */
    blockedAgentIds?: string[] | null;
    /**
     * Required. Output only. Identifier. The phone number of the subscriber profile in E.164 format.
     */
    name?: string | null;
    /**
     * For carriers that disallow test devices by default, this means that the phone number can receive test messages even for such a carrier. For carriers that allow test devices, this does nothing.
     */
    testingAllowed?: boolean | null;
  }
  /**
   * The detailed content of each survey question.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyQuestion {
    /**
     * Required. The unique identifier of the question.
     */
    name?: string | null;
    /**
     * Required. Question content. Limited to 200 characters for custom questions.
     */
    questionContent?: string | null;
    /**
     * Output only. Type of the question.
     */
    questionType?: string | null;
    /**
     * Required. List of responses displayed with the question. Maximum 12.
     */
    responseOptions?: Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyResponse[];
  }
  /**
   * The content for a survey question response.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyResponse {
    /**
     * Required. Text that is shown in the survey and sent back to the agent when the user taps it. Maximum 35 characters.
     */
    content?: string | null;
    /**
     * The string the agent receives when the user taps the question response.
     */
    postbackData?: string | null;
  }
  /**
   * A tester for the agent. The agent can interact with verified testers even if the agent has not yet launched.
   */
  export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Tester {
    /**
     * Agent ID.
     */
    agentId?: string | null;
    /**
     * Output only. The status of the invitation. Read-only. Returned by the platform.
     */
    inviteStatus?: string | null;
    /**
     * Output only. ReadOnly. The unique identifier of the tester. This field should resolve to "testers/{E.164\}" where {E.164\} is the tester's phone number in E.164 format.
     */
    name?: string | null;
    /**
     * Required. The phone number of the tester in E.164 format.
     */
    phoneNumber?: string | null;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); \}
   */
  export interface Schema$GoogleProtobufEmpty {}
  /**
   * The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Schema$GoogleRpcStatus {
    /**
     * The status code, which should be an enum value of google.rpc.Code.
     */
    code?: number | null;
    /**
     * A list of messages that carry the error details. There is a common set of message types for APIs to use.
     */
    details?: Array<{[key: string]: any}> | null;
    /**
     * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
     */
    message?: string | null;
  }
  /**
   * RBM Dev Console failure reason to be attached to RPC status.
   */
  export interface Schema$RcsVibraniumFailureReason {
    description?: string | null;
    reason?: string | null;
    /**
     * Used to provide Error status to client. This object is shared with external developer. b/250608301
     */
    status?: Schema$GoogleRpcStatus;
  }

  export class Resource$Analytics {
    context: APIRequestContext;
    agentPerformances: Resource$Analytics$Agentperformances;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.agentPerformances = new Resource$Analytics$Agentperformances(
        this.context
      );
    }
  }

  export class Resource$Analytics$Agentperformances {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Lists agent performance data accessible to the caller. Each result represents the performance metrics for a specific agent in a specific country. If an agent has insufficient data for a given country, no performance record for that agent-country pair is returned.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.analytics.agentPerformances.list({
     *     // Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned. The maximum page_size is 1000.
     *     pageSize: 'placeholder-value',
     *     // Optional. The next_page_token value returned from a previous List request, if any.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "agentPerformances": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Analytics$Agentperformances$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Analytics$Agentperformances$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
    >;
    list(
      params: Params$Resource$Analytics$Agentperformances$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Analytics$Agentperformances$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
    ): void;
    list(
      params: Params$Resource$Analytics$Agentperformances$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Analytics$Agentperformances$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Analytics$Agentperformances$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Analytics$Agentperformances$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/analytics/agentPerformances').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentPerformancesResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Analytics$Agentperformances$List
    extends StandardParameters {
    /**
     * Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned. The maximum page_size is 1000.
     */
    pageSize?: number;
    /**
     * Optional. The next_page_token value returned from a previous List request, if any.
     */
    pageToken?: string;
  }

  export class Resource$Brands {
    context: APIRequestContext;
    agents: Resource$Brands$Agents;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.agents = new Resource$Brands$Agents(this.context);
    }

    /**
     * Creates a new brand.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.create({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "displayName": "my_displayName"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    create(
      params: Params$Resource$Brands$Create,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    create(
      params?: Params$Resource$Brands$Create,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    >;
    create(
      params: Params$Resource$Brands$Create,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    create(
      params: Params$Resource$Brands$Create,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    create(
      params: Params$Resource$Brands$Create,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    create(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Brands$Create
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Brands$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/brands').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters
        );
      }
    }

    /**
     * Deletes a brand. If the brand has any associated agents or locations, the delete request fails unless `force` is `true`.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.delete({
     *     // For non-RBM cases: if true, any agents and locations associated with this brand are also deleted.
     *     force: 'placeholder-value',
     *     // Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
     *     name: 'brands/my-brand',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Brands$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Brands$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Brands$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Brands$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Brands$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Brands$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Brands$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Gets information about a brand.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.get({
     *     // Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
     *     name: 'brands/my-brand',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Brands$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Brands$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    >;
    get(
      params: Params$Resource$Brands$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Brands$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    get(
      params: Params$Resource$Brands$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Brands$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Brands$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters
        );
      }
    }

    /**
     * Lists all the brands accessible to the user making the request. *Note*: This method always sets `pageSize` to `0`.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.list({
     *     // Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     *     pageSize: 'placeholder-value',
     *     // The next_page_token value returned from a previous List request, if any.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "brands": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Brands$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Brands$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
    >;
    list(
      params: Params$Resource$Brands$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Brands$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
    ): void;
    list(
      params: Params$Resource$Brands$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Brands$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Brands$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/brands').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>(
          parameters
        );
      }
    }

    /**
     * Updates information about a brand. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.patch({
     *     // Output only. The unique identifier of the brand. Defined by the platform.
     *     name: 'brands/my-brand',
     *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "displayName": "my_displayName"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    patch(
      params: Params$Resource$Brands$Patch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    patch(
      params?: Params$Resource$Brands$Patch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    >;
    patch(
      params: Params$Resource$Brands$Patch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    patch(
      params: Params$Resource$Brands$Patch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    patch(
      params: Params$Resource$Brands$Patch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    patch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
    ): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Brands$Patch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Brands$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Brands$Create extends StandardParameters {
    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Brand;
  }
  export interface Params$Resource$Brands$Delete extends StandardParameters {
    /**
     * For non-RBM cases: if true, any agents and locations associated with this brand are also deleted.
     */
    force?: boolean;
    /**
     * Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Get extends StandardParameters {
    /**
     * Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$List extends StandardParameters {
    /**
     * Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     */
    pageSize?: number;
    /**
     * The next_page_token value returned from a previous List request, if any.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Brands$Patch extends StandardParameters {
    /**
     * Output only. The unique identifier of the brand. Defined by the platform.
     */
    name?: string;
    /**
     * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Brand;
  }

  export class Resource$Brands$Agents {
    context: APIRequestContext;
    integrations: Resource$Brands$Agents$Integrations;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.integrations = new Resource$Brands$Agents$Integrations(this.context);
    }

    /**
     * Creates a new agent to represent a brand.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.create({
     *     // Required. The unique identifier of the brand the agent represents. If the brand identifier is "1234", this parameter is "brands/1234".
     *     parent: 'brands/my-brand',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "displayName": "my_displayName",
     *       //   "brandName": "my_brandName",
     *       //   "rcsBusinessMessagingAgent": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName",
     *   //   "brandName": "my_brandName",
     *   //   "rcsBusinessMessagingAgent": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    create(
      params: Params$Resource$Brands$Agents$Create,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    create(
      params?: Params$Resource$Brands$Agents$Create,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    >;
    create(
      params: Params$Resource$Brands$Agents$Create,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    create(
      params: Params$Resource$Brands$Agents$Create,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    create(
      params: Params$Resource$Brands$Agents$Create,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    create(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Create
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/agents').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters
        );
      }
    }

    /**
     * Deprecated: agent deletion is deprecated. Please contact customer support.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.delete({
     *     // Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
     *     name: 'brands/my-brand/agents/my-agent',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Brands$Agents$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Brands$Agents$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Brands$Agents$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Brands$Agents$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Brands$Agents$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Get information about an agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.get({
     *     // Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
     *     name: 'brands/my-brand/agents/my-agent',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName",
     *   //   "brandName": "my_brandName",
     *   //   "rcsBusinessMessagingAgent": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Brands$Agents$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Brands$Agents$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    >;
    get(
      params: Params$Resource$Brands$Agents$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Brands$Agents$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    get(
      params: Params$Resource$Brands$Agents$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters
        );
      }
    }

    /**
     * Gets the launch information for an agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.getLaunch({
     *     // Required. The unique identifier of the agent launch.
     *     name: 'brands/my-brand/agents/my-agent/launch',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "rcsBusinessMessaging": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    getLaunch(
      params: Params$Resource$Brands$Agents$Getlaunch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    getLaunch(
      params?: Params$Resource$Brands$Agents$Getlaunch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    >;
    getLaunch(
      params: Params$Resource$Brands$Agents$Getlaunch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    getLaunch(
      params: Params$Resource$Brands$Agents$Getlaunch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    getLaunch(
      params: Params$Resource$Brands$Agents$Getlaunch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    getLaunch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    getLaunch(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Getlaunch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Getlaunch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Getlaunch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters
        );
      }
    }

    /**
     * Gets the verification information for an agent. *Note*: Refer to the [brand verification FAQ](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification) for more information about the verification process.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.getVerification({
     *     // Required. The unique identifier of the brand and agent verification.
     *     name: 'brands/my-brand/agents/my-agent/verification',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "verificationState": "my_verificationState",
     *   //   "agentVerificationContact": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    getVerification(
      params: Params$Resource$Brands$Agents$Getverification,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    getVerification(
      params?: Params$Resource$Brands$Agents$Getverification,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    >;
    getVerification(
      params: Params$Resource$Brands$Agents$Getverification,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    getVerification(
      params: Params$Resource$Brands$Agents$Getverification,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    getVerification(
      params: Params$Resource$Brands$Agents$Getverification,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    getVerification(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    getVerification(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Getverification
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Getverification;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Getverification;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters
        );
      }
    }

    /**
     * Lists all the agents associated with a brand. *Note*: This method always sets `pageSize` to `0`.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.list({
     *     // If true, launch data (without questionnaire) is included in the agent response. Works only when used by carriers.
     *     includeLaunchData: 'placeholder-value',
     *     // Optional. Only return agents with this launch state. Works only when used by carriers.
     *     launchStateFilter: 'placeholder-value',
     *     // Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     *     pageSize: 'placeholder-value',
     *     // The next_page_token value returned from a previous List request, if any.
     *     pageToken: 'placeholder-value',
     *     // Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234". The brand identifier must be "-" to return all agents for an RBM carrier.
     *     parent: 'brands/my-brand',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "agents": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Brands$Agents$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Brands$Agents$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
    >;
    list(
      params: Params$Resource$Brands$Agents$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Brands$Agents$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
    ): void;
    list(
      params: Params$Resource$Brands$Agents$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/agents').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>(
          parameters
        );
      }
    }

    /**
     * Updates information about an agent. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.patch({
     *     // The unique identifier of the agent. Read-only. Defined by the platform.
     *     name: 'brands/my-brand/agents/my-agent',
     *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "displayName": "my_displayName",
     *       //   "brandName": "my_brandName",
     *       //   "rcsBusinessMessagingAgent": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName",
     *   //   "brandName": "my_brandName",
     *   //   "rcsBusinessMessagingAgent": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    patch(
      params: Params$Resource$Brands$Agents$Patch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    patch(
      params?: Params$Resource$Brands$Agents$Patch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    >;
    patch(
      params: Params$Resource$Brands$Agents$Patch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    patch(
      params: Params$Resource$Brands$Agents$Patch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    patch(
      params: Params$Resource$Brands$Agents$Patch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    patch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
    ): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Patch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>(
          parameters
        );
      }
    }

    /**
     * Begins the launch process for an agent. An agent is available to users after it launches. An agent can only have one instance of launch at a time.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.requestLaunch({
     *     // Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     *     name: 'brands/my-brand/agents/my-agent',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "agentLaunch": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "rcsBusinessMessaging": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    requestLaunch(
      params: Params$Resource$Brands$Agents$Requestlaunch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    requestLaunch(
      params?: Params$Resource$Brands$Agents$Requestlaunch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    >;
    requestLaunch(
      params: Params$Resource$Brands$Agents$Requestlaunch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    requestLaunch(
      params: Params$Resource$Brands$Agents$Requestlaunch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    requestLaunch(
      params: Params$Resource$Brands$Agents$Requestlaunch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    requestLaunch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    requestLaunch(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Requestlaunch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Requestlaunch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Requestlaunch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:requestLaunch').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters
        );
      }
    }

    /**
     * Submits business verification information for an agent. Depending on the carrier(s) selected at launch, either the carrier(s) or Google will contact the brand for verification. Only 1 instance of verification is allowed at any given time. *Caution*: Verification is not performed until a launch is requested. *Note*: Refer to the [brand verification FAQ](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification) for more information about the verification process.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.requestVerification({
     *     // Required. The unique identifier of the brand and agent.
     *     name: 'brands/my-brand/agents/my-agent',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "agentVerificationContact": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "verificationState": "my_verificationState",
     *   //   "agentVerificationContact": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    requestVerification(
      params: Params$Resource$Brands$Agents$Requestverification,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    requestVerification(
      params?: Params$Resource$Brands$Agents$Requestverification,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    >;
    requestVerification(
      params: Params$Resource$Brands$Agents$Requestverification,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    requestVerification(
      params: Params$Resource$Brands$Agents$Requestverification,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    requestVerification(
      params: Params$Resource$Brands$Agents$Requestverification,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    requestVerification(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    requestVerification(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Requestverification
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Requestverification;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Requestverification;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:requestVerification').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters
        );
      }
    }

    /**
     * Updates the launch information for an agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.updateLaunch({
     *     // Required. The identifier for launch.
     *     name: 'brands/my-brand/agents/my-agent/launch',
     *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "rcsBusinessMessaging": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "rcsBusinessMessaging": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    updateLaunch(
      params: Params$Resource$Brands$Agents$Updatelaunch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    updateLaunch(
      params?: Params$Resource$Brands$Agents$Updatelaunch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    >;
    updateLaunch(
      params: Params$Resource$Brands$Agents$Updatelaunch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    updateLaunch(
      params: Params$Resource$Brands$Agents$Updatelaunch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    updateLaunch(
      params: Params$Resource$Brands$Agents$Updatelaunch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    updateLaunch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
    ): void;
    updateLaunch(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Updatelaunch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Updatelaunch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Updatelaunch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>(
          parameters
        );
      }
    }

    /**
     * Updates the verification state for an agent. *Note*: Refer to the [brand verification FAQ](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification) for more information about the verification process.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.updateVerification({
     *     // Required. The identifier for verification.
     *     name: 'brands/my-brand/agents/my-agent/verification',
     *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "verificationState": "my_verificationState",
     *       //   "agentVerificationContact": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "verificationState": "my_verificationState",
     *   //   "agentVerificationContact": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    updateVerification(
      params: Params$Resource$Brands$Agents$Updateverification,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    updateVerification(
      params?: Params$Resource$Brands$Agents$Updateverification,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    >;
    updateVerification(
      params: Params$Resource$Brands$Agents$Updateverification,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    updateVerification(
      params: Params$Resource$Brands$Agents$Updateverification,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    updateVerification(
      params: Params$Resource$Brands$Agents$Updateverification,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    updateVerification(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
    ): void;
    updateVerification(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Updateverification
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Updateverification;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Updateverification;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Brands$Agents$Create
    extends StandardParameters {
    /**
     * Required. The unique identifier of the brand the agent represents. If the brand identifier is "1234", this parameter is "brands/1234".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Agent;
  }
  export interface Params$Resource$Brands$Agents$Delete
    extends StandardParameters {
    /**
     * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$Get
    extends StandardParameters {
    /**
     * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$Getlaunch
    extends StandardParameters {
    /**
     * Required. The unique identifier of the agent launch.
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$Getverification
    extends StandardParameters {
    /**
     * Required. The unique identifier of the brand and agent verification.
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$List
    extends StandardParameters {
    /**
     * If true, launch data (without questionnaire) is included in the agent response. Works only when used by carriers.
     */
    includeLaunchData?: boolean;
    /**
     * Optional. Only return agents with this launch state. Works only when used by carriers.
     */
    launchStateFilter?: string;
    /**
     * Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     */
    pageSize?: number;
    /**
     * The next_page_token value returned from a previous List request, if any.
     */
    pageToken?: string;
    /**
     * Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234". The brand identifier must be "-" to return all agents for an RBM carrier.
     */
    parent?: string;
  }
  export interface Params$Resource$Brands$Agents$Patch
    extends StandardParameters {
    /**
     * The unique identifier of the agent. Read-only. Defined by the platform.
     */
    name?: string;
    /**
     * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Agent;
  }
  export interface Params$Resource$Brands$Agents$Requestlaunch
    extends StandardParameters {
    /**
     * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentLaunchRequest;
  }
  export interface Params$Resource$Brands$Agents$Requestverification
    extends StandardParameters {
    /**
     * Required. The unique identifier of the brand and agent.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentVerificationRequest;
  }
  export interface Params$Resource$Brands$Agents$Updatelaunch
    extends StandardParameters {
    /**
     * Required. The identifier for launch.
     */
    name?: string;
    /**
     * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch;
  }
  export interface Params$Resource$Brands$Agents$Updateverification
    extends StandardParameters {
    /**
     * Required. The identifier for verification.
     */
    name?: string;
    /**
     * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification;
  }

  export class Resource$Brands$Agents$Integrations {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Create an integration.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.integrations.create({
     *     // Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     *     parent: 'brands/my-brand/agents/my-agent',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "status": "my_status",
     *       //   "dialogflowEsIntegration": {},
     *       //   "dialogflowCxIntegration": {},
     *       //   "agentWebhookIntegration": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "status": "my_status",
     *   //   "dialogflowEsIntegration": {},
     *   //   "dialogflowCxIntegration": {},
     *   //   "agentWebhookIntegration": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    create(
      params: Params$Resource$Brands$Agents$Integrations$Create,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    create(
      params?: Params$Resource$Brands$Agents$Integrations$Create,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    >;
    create(
      params: Params$Resource$Brands$Agents$Integrations$Create,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    create(
      params: Params$Resource$Brands$Agents$Integrations$Create,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    create(
      params: Params$Resource$Brands$Agents$Integrations$Create,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    create(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Integrations$Create
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Integrations$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Integrations$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/integrations').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters
        );
      }
    }

    /**
     * Delete an integration.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.integrations.delete({
     *     // Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
     *     name: 'brands/my-brand/agents/my-agent/integrations/my-integration',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Brands$Agents$Integrations$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Brands$Agents$Integrations$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Brands$Agents$Integrations$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Brands$Agents$Integrations$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Brands$Agents$Integrations$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Integrations$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Integrations$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Integrations$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Get an integration.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.integrations.get({
     *     // Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
     *     name: 'brands/my-brand/agents/my-agent/integrations/my-integration',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "status": "my_status",
     *   //   "dialogflowEsIntegration": {},
     *   //   "dialogflowCxIntegration": {},
     *   //   "agentWebhookIntegration": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Brands$Agents$Integrations$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Brands$Agents$Integrations$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    >;
    get(
      params: Params$Resource$Brands$Agents$Integrations$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Brands$Agents$Integrations$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    get(
      params: Params$Resource$Brands$Agents$Integrations$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Integrations$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Integrations$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Integrations$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters
        );
      }
    }

    /**
     * List integrations.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.integrations.list({
     *     // Currently this field is unsupported because the number of agent-level integrations is too few for pagination to be needed. This field will be ignored if passed. Specify the maximum number of results for the server to return. The server may further limit the maximum number of results returned per page. If the page_size is 0, the server will decide how many results are returned. Optional
     *     pageSize: 'placeholder-value',
     *     // Currently this field is unsupported as the number of agent-level integrations is too few for pagination to be needed. This field will be ignored if passed. The next_page_token value returned from a previous List request, if any. Optional
     *     pageToken: 'placeholder-value',
     *     // Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     *     parent: 'brands/my-brand/agents/my-agent',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "integrations": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Brands$Agents$Integrations$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Brands$Agents$Integrations$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
    >;
    list(
      params: Params$Resource$Brands$Agents$Integrations$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Brands$Agents$Integrations$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
    ): void;
    list(
      params: Params$Resource$Brands$Agents$Integrations$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Integrations$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Integrations$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Integrations$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/integrations').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>(
          parameters
        );
      }
    }

    /**
     * Update an integration. For adding a DialogflowDocument, only the "dialogflow_es_integration.dialogflow_knowledge_bases" flag should be specified. Adding a document should be an isolated update.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.brands.agents.integrations.patch({
     *     // Output only. The unique identifier of the integration. Read-only. Defined by the platform.
     *     name: 'brands/my-brand/agents/my-agent/integrations/my-integration',
     *     // Required. The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "status": "my_status",
     *       //   "dialogflowEsIntegration": {},
     *       //   "dialogflowCxIntegration": {},
     *       //   "agentWebhookIntegration": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "status": "my_status",
     *   //   "dialogflowEsIntegration": {},
     *   //   "dialogflowCxIntegration": {},
     *   //   "agentWebhookIntegration": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    patch(
      params: Params$Resource$Brands$Agents$Integrations$Patch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    patch(
      params?: Params$Resource$Brands$Agents$Integrations$Patch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    >;
    patch(
      params: Params$Resource$Brands$Agents$Integrations$Patch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    patch(
      params: Params$Resource$Brands$Agents$Integrations$Patch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    patch(
      params: Params$Resource$Brands$Agents$Integrations$Patch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    patch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
    ): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Brands$Agents$Integrations$Patch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Brands$Agents$Integrations$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Brands$Agents$Integrations$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Brands$Agents$Integrations$Create
    extends StandardParameters {
    /**
     * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Integration;
  }
  export interface Params$Resource$Brands$Agents$Integrations$Delete
    extends StandardParameters {
    /**
     * Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$Integrations$Get
    extends StandardParameters {
    /**
     * Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
     */
    name?: string;
  }
  export interface Params$Resource$Brands$Agents$Integrations$List
    extends StandardParameters {
    /**
     * Currently this field is unsupported because the number of agent-level integrations is too few for pagination to be needed. This field will be ignored if passed. Specify the maximum number of results for the server to return. The server may further limit the maximum number of results returned per page. If the page_size is 0, the server will decide how many results are returned. Optional
     */
    pageSize?: number;
    /**
     * Currently this field is unsupported as the number of agent-level integrations is too few for pagination to be needed. This field will be ignored if passed. The next_page_token value returned from a previous List request, if any. Optional
     */
    pageToken?: string;
    /**
     * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
     */
    parent?: string;
  }
  export interface Params$Resource$Brands$Agents$Integrations$Patch
    extends StandardParameters {
    /**
     * Output only. The unique identifier of the integration. Read-only. Defined by the platform.
     */
    name?: string;
    /**
     * Required. The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Integration;
  }

  export class Resource$Criticalagents {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Creates a new critical agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.criticalAgents.create({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    create(
      params: Params$Resource$Criticalagents$Create,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    create(
      params?: Params$Resource$Criticalagents$Create,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    >;
    create(
      params: Params$Resource$Criticalagents$Create,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    create(
      params: Params$Resource$Criticalagents$Create,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    create(
      params: Params$Resource$Criticalagents$Create,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    create(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Criticalagents$Create
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Criticalagents$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Criticalagents$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/criticalAgents').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>(
          parameters
        );
      }
    }

    /**
     * Deletes a critical agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.criticalAgents.delete({
     *     // Required. The unique identifier of the critical agent. If the critical agent identifier is "abc@rbm.goog", this parameter resolves to "criticalAgents/abc@rbm.goog".
     *     name: 'criticalAgents/my-criticalAgent',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Criticalagents$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Criticalagents$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Criticalagents$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Criticalagents$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Criticalagents$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Criticalagents$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Criticalagents$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Criticalagents$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Gets information about a critical agent.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.criticalAgents.get({
     *     // Required. The name of the criticalAgent to retrieve. Format: criticalAgents/{criticalAgent\}, for example criticalAgents/abc@rbm.goog
     *     name: 'criticalAgents/my-criticalAgent',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Criticalagents$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Criticalagents$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    >;
    get(
      params: Params$Resource$Criticalagents$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Criticalagents$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    get(
      params: Params$Resource$Criticalagents$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Criticalagents$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Criticalagents$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Criticalagents$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent>(
          parameters
        );
      }
    }

    /**
     * Lists all the critical agents accessible to the user making the request.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.criticalAgents.list({
     *     // Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     *     pageSize: 'placeholder-value',
     *     // Optional. The next_page_token value returned from a previous List request, if any.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "criticalAgents": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Criticalagents$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Criticalagents$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
    >;
    list(
      params: Params$Resource$Criticalagents$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Criticalagents$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
    ): void;
    list(
      params: Params$Resource$Criticalagents$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Criticalagents$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Criticalagents$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Criticalagents$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/criticalAgents').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListCriticalAgentsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Criticalagents$Create
    extends StandardParameters {
    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1CriticalAgent;
  }
  export interface Params$Resource$Criticalagents$Delete
    extends StandardParameters {
    /**
     * Required. The unique identifier of the critical agent. If the critical agent identifier is "abc@rbm.goog", this parameter resolves to "criticalAgents/abc@rbm.goog".
     */
    name?: string;
  }
  export interface Params$Resource$Criticalagents$Get
    extends StandardParameters {
    /**
     * Required. The name of the criticalAgent to retrieve. Format: criticalAgents/{criticalAgent\}, for example criticalAgents/abc@rbm.goog
     */
    name?: string;
  }
  export interface Params$Resource$Criticalagents$List
    extends StandardParameters {
    /**
     * Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     */
    pageSize?: number;
    /**
     * Optional. The next_page_token value returned from a previous List request, if any.
     */
    pageToken?: string;
  }

  export class Resource$Partners {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Get the information about the partner.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.partners.get({
     *     // Optional. The unique identifier of the partner.
     *     name: 'partners/my-partner',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName",
     *   //   "productCapabilities": [],
     *   //   "company": "my_company",
     *   //   "contactEmails": [],
     *   //   "technicalContact": {},
     *   //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Partners$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Partners$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    >;
    get(
      params: Params$Resource$Partners$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Partners$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    get(
      params: Params$Resource$Partners$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Partners$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Partners$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>(
          parameters
        );
      }
    }

    /**
     * Updates the information for a partner.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.partners.patch({
     *     // Immutable. The unique identifier of the partner. Defined by the platform.
     *     name: 'partners/my-partner',
     *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "displayName": "my_displayName",
     *       //   "productCapabilities": [],
     *       //   "company": "my_company",
     *       //   "contactEmails": [],
     *       //   "technicalContact": {},
     *       //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "displayName": "my_displayName",
     *   //   "productCapabilities": [],
     *   //   "company": "my_company",
     *   //   "contactEmails": [],
     *   //   "technicalContact": {},
     *   //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    patch(
      params: Params$Resource$Partners$Patch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    patch(
      params?: Params$Resource$Partners$Patch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    >;
    patch(
      params: Params$Resource$Partners$Patch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    patch(
      params: Params$Resource$Partners$Patch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    patch(
      params: Params$Resource$Partners$Patch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    patch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
    ): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Partners$Patch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Partners$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Partners$Get extends StandardParameters {
    /**
     * Optional. The unique identifier of the partner.
     */
    name?: string;
  }
  export interface Params$Resource$Partners$Patch extends StandardParameters {
    /**
     * Immutable. The unique identifier of the partner. Defined by the platform.
     */
    name?: string;
    /**
     * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Partner;
  }

  export class Resource$Regions {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Lists all RCS for Business regions.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.regions.list({});
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "regions": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Regions$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Regions$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
    >;
    list(
      params: Params$Resource$Regions$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Regions$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
    ): void;
    list(
      params: Params$Resource$Regions$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Regions$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Regions$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Regions$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/regions').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Regions$List extends StandardParameters {}

  export class Resource$Subscriberprofiles {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Deletes a subscriber profile.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.subscriberProfiles.delete({
     *     // Required. The unique identifier of the subscriber profile, which is a phone number in E.164 format.
     *     name: 'subscriberProfiles/my-subscriberProfile',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Subscriberprofiles$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Subscriberprofiles$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Subscriberprofiles$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Subscriberprofiles$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Subscriberprofiles$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Subscriberprofiles$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Subscriberprofiles$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Subscriberprofiles$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Gets information about a subscriber profile.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.subscriberProfiles.get({
     *     // Required. The unique identifier of the subscriber profile, which is a phone number in E.164 format.
     *     name: 'subscriberProfiles/my-subscriberProfile',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "blockAll": false,
     *   //   "blockedAgentIds": [],
     *   //   "testingAllowed": false
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Subscriberprofiles$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Subscriberprofiles$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    >;
    get(
      params: Params$Resource$Subscriberprofiles$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Subscriberprofiles$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    get(
      params: Params$Resource$Subscriberprofiles$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Subscriberprofiles$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Subscriberprofiles$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Subscriberprofiles$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>(
          parameters
        );
      }
    }

    /**
     * Lists all the subscriber profiles accessible to the user making the request. *Note*: This method always sets `pageSize` to `0`.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.subscriberProfiles.list({
     *     // Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     *     pageSize: 'placeholder-value',
     *     // Optional. The next_page_token value returned from a previous List request, if any.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "subscriberProfiles": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Subscriberprofiles$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Subscriberprofiles$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
    >;
    list(
      params: Params$Resource$Subscriberprofiles$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Subscriberprofiles$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
    ): void;
    list(
      params: Params$Resource$Subscriberprofiles$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Subscriberprofiles$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Subscriberprofiles$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Subscriberprofiles$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/subscriberProfiles').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSubscriberProfilesResponse>(
          parameters
        );
      }
    }

    /**
     * Creates a new subscriber profile or updates information about an existing subscriber profile. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.subscriberProfiles.patch({
     *     // Optional. If set to true, and the subscriber profile is not found, a new subscriber profile will be created. In this situation, `update_mask` is ignored.
     *     allowMissing: 'placeholder-value',
     *     // Required. Output only. Identifier. The phone number of the subscriber profile in E.164 format.
     *     name: 'subscriberProfiles/my-subscriberProfile',
     *     // Optional. The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "blockAll": false,
     *       //   "blockedAgentIds": [],
     *       //   "testingAllowed": false
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "blockAll": false,
     *   //   "blockedAgentIds": [],
     *   //   "testingAllowed": false
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    patch(
      params: Params$Resource$Subscriberprofiles$Patch,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    patch(
      params?: Params$Resource$Subscriberprofiles$Patch,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    >;
    patch(
      params: Params$Resource$Subscriberprofiles$Patch,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    patch(
      params: Params$Resource$Subscriberprofiles$Patch,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    patch(
      params: Params$Resource$Subscriberprofiles$Patch,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    patch(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
    ): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Subscriberprofiles$Patch
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Subscriberprofiles$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Subscriberprofiles$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Subscriberprofiles$Delete
    extends StandardParameters {
    /**
     * Required. The unique identifier of the subscriber profile, which is a phone number in E.164 format.
     */
    name?: string;
  }
  export interface Params$Resource$Subscriberprofiles$Get
    extends StandardParameters {
    /**
     * Required. The unique identifier of the subscriber profile, which is a phone number in E.164 format.
     */
    name?: string;
  }
  export interface Params$Resource$Subscriberprofiles$List
    extends StandardParameters {
    /**
     * Optional. Specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
     */
    pageSize?: number;
    /**
     * Optional. The next_page_token value returned from a previous List request, if any.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Subscriberprofiles$Patch
    extends StandardParameters {
    /**
     * Optional. If set to true, and the subscriber profile is not found, a new subscriber profile will be created. In this situation, `update_mask` is ignored.
     */
    allowMissing?: boolean;
    /**
     * Required. Output only. Identifier. The phone number of the subscriber profile in E.164 format.
     */
    name?: string;
    /**
     * Optional. The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1SubscriberProfile;
  }

  export class Resource$Surveyquestions {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Lists all Google predefined survey questions. *Note*: This method always sets `pageSize` to `0`.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.surveyQuestions.list({
     *     // Optional. List Google template questions by locale. Locale is represented by a well-formed IETF BCP 47 language tag. Default is EN.
     *     locale: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "surveyQuestions": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Surveyquestions$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Surveyquestions$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
    >;
    list(
      params: Params$Resource$Surveyquestions$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Surveyquestions$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
    ): void;
    list(
      params: Params$Resource$Surveyquestions$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Surveyquestions$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Surveyquestions$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Surveyquestions$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/surveyQuestions').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Surveyquestions$List
    extends StandardParameters {
    /**
     * Optional. List Google template questions by locale. Locale is represented by a well-formed IETF BCP 47 language tag. Default is EN.
     */
    locale?: string;
  }

  export class Resource$Testers {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Deletes a tester device.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.testers.delete({
     *     // Agent ID.
     *     agentId: 'placeholder-value',
     *     // Required. The unique identifier of the tester. If tester phone number is "+1112223333", this parameter resolves to "testers/+1112223333".
     *     name: 'testers/my-tester',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    delete(
      params: Params$Resource$Testers$Delete,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    delete(
      params?: Params$Resource$Testers$Delete,
      options?: MethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>;
    delete(
      params: Params$Resource$Testers$Delete,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    delete(
      params: Params$Resource$Testers$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(
      params: Params$Resource$Testers$Delete,
      callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Testers$Delete
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleProtobufEmpty>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<GaxiosResponseWithHTTP2<Schema$GoogleProtobufEmpty>>
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Testers$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Testers$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleProtobufEmpty>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleProtobufEmpty>(parameters);
      }
    }

    /**
     * Gets the invite status of a tester device.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.testers.get({
     *     // Agent ID.
     *     agentId: 'placeholder-value',
     *     // Required. The unique identifier of the tester. If the tester phone number is "+1112223333", this parameter resolves to "testers/+1112223333".
     *     name: 'testers/my-tester',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "agentId": "my_agentId",
     *   //   "phoneNumber": "my_phoneNumber",
     *   //   "inviteStatus": "my_inviteStatus"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    get(
      params: Params$Resource$Testers$Get,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    get(
      params?: Params$Resource$Testers$Get,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    >;
    get(
      params: Params$Resource$Testers$Get,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    get(
      params: Params$Resource$Testers$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    get(
      params: Params$Resource$Testers$Get,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Testers$Get
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Testers$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Testers$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>(
          parameters
        );
      }
    }

    /**
     * List the invite statuses of tester devices.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.testers.list({
     *     // Agent ID.
     *     agentId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "testers": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    list(
      params: Params$Resource$Testers$List,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    list(
      params?: Params$Resource$Testers$List,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
    >;
    list(
      params: Params$Resource$Testers$List,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    list(
      params: Params$Resource$Testers$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
    ): void;
    list(
      params: Params$Resource$Testers$List,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Testers$List
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$Testers$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Testers$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/testers').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1ListTestersResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Testers$Delete extends StandardParameters {
    /**
     * Agent ID.
     */
    agentId?: string;
    /**
     * Required. The unique identifier of the tester. If tester phone number is "+1112223333", this parameter resolves to "testers/+1112223333".
     */
    name?: string;
  }
  export interface Params$Resource$Testers$Get extends StandardParameters {
    /**
     * Agent ID.
     */
    agentId?: string;
    /**
     * Required. The unique identifier of the tester. If the tester phone number is "+1112223333", this parameter resolves to "testers/+1112223333".
     */
    name?: string;
  }
  export interface Params$Resource$Testers$List extends StandardParameters {
    /**
     * Agent ID.
     */
    agentId?: string;
  }

  export class Resource$V1 {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * Sends an invite to a phone number to be added as a tester. The invited user must be RCS-enabled and reachable by the RBM platform. When an agent invites a user to become a tester, an RBM platform management agent sends a message to the user asking for confirmation that she wants to be a tester of the agent. Once the user confirms, she becomes a tester. An agent can send 20 tester requests each day with a total maximum of 200 tester requests. If you send tester requests above those limits, the RBM platform returns a `429 RESOURCE_EXHAUSTED` response.
     * @example
     * ```js
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
     * // - Login into gcloud by running:
     * //   ```sh
     * //   $ gcloud auth application-default login
     * //   ```
     * // - Install the npm module by running:
     * //   ```sh
     * //   $ npm install googleapis
     * //   ```
     *
     * const {google} = require('googleapis');
     * const businesscommunications = google.businesscommunications('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options({auth: authClient});
     *
     *   // Do the magic
     *   const res = await businesscommunications.testers({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "name": "my_name",
     *       //   "agentId": "my_agentId",
     *       //   "phoneNumber": "my_phoneNumber",
     *       //   "inviteStatus": "my_inviteStatus"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "agentId": "my_agentId",
     *   //   "phoneNumber": "my_phoneNumber",
     *   //   "inviteStatus": "my_inviteStatus"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * ```
     *
     * @param params - Parameters for request
     * @param options - Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param callback - Optional callback that handles the response.
     * @returns A promise if used with async/await, or void if used with a callback.
     */
    testers(
      params: Params$Resource$V1$Testers,
      options: StreamMethodOptions
    ): Promise<GaxiosResponseWithHTTP2<Readable>>;
    testers(
      params?: Params$Resource$V1$Testers,
      options?: MethodOptions
    ): Promise<
      GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    >;
    testers(
      params: Params$Resource$V1$Testers,
      options: StreamMethodOptions | BodyResponseCallback<Readable>,
      callback: BodyResponseCallback<Readable>
    ): void;
    testers(
      params: Params$Resource$V1$Testers,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    testers(
      params: Params$Resource$V1$Testers,
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    testers(
      callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
    ): void;
    testers(
      paramsOrCallback?:
        | Params$Resource$V1$Testers
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>,
      optionsOrCallback?:
        | MethodOptions
        | StreamMethodOptions
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>,
      callback?:
        | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        | BodyResponseCallback<Readable>
    ):
      | void
      | Promise<
          GaxiosResponseWithHTTP2<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>
        >
      | Promise<GaxiosResponseWithHTTP2<Readable>> {
      let params = (paramsOrCallback || {}) as Params$Resource$V1$Testers;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$V1$Testers;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://businesscommunications.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/testers').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
            apiVersion: '',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>(
          parameters,
          callback as BodyResponseCallback<unknown>
        );
      } else {
        return createAPIRequest<Schema$GoogleCommunicationsBusinesscommunicationsV1Tester>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$V1$Testers extends StandardParameters {
    /**
     * Request body metadata
     */
    requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Tester;
  }
}
