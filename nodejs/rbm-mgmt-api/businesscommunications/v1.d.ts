/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, BaseExternalAccountClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace businesscommunications_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | BaseExternalAccountClient | GoogleAuth;
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
        brands: Resource$Brands;
        partners: Resource$Partners;
        regions: Resource$Regions;
        surveyQuestions: Resource$Surveyquestions;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A conversational entity that represents a brand.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Agent {
        /**
         * Detailed agent information for Business Messages.
         */
        businessMessagesAgent?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgent;
        /**
         * Required. The name that the agent displays to users. Maximum 100 characters. Not modifiable after agent verification.
         */
        displayName?: string | null;
        /**
         * The unique identifier of the agent. Read-only. Defined by the platform.
         */
        name?: string | null;
        /**
         * Detailed agent information for RCS Business Messaging.
         */
        rcsBusinessMessagingAgent?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgent;
        /**
         * Detailed agent information for Verified SMS.
         */
        verifiedSmsAgent?: Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsAgent;
    }
    /**
     * Details about an agent launch.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch {
        /**
         * Launch details for a Business Messages agent.
         */
        businessMessages?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesLaunch;
        /**
         * Required. The identifier for launch.
         */
        name?: string | null;
        /**
         * Launch details for an RCS Business Messaging agent.
         */
        rcsBusinessMessaging?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunch;
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
     * Details for bot representative.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BotRepresentative {
        /**
         * Required. Bot messaging availability.
         */
        botMessagingAvailability?: Schema$GoogleCommunicationsBusinesscommunicationsV1MessagingAvailability;
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
     * Agent information specific to Business Messages.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgent {
        /**
         * Optional. Additional agent interaction information. Enables the agent to support multiple interaction types.
         */
        additionalAgentInteractions?: Schema$GoogleCommunicationsBusinesscommunicationsV1SupportedAgentInteraction[];
        /**
         * Output only. The URL for testing the agent's conversational experience. Defined by the platform.
         */
        agentTestUrl?: string | null;
        /**
         * Optional. Authorization configuration for OAuth support.
         */
        authorizationConfig?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentAuthorizationConfig;
        /**
         * Required. Conversational settings for an agent, mapped to a locale. Locale is represented by a well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag.
         */
        conversationalSettings?: {
            [key: string]: Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationalSetting;
        } | null;
        /**
         * Optional. A partner-specified identifier for the agent. The identifier is passed alongside all messages sent to the agent.
         */
        customAgentId?: string | null;
        /**
         * Required. The default locale for the agent. Must match a locale defined in `conversationalSettings`.
         */
        defaultLocale?: string | null;
        /**
         * Optional. List of entry point configurations. Not modifiable after agent verification.
         */
        entryPointConfigs?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesEntryPointConfig[];
        /**
         * Optional. Publicly available URL of the logo for the agent. Maximum 50 KB. Not modifiable after agent verification.
         */
        logoUrl?: string | null;
        /**
         * Optional. Configuration for non-local entry points.
         */
        nonLocalConfig?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentNonLocalConfig;
        /**
         * Optional. The phone number for the agent to display. If not specified, the agent displays the phone number for the brand found in the [Google Knowledge Graph](https://developers.google.com/knowledge-graph), if any.
         */
        phone?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone;
        /**
         * Required. Primary agent interaction information. Used when the user initiates a conversation.
         */
        primaryAgentInteraction?: Schema$GoogleCommunicationsBusinesscommunicationsV1SupportedAgentInteraction;
        /**
         * Optional. Configuration to enable custom surveys.
         */
        surveyConfig?: Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyConfig;
        /**
         * Output only. URLs for testing the agent's conversational experience. Defined by the platform.
         */
        testUrls?: Schema$GoogleCommunicationsBusinesscommunicationsV1TestUrl[];
    }
    /**
     * Configuration details for supporting OAuth on Business Messages.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentAuthorizationConfig {
        /**
         * The endpoint URL where the user logs in.
         */
        endpointUrl?: string | null;
    }
    /**
     * Configuration to enable non-local entry points.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentNonLocalConfig {
        /**
         * Required. List of phone numbers for call deflection.
         */
        callDeflectionPhoneNumbers?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone[];
        /**
         * Required. Contact information for the agent that displays with the messaging button.
         */
        contactOption?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentNonLocalConfigContactOption;
        /**
         * Required. Domains to enable for the sitelinks entry point.
         */
        enabledDomains?: string[] | null;
        /**
         * Required. Agent's phone number. Overrides the `phone` field for conversations started from non-local entry points. This phone number will be used for all configured regions.
         */
        phoneNumber?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone;
        /**
         * Required. List of [CLDR region codes](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for countries where the agent is allowed to launch `NON_LOCAL` entry points. Required for `NON_LOCAL` entry points.
         */
        regionCodes?: string[] | null;
    }
    /**
     * Contact details displayed in addition to the messaging button.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesAgentNonLocalConfigContactOption {
        /**
         * Required. The list of contact options available for the specified URL.
         */
        options?: string[] | null;
        /**
         * Required. The URL that contact options are available for.
         */
        url?: string | null;
    }
    /**
     * Business Messages capabilities
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesCapability {
        /**
         * Required. The webhook URL where the messages are delivered.
         */
        webhookUrl?: string | null;
    }
    /**
     * The entry point configuration for an agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesEntryPointConfig {
        /**
         * Required. The Google surfaces the agent is enabled to appear on.
         */
        allowedEntryPoint?: string | null;
    }
    /**
     * Details about Business Messages agent launch for each entry point.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesEntryPointLaunch {
        /**
         * Entry point for which launch information is provided.
         */
        entryPoint?: string | null;
        /**
         * The launch state for entry point.
         */
        launchState?: string | null;
        /**
         * List of [CLDR region codes](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for countries where the agent should launch `NON_LOCAL` entry points. Required for `NON_LOCAL` entry points. This must be a subset of the region codes specified in the agent's `nonLocalConfig`.
         */
        regionCodes?: string[] | null;
    }
    /**
     * Details about a Business Messages agent launch.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesLaunch {
        /**
         * Required. Launch details for each supported entry point. Key represented by BusinessMessagesEntryPointConfig.EntryPoint
         */
        launchDetails?: {
            [key: string]: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesEntryPointLaunch;
        } | null;
    }
    /**
     * Conversational setting for an agent or location. Each locale has its own conversational settings. Locale is represented by a well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationalSetting {
        /**
         * Optional. Details about the agent's conversation starters. Maximum 5.
         */
        conversationStarters?: Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationStarters[];
        /**
         * Optional. Details about the offline message for an agent.
         */
        offlineMessage?: Schema$GoogleCommunicationsBusinesscommunicationsV1OfflineMessage;
        /**
         * Required. Details about the agent's privacy policy.
         */
        privacyPolicy?: Schema$GoogleCommunicationsBusinesscommunicationsV1PrivacyPolicy;
        /**
         * Required. Details about the welcome message for an agent.
         */
        welcomeMessage?: Schema$GoogleCommunicationsBusinesscommunicationsV1WelcomeMessage;
    }
    /**
     * Suggested replies shown to users when they enter a conversation with the agent for the first time.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationStarters {
        /**
         * Optional. Suggestion at the beginning of a conversation.
         */
        suggestion?: Schema$GoogleCommunicationsBusinesscommunicationsV1Suggestion;
    }
    /**
     * Custom survey configuration for an agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1CustomSurveyConfig {
        /**
         * List of custom questions.
         */
        customQuestions?: Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyQuestion[];
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
     * Details about a greeting.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting {
        /**
         * Output only. The ad link corresponding to this greeting.
         */
        adLink?: string | null;
        /**
         * Optional. Details about the conversation starters. Maximum 5.
         */
        conversationStarters?: Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationStarters[];
        /**
         * Optional. A custom identifier defined by the partner.
         */
        customId?: string | null;
        /**
         * Required. The locale is a well-formed IETF BCP 47 language tag. It must match a locale defined in ConversationalSettings.
         */
        locale?: string | null;
        /**
         * Output only. The name of the greeting, as set by Business Messages. Resolves to "brands/{brand_id\}/agents/{agent_id\}/greetings/{greeting_id\}" where {greeting_id\} is the unique ID of the greeting.
         */
        name?: string | null;
        /**
         * Required. Welcome message content. A greeting must have at least one welcome message defined.
         */
        welcomeMessages?: Schema$GoogleCommunicationsBusinesscommunicationsV1WelcomeMessage[];
    }
    /**
     * Details for human representative.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1HumanRepresentative {
        /**
         * Required. Human messaging availability.
         */
        humanMessagingAvailability?: Schema$GoogleCommunicationsBusinesscommunicationsV1MessagingAvailability;
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
     * The list of greetings associated with the agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse {
        /**
         * The list of greetings.
         */
        greetings?: Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting[];
        /**
         * The pagination token to retrieve the next page of results. If the value is "", there are no more results for the request.
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
     * A list of locations.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse {
        /**
         * List of locations.
         */
        locations?: Schema$GoogleCommunicationsBusinesscommunicationsV1Location[];
        /**
         * The pagination token to retrieve the next page of results. If the value is "", it means no further results for the request.
         */
        nextPageToken?: string | null;
    }
    /**
     * A list of all RCS Business Messaging regions.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse {
        /**
         * List of all RCS Business Messaging regions.
         */
        regions?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegion[];
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
     * Information about a physical location of a brand.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Location {
        /**
         * Required. The name of the agent associated with the location. If the brand identifier is "1234" and the agent identifier is "5678", this field resolves to "brands/1234/agents/5678".
         */
        agent?: string | null;
        /**
         * Optional. Conversational settings for an location, mapped to a locale. Locale is represented by a well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag.
         */
        conversationalSettings?: {
            [key: string]: Schema$GoogleCommunicationsBusinesscommunicationsV1ConversationalSetting;
        } | null;
        /**
         * Required. The default locale for the location.
         */
        defaultLocale?: string | null;
        /**
         * Output only. Identifies the Google My Business Listing this Location is associated with.
         */
        listingId?: string | null;
        /**
         * List of entry point configurations for locations. Not modifiable after being available to users through an agent.
         */
        locationEntryPointConfigs?: Schema$GoogleCommunicationsBusinesscommunicationsV1LocationEntryPointConfig[];
        /**
         * Output only. The URL for testing the location's conversational experience. Defined by the platform.
         */
        locationTestUrl?: string | null;
        /**
         * The unique identifier of the location. Read-only. Defined by the platform.
         */
        name?: string | null;
        /**
         * Required. The [Place ID](https://developers.google.com/places/place-id), or unique identifier used in Google Maps, for the location. Not modifiable after being available to users through an agent.
         */
        placeId?: string | null;
        /**
         * Output only. URLs for testing the location's conversational experience. Defined by the platform.
         */
        testUrls?: Schema$GoogleCommunicationsBusinesscommunicationsV1TestUrl[];
    }
    /**
     * The entry point configuration for a location.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1LocationEntryPointConfig {
        /**
         * Required. The Google surfaces the location is enabled to appear on.
         */
        allowedEntryPoint?: string | null;
    }
    /**
     * Details about a location launch.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch {
        /**
         * The launch state.
         */
        launchState?: string | null;
        /**
         * Required. The identifier for launch.
         */
        name?: string | null;
    }
    /**
     * Details about the verification information for a location.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification {
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
     * The hours of each day of the week that messaging is available. You can group hours for multiple days together. For example, * 08:00–16:00 hrs PDT Monday–Wednesday * 10:00–14:00 hrs PDT Thursday–Friday * 15:00–18:00 hrs PDT Thursday–Friday * 10:00–14:00 hrs PDT Saturday–Saturday If there are gaps in availability, such as no specified availability on Sunday, messaging is unavailable during those gaps. Bot hours have no effect on availability. Bot-only agents always display a welcome message, while agents with both human and bot representative settings only consider human representatives when defining availability.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1MessagingAvailability {
        /**
         * Required. Hours of messaging availability.
         */
        hours?: Schema$GoogleCommunicationsBusinesscommunicationsV1MessagingAvailabilityHours[];
    }
    /**
     * A range of hours that messaging is available.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1MessagingAvailabilityHours {
        /**
         * Required. End day. Includes the specified day.
         */
        endDay?: string | null;
        /**
         * Required. End time for each day within the day-of-week range.
         */
        endTime?: Schema$GoogleTypeTimeOfDay;
        /**
         * Required. Start day.
         */
        startDay?: string | null;
        /**
         * Required. Start time for each day within the day-of-week range.
         */
        startTime?: Schema$GoogleTypeTimeOfDay;
        /**
         * Required. The [IANA time zone](https://www.iana.org/time-zones) for the hours. For example, "America/Los_Angeles".
         */
        timeZone?: string | null;
    }
    /**
     * The greeting shown to users when they enter a conversation with the agent outside the chat hours.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1OfflineMessage {
        /**
         * The text of the offline message. Maximum length 1000 characters.
         */
        text?: string | null;
    }
    /**
     * Opens the specified URL.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1OpenUrlAction {
        /**
         * URL
         */
        url?: string | null;
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
    }
    /**
     * Phone number.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Phone {
        /**
         * Required. Phone number in E.164 format. For example, "+12223334444".
         */
        number?: string | null;
    }
    /**
     * Privacy policy details for an agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1PrivacyPolicy {
        /**
         * Required. The URL for the privacy policy.
         */
        url?: string | null;
    }
    /**
     * The product capabilities that the partner supports.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1ProductCapability {
        /**
         * Business Messages capability.
         */
        businessMessagesCapability?: Schema$GoogleCommunicationsBusinesscommunicationsV1BusinessMessagesCapability;
        /**
         * The product supported by the partner.
         */
        product?: string | null;
        /**
         * RCS Business Messaging capability = 4;
         */
        rcsBusinessMessagingCapability?: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingCapability;
        /**
         * Verified SMS capability.
         */
        verifiedSmsCapability?: Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsCapability;
    }
    /**
     * Agent information specifically related to RCS Business Messaging.
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
         * Required. Description of the agent that is visible to users. Maximum 100 characters.
         */
        description?: string | null;
        /**
         * Optional. Email addresses associated with the agent.
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
         * Required. Publicly available URL of the logo for the agent. Maximum 50 KB. Not modifiable after agent verification.
         */
        logoUri?: string | null;
        /**
         * Required. Phone numbers associated with the agent.
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
         * Optional. Websites associated with the agent. Maximum 3.
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
     * A phone number associated with the agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentPhoneEntry {
        /**
         * Required. Label for the phone number.
         */
        label?: string | null;
        /**
         * Required. Phone number in E.164 format. For example, `+12223334444`.
         */
        phoneNumber?: Schema$GoogleCommunicationsBusinesscommunicationsV1Phone;
    }
    /**
     * A web-based resource associated with the agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingAgentWebEntry {
        /**
         * Optional. Label for the URI.
         */
        label?: string | null;
        /**
         * Required. A publicly accessible URI associated with the agent. Must use the HTTP or HTTPS protocol.
         */
        uri?: string | null;
    }
    /**
     * RCS Business Messaging capabilities
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingCapability {
        /**
         * Required. The webhook URL where the messages are delivered.
         */
        webhookUrl?: string | null;
    }
    /**
     * Details about an RCS Business Messaging agent launch.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingLaunch {
        /**
         * Required. Launch details for each supported region. Key represented by RcsBusinessMessagingRegion.name.
         */
        launchDetails?: {
            [key: string]: Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegionLaunch;
        } | null;
        /**
         * Launch region for an agent. Optional: will be set as NORTH_AMERICA if not provided. This field is deprecated. Hosting region can only be specified during agent creation.
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
         * Required. Description of how you obtain opt-in to message users with the agent.
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
     * RCS Business Messaging region information.
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
     * Details about RCS Business Messaging agent launch for each region.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RcsBusinessMessagingRegionLaunch {
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
     * Request to launch a location.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RequestLocationLaunchRequest {
    }
    /**
     * Request to begin business information verification for a location.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1RequestLocationVerificationRequest {
    }
    /**
     * When tapped, initiates the corresponding native action on the device.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SuggestedAction {
        /**
         * Opens the specified URL.
         */
        openUrlAction?: Schema$GoogleCommunicationsBusinesscommunicationsV1OpenUrlAction;
        /**
         * The string that the agent receives when a user taps the suggested action.
         */
        postbackData?: string | null;
        /**
         * Text that is shown in the suggested action. Maximum 35 characters.
         */
        text?: string | null;
    }
    /**
     * When tapped, sends the text reply back to the agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SuggestedReply {
        /**
         * Optional. The string the agent receives when the user taps the suggested reply.
         */
        postbackData?: string | null;
        /**
         * Required. Text that is shown in the suggested reply and sent back to the agent when the user taps it. Maximum 35 characters.
         */
        text?: string | null;
    }
    /**
     * A suggested reply.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1Suggestion {
        /**
         * A suggested action that initiates a native action on the device.
         */
        action?: Schema$GoogleCommunicationsBusinesscommunicationsV1SuggestedAction;
        /**
         * Users can tap a suggested reply to send the text back to the agent as a reply.
         */
        reply?: Schema$GoogleCommunicationsBusinesscommunicationsV1SuggestedReply;
    }
    /**
     * Interactions supported by an agent.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SupportedAgentInteraction {
        /**
         * Bot representative details.
         */
        botRepresentative?: Schema$GoogleCommunicationsBusinesscommunicationsV1BotRepresentative;
        /**
         * Human representative details.
         */
        humanRepresentative?: Schema$GoogleCommunicationsBusinesscommunicationsV1HumanRepresentative;
        /**
         * Required. The type of interaction supported by the agent.
         */
        interactionType?: string | null;
    }
    /**
     * Configuration details for supporting customized survey questions.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1SurveyConfig {
        /**
         * Custom survey questions for an agent, mapped to a locale. Locale is represented by a well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag.
         */
        customSurveys?: {
            [key: string]: Schema$GoogleCommunicationsBusinesscommunicationsV1CustomSurveyConfig;
        } | null;
        /**
         * List of template question IDs for template questions included in a survey.
         */
        templateQuestionIds?: string[] | null;
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
     * Test intent for supported conversational surfaces.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1TestUrl {
        /**
         * The surface for the conversation.
         */
        surface?: string | null;
        /**
         * The test url for launching conversation.
         */
        url?: string | null;
    }
    /**
     * Agent information specific to Verified SMS.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsAgent {
        /**
         * Required. Description about the registered agent. The description is visible to end users. Maximum 100 characters.
         */
        description?: string | null;
        /**
         * Required. The agent logo. Maximum 50 KB.
         */
        logoUrl?: string | null;
        /**
         * The list of Sender IDs for the Verified SMS agent.
         */
        senders?: Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsAgentSender[];
    }
    /**
     * Sender IDs and the countries they operate in.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsAgentSender {
        /**
         * A country the sender ID operates in as an [ISO 3166 Alpha-2 country code](https://www.iso.org/obp/ui/#search/code/). For example, "US" for the United States of America.
         */
        countryCode?: string | null;
        /**
         * A sender ID—a long code (E.164 format), short code, national code, or alphanumeric code—associated with the agent that can send SMS messages.
         */
        senderId?: string | null;
    }
    /**
     * Verified SMS capabilities
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1VerifiedSmsCapability {
        /**
         * Required. The webhook URL where the Verified SMS callbacks are delivered.
         */
        webhookUrl?: string | null;
    }
    /**
     * The greeting shown to users when they enter a conversation with the agent for the first time.
     */
    export interface Schema$GoogleCommunicationsBusinesscommunicationsV1WelcomeMessage {
        /**
         * Image message.
         */
        image?: Schema$GoogleCommunicationsBusinessmessagesV1Image;
        /**
         * Rich card message. Could be either standalone card or carousel.
         */
        richCard?: Schema$GoogleCommunicationsBusinessmessagesV1RichCard;
        /**
         * Rich text message in valid markdown formatting.
         */
        richText?: string | null;
        /**
         * Text message. Maximum length 1000 characters.
         */
        text?: string | null;
    }
    /**
     * Request to authenticate a conversation.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1AuthenticationRequest {
        /**
         * Details for authentication via OAuth.
         */
        oauth?: Schema$GoogleCommunicationsBusinessmessagesV1AuthenticationRequestOauth;
    }
    /**
     * Details for authentication via OAuth.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1AuthenticationRequestOauth {
        /**
         * Required. The [ID](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/) of the application that asks for authorization.
         */
        clientId?: string | null;
        /**
         * Required. The [code challenge](https://tools.ietf.org/html/rfc7636#section-4.2) used to exchange access tokens.
         */
        codeChallenge?: string | null;
        /**
         * Optional. The [code challenge method](https://www.oauth.com/oauth2-servers/pkce/authorization-request/) used to generate the code challenge. If this parameter is omitted, the server assumes `plain`.
         */
        codeChallengeMethod?: string | null;
        /**
         * Required. An array that specifies the [scopes](https://oauth.net/2/scope/) of the request.
         */
        scopes?: string[] | null;
    }
    /**
     * Card content.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1CardContent {
        /**
         * Optional. Description of the card. Maximum 2,000 characters.
         */
        description?: string | null;
        /**
         * Optional. Media to include in the card.
         */
        media?: Schema$GoogleCommunicationsBusinessmessagesV1Media;
        /**
         * Optional. List of suggestions to include in the card. Maximum 4 suggestions.
         */
        suggestions?: Schema$GoogleCommunicationsBusinessmessagesV1Suggestion[];
        /**
         * Optional. Title of the card. Maximum 200 characters.
         */
        title?: string | null;
    }
    /**
     * Carousel of cards.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1CarouselCard {
        /**
         * The list of contents for each card in the carousel. A carousel can have a minimum of 2 cards and a maximum 10 cards.
         */
        cardContents?: Schema$GoogleCommunicationsBusinessmessagesV1CardContent[];
        /**
         * The width of the cards in the carousel.
         */
        cardWidth?: string | null;
    }
    /**
     * Message containing the content information.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1ContentInfo {
        /**
         * Text describing the details about the media for accessibility purposes.
         */
        altText?: string | null;
        /**
         * Publicly reachable URL of the file. The platform determines the MIME type of the file from the content-type field in the HTTP headers when the platform fetches the file. The content-type field must be present and accurate in the HTTP response from the URL. Maximum 5 MB. Supported content types: image/jpeg, image/jpg, image/png, image/webp
         */
        fileUrl?: string | null;
        /**
         * If set, the platform fetches the file and thumbnail from the specified URLs, even if the platform has cached copies of the file (and/or of the thumbnail).
         */
        forceRefresh?: boolean | null;
        /**
         * Optional. Publicly reachable URL of the thumbnail. If you don't provide a thumbnail URL, the platform displays a blank placeholder thumbnail until the user's device downloads the file. Maximum 25 KB. Supported content types: image/jpeg, image/jpg, image/png, image/webp
         */
        thumbnailUrl?: string | null;
    }
    /**
     * Opens the user's default dialer app with the specified phone number filled in.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1DialAction {
        /**
         * Required. The specified phone number, in [RFC 3966](https://tools.ietf.org/html/rfc3966) format. For example, "+1-201-555-0123".
         */
        phoneNumber?: string | null;
    }
    /**
     * An image.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1Image {
        /**
         * Information about an image, including the URL of the image and the URL of the image's thumbnail.
         */
        contentInfo?: Schema$GoogleCommunicationsBusinessmessagesV1ContentInfo;
    }
    /**
     * When tapped, sends a request for a live agent to join the conversation.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1LiveAgentRequest {
    }
    /**
     * A media file within a rich card.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1Media {
        /**
         * Information about a file, including the URL of the file and the URL of the file's thumbnail.
         */
        contentInfo?: Schema$GoogleCommunicationsBusinessmessagesV1ContentInfo;
        /**
         * The height of the media within a rich card.
         */
        height?: string | null;
    }
    /**
     * Opens the specified URL.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1OpenUrlAction {
        /**
         * URL
         */
        url?: string | null;
    }
    /**
     * A standalone rich card or a carousel of rich cards sent from the agent to the user.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1RichCard {
        /**
         * Carousel of cards.
         */
        carouselCard?: Schema$GoogleCommunicationsBusinessmessagesV1CarouselCard;
        /**
         * Standalone card.
         */
        standaloneCard?: Schema$GoogleCommunicationsBusinessmessagesV1StandaloneCard;
    }
    /**
     * Standalone card.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1StandaloneCard {
        /**
         * Card content.
         */
        cardContent?: Schema$GoogleCommunicationsBusinessmessagesV1CardContent;
    }
    /**
     * When tapped, initiates the corresponding native action on the device.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1SuggestedAction {
        /**
         * Opens the user's default dialer app.
         */
        dialAction?: Schema$GoogleCommunicationsBusinessmessagesV1DialAction;
        /**
         * Opens the specified URL.
         */
        openUrlAction?: Schema$GoogleCommunicationsBusinessmessagesV1OpenUrlAction;
        /**
         * The string that the agent receives when a user taps the suggested action. Maximum 2,048 characters.
         */
        postbackData?: string | null;
        /**
         * Text that is shown in the suggested action. Maximum 25 characters.
         */
        text?: string | null;
    }
    /**
     * When tapped, sends the text reply back to the agent.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1SuggestedReply {
        /**
         * The string that the agent receives when a user taps the suggested reply. Maximum 2,048 characters.
         */
        postbackData?: string | null;
        /**
         * Text that is shown in the suggested reply and sent to the agent when the user taps it. Maximum 25 characters.
         */
        text?: string | null;
    }
    /**
     * A suggestion within a chip list.
     */
    export interface Schema$GoogleCommunicationsBusinessmessagesV1Suggestion {
        /**
         * A suggested action that initiates a native action on the device.
         */
        action?: Schema$GoogleCommunicationsBusinessmessagesV1SuggestedAction;
        /**
         * A request to start authentication flow.
         */
        authenticationRequest?: Schema$GoogleCommunicationsBusinessmessagesV1AuthenticationRequest;
        /**
         * A request to have a live agent join the conversation.
         */
        liveAgentRequest?: Schema$GoogleCommunicationsBusinessmessagesV1LiveAgentRequest;
        /**
         * A suggestion for the user to reply with specified text.
         */
        reply?: Schema$GoogleCommunicationsBusinessmessagesV1SuggestedReply;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); \}
     */
    export interface Schema$GoogleProtobufEmpty {
    }
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
        details?: Array<{
            [key: string]: any;
        }> | null;
        /**
         * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
         */
        message?: string | null;
    }
    /**
     * Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
     */
    export interface Schema$GoogleTypeTimeOfDay {
        /**
         * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.
         */
        hours?: number | null;
        /**
         * Minutes of hour of day. Must be from 0 to 59.
         */
        minutes?: number | null;
        /**
         * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
         */
        nanos?: number | null;
        /**
         * Seconds of minutes of the time. Must normally be from 0 to 59. An API may allow the value 60 if it allows leap-seconds.
         */
        seconds?: number | null;
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
    export class Resource$Brands {
        context: APIRequestContext;
        agents: Resource$Brands$Agents;
        locations: Resource$Brands$Locations;
        constructor(context: APIRequestContext);
        /**
         * Creates a new brand.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        create(params: Params$Resource$Brands$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Brands$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>;
        create(params: Params$Resource$Brands$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Brands$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        create(params: Params$Resource$Brands$Create, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        create(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        /**
         * Deletes a brand. If the brand has any associated agents or locations, the delete request fails unless `force` is `true`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *     // If true, any agents and locations associated with this brand are also deleted.
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
        delete(params: Params$Resource$Brands$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Brands$Delete, options?: MethodOptions): GaxiosPromise<Schema$GoogleProtobufEmpty>;
        delete(params: Params$Resource$Brands$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Brands$Delete, options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(params: Params$Resource$Brands$Delete, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        /**
         * Gets information about a brand.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        get(params: Params$Resource$Brands$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Brands$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>;
        get(params: Params$Resource$Brands$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Brands$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        get(params: Params$Resource$Brands$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        /**
         * Lists all the brands accessible to the user making the request. *Note*: This method always sets `pageSize` to `0`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        list(params: Params$Resource$Brands$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Brands$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>;
        list(params: Params$Resource$Brands$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Brands$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>): void;
        list(params: Params$Resource$Brands$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListBrandsResponse>): void;
        /**
         * Updates information about a brand. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        patch(params: Params$Resource$Brands$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Brands$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>;
        patch(params: Params$Resource$Brands$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Brands$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        patch(params: Params$Resource$Brands$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Brand>): void;
    }
    export interface Params$Resource$Brands$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Brand;
    }
    export interface Params$Resource$Brands$Delete extends StandardParameters {
        /**
         * If true, any agents and locations associated with this brand are also deleted.
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
        greetings: Resource$Brands$Agents$Greetings;
        integrations: Resource$Brands$Agents$Integrations;
        constructor(context: APIRequestContext);
        /**
         * Creates a new agent to represent a brand.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "businessMessagesAgent": {},
         *       //   "name": "my_name",
         *       //   "displayName": "my_displayName",
         *       //   "verifiedSmsAgent": {},
         *       //   "rcsBusinessMessagingAgent": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "businessMessagesAgent": {},
         *   //   "name": "my_name",
         *   //   "displayName": "my_displayName",
         *   //   "verifiedSmsAgent": {},
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
        create(params: Params$Resource$Brands$Agents$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Brands$Agents$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>;
        create(params: Params$Resource$Brands$Agents$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Brands$Agents$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        create(params: Params$Resource$Brands$Agents$Create, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        create(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        /**
         * Deletes an agent. The delete request fails if any `brands.agents.requestVerification` requests have been made for the agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        delete(params: Params$Resource$Brands$Agents$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Brands$Agents$Delete, options?: MethodOptions): GaxiosPromise<Schema$GoogleProtobufEmpty>;
        delete(params: Params$Resource$Brands$Agents$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Brands$Agents$Delete, options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(params: Params$Resource$Brands$Agents$Delete, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        /**
         * Get information about an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "businessMessagesAgent": {},
         *   //   "name": "my_name",
         *   //   "displayName": "my_displayName",
         *   //   "verifiedSmsAgent": {},
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
        get(params: Params$Resource$Brands$Agents$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Brands$Agents$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>;
        get(params: Params$Resource$Brands$Agents$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Brands$Agents$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        get(params: Params$Resource$Brands$Agents$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        /**
         * Gets the launch information for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "rcsBusinessMessaging": {},
         *   //   "businessMessages": {}
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
        getLaunch(params: Params$Resource$Brands$Agents$Getlaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getLaunch(params?: Params$Resource$Brands$Agents$Getlaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>;
        getLaunch(params: Params$Resource$Brands$Agents$Getlaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getLaunch(params: Params$Resource$Brands$Agents$Getlaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        getLaunch(params: Params$Resource$Brands$Agents$Getlaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        getLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        /**
         * Gets the verification information for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "agentVerificationContact": {},
         *   //   "verificationState": "my_verificationState"
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
        getVerification(params: Params$Resource$Brands$Agents$Getverification, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getVerification(params?: Params$Resource$Brands$Agents$Getverification, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>;
        getVerification(params: Params$Resource$Brands$Agents$Getverification, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getVerification(params: Params$Resource$Brands$Agents$Getverification, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        getVerification(params: Params$Resource$Brands$Agents$Getverification, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        getVerification(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        /**
         * Lists all the agents associated with a brand. *Note*: This method always sets `pageSize` to `0`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        list(params: Params$Resource$Brands$Agents$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Brands$Agents$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>;
        list(params: Params$Resource$Brands$Agents$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Brands$Agents$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>): void;
        list(params: Params$Resource$Brands$Agents$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListAgentsResponse>): void;
        /**
         * Updates information about an agent. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "businessMessagesAgent": {},
         *       //   "name": "my_name",
         *       //   "displayName": "my_displayName",
         *       //   "verifiedSmsAgent": {},
         *       //   "rcsBusinessMessagingAgent": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "businessMessagesAgent": {},
         *   //   "name": "my_name",
         *   //   "displayName": "my_displayName",
         *   //   "verifiedSmsAgent": {},
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
        patch(params: Params$Resource$Brands$Agents$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Brands$Agents$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>;
        patch(params: Params$Resource$Brands$Agents$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Brands$Agents$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        patch(params: Params$Resource$Brands$Agents$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Agent>): void;
        /**
         * Begins the launch process for an agent. An agent is available to users after it launches. An agent can only have one instance of launch at a time.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "rcsBusinessMessaging": {},
         *   //   "businessMessages": {}
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
        requestLaunch(params: Params$Resource$Brands$Agents$Requestlaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        requestLaunch(params?: Params$Resource$Brands$Agents$Requestlaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>;
        requestLaunch(params: Params$Resource$Brands$Agents$Requestlaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        requestLaunch(params: Params$Resource$Brands$Agents$Requestlaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        requestLaunch(params: Params$Resource$Brands$Agents$Requestlaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        requestLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        /**
         * Begins business information verification for an agent. Google contacts the brand for verification. Only 1 instance of verification is allowed at any given time.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "agentVerificationContact": {},
         *   //   "verificationState": "my_verificationState"
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
        requestVerification(params: Params$Resource$Brands$Agents$Requestverification, options: StreamMethodOptions): GaxiosPromise<Readable>;
        requestVerification(params?: Params$Resource$Brands$Agents$Requestverification, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>;
        requestVerification(params: Params$Resource$Brands$Agents$Requestverification, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        requestVerification(params: Params$Resource$Brands$Agents$Requestverification, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        requestVerification(params: Params$Resource$Brands$Agents$Requestverification, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        requestVerification(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        /**
         * Updates the launch information for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "rcsBusinessMessaging": {},
         *       //   "businessMessages": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "rcsBusinessMessaging": {},
         *   //   "businessMessages": {}
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
        updateLaunch(params: Params$Resource$Brands$Agents$Updatelaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateLaunch(params?: Params$Resource$Brands$Agents$Updatelaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>;
        updateLaunch(params: Params$Resource$Brands$Agents$Updatelaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateLaunch(params: Params$Resource$Brands$Agents$Updatelaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        updateLaunch(params: Params$Resource$Brands$Agents$Updatelaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        updateLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentLaunch>): void;
        /**
         * Updates the verification state for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "agentVerificationContact": {},
         *       //   "verificationState": "my_verificationState"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "agentVerificationContact": {},
         *   //   "verificationState": "my_verificationState"
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
        updateVerification(params: Params$Resource$Brands$Agents$Updateverification, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateVerification(params?: Params$Resource$Brands$Agents$Updateverification, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>;
        updateVerification(params: Params$Resource$Brands$Agents$Updateverification, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateVerification(params: Params$Resource$Brands$Agents$Updateverification, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        updateVerification(params: Params$Resource$Brands$Agents$Updateverification, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
        updateVerification(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1AgentVerification>): void;
    }
    export interface Params$Resource$Brands$Agents$Create extends StandardParameters {
        /**
         * Required. The unique identifier of the brand the agent represents. If the brand identifier is "1234", this parameter is "brands/1234".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Agent;
    }
    export interface Params$Resource$Brands$Agents$Delete extends StandardParameters {
        /**
         * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Get extends StandardParameters {
        /**
         * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5668".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Getlaunch extends StandardParameters {
        /**
         * Required. The unique identifier of the agent launch.
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Getverification extends StandardParameters {
        /**
         * Required. The unique identifier of the brand and agent verification.
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$List extends StandardParameters {
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
    export interface Params$Resource$Brands$Agents$Patch extends StandardParameters {
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
    export interface Params$Resource$Brands$Agents$Requestlaunch extends StandardParameters {
        /**
         * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentLaunchRequest;
    }
    export interface Params$Resource$Brands$Agents$Requestverification extends StandardParameters {
        /**
         * Required. The unique identifier of the brand and agent.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestAgentVerificationRequest;
    }
    export interface Params$Resource$Brands$Agents$Updatelaunch extends StandardParameters {
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
    export interface Params$Resource$Brands$Agents$Updateverification extends StandardParameters {
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
    export class Resource$Brands$Agents$Greetings {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * Creates a new greeting for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.agents.greetings.create({
         *     // Required. The unique identifier of the agent associated with the greeting. If the brand ID is "1234" and the agent ID is "5678", this parameter resolves to "brands/1234/agents/5678".
         *     parent: 'brands/my-brand/agents/my-agent',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "conversationStarters": [],
         *       //   "adLink": "my_adLink",
         *       //   "welcomeMessages": [],
         *       //   "locale": "my_locale",
         *       //   "name": "my_name",
         *       //   "customId": "my_customId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversationStarters": [],
         *   //   "adLink": "my_adLink",
         *   //   "welcomeMessages": [],
         *   //   "locale": "my_locale",
         *   //   "name": "my_name",
         *   //   "customId": "my_customId"
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
        create(params: Params$Resource$Brands$Agents$Greetings$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Brands$Agents$Greetings$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>;
        create(params: Params$Resource$Brands$Agents$Greetings$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Brands$Agents$Greetings$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        create(params: Params$Resource$Brands$Agents$Greetings$Create, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        create(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        /**
         * Gets the greeting information for an agent.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.agents.greetings.get({
         *     // Required. The unique identifier of the greeting. If the brand ID is "1234", agent ID is "5678", and greeting ID is "abcd", this parameter resolves to "brands/1234/agents/5678/greetings/abcd".
         *     name: 'brands/my-brand/agents/my-agent/greetings/my-greeting',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversationStarters": [],
         *   //   "adLink": "my_adLink",
         *   //   "welcomeMessages": [],
         *   //   "locale": "my_locale",
         *   //   "name": "my_name",
         *   //   "customId": "my_customId"
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
        get(params: Params$Resource$Brands$Agents$Greetings$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Brands$Agents$Greetings$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>;
        get(params: Params$Resource$Brands$Agents$Greetings$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Brands$Agents$Greetings$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        get(params: Params$Resource$Brands$Agents$Greetings$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        /**
         * Lists all greetings associated with an agent. *Note*: This method always sets `pageSize` to `0`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.agents.greetings.list({
         *     // Specify the maximum number of results for the server to return. The server may limit the number of results returned per page. If the page_size is 0, the server will decide how many results to return.
         *     pageSize: 'placeholder-value',
         *     // The next_page_token value returned from a previous List request, if any.
         *     pageToken: 'placeholder-value',
         *     // Required. The unique identifier of the agent. If the brand ID is "1234" and agent ID is "5678", this parameter resolves to "brands/1234/agents/5678".
         *     parent: 'brands/my-brand/agents/my-agent',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "greetings": [],
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
        list(params: Params$Resource$Brands$Agents$Greetings$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Brands$Agents$Greetings$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse>;
        list(params: Params$Resource$Brands$Agents$Greetings$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Brands$Agents$Greetings$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse>): void;
        list(params: Params$Resource$Brands$Agents$Greetings$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListGreetingsResponse>): void;
        /**
         * Updates the information about a greeting. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.agents.greetings.patch({
         *     // Output only. The name of the greeting, as set by Business Messages. Resolves to "brands/{brand_id\}/agents/{agent_id\}/greetings/{greeting_id\}" where {greeting_id\} is the unique ID of the greeting.
         *     name: 'brands/my-brand/agents/my-agent/greetings/my-greeting',
         *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "conversationStarters": [],
         *       //   "adLink": "my_adLink",
         *       //   "welcomeMessages": [],
         *       //   "locale": "my_locale",
         *       //   "name": "my_name",
         *       //   "customId": "my_customId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversationStarters": [],
         *   //   "adLink": "my_adLink",
         *   //   "welcomeMessages": [],
         *   //   "locale": "my_locale",
         *   //   "name": "my_name",
         *   //   "customId": "my_customId"
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
        patch(params: Params$Resource$Brands$Agents$Greetings$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Brands$Agents$Greetings$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>;
        patch(params: Params$Resource$Brands$Agents$Greetings$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Brands$Agents$Greetings$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        patch(params: Params$Resource$Brands$Agents$Greetings$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting>): void;
    }
    export interface Params$Resource$Brands$Agents$Greetings$Create extends StandardParameters {
        /**
         * Required. The unique identifier of the agent associated with the greeting. If the brand ID is "1234" and the agent ID is "5678", this parameter resolves to "brands/1234/agents/5678".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting;
    }
    export interface Params$Resource$Brands$Agents$Greetings$Get extends StandardParameters {
        /**
         * Required. The unique identifier of the greeting. If the brand ID is "1234", agent ID is "5678", and greeting ID is "abcd", this parameter resolves to "brands/1234/agents/5678/greetings/abcd".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Greetings$List extends StandardParameters {
        /**
         * Specify the maximum number of results for the server to return. The server may limit the number of results returned per page. If the page_size is 0, the server will decide how many results to return.
         */
        pageSize?: number;
        /**
         * The next_page_token value returned from a previous List request, if any.
         */
        pageToken?: string;
        /**
         * Required. The unique identifier of the agent. If the brand ID is "1234" and agent ID is "5678", this parameter resolves to "brands/1234/agents/5678".
         */
        parent?: string;
    }
    export interface Params$Resource$Brands$Agents$Greetings$Patch extends StandardParameters {
        /**
         * Output only. The name of the greeting, as set by Business Messages. Resolves to "brands/{brand_id\}/agents/{agent_id\}/greetings/{greeting_id\}" where {greeting_id\} is the unique ID of the greeting.
         */
        name?: string;
        /**
         * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Greeting;
    }
    export class Resource$Brands$Agents$Integrations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * Create an integration.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "dialogflowEsIntegration": {},
         *       //   "dialogflowCxIntegration": {},
         *       //   "status": "my_status",
         *       //   "agentWebhookIntegration": {},
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dialogflowEsIntegration": {},
         *   //   "dialogflowCxIntegration": {},
         *   //   "status": "my_status",
         *   //   "agentWebhookIntegration": {},
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
        create(params: Params$Resource$Brands$Agents$Integrations$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Brands$Agents$Integrations$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>;
        create(params: Params$Resource$Brands$Agents$Integrations$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Brands$Agents$Integrations$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        create(params: Params$Resource$Brands$Agents$Integrations$Create, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        create(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        /**
         * Delete an integration.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        delete(params: Params$Resource$Brands$Agents$Integrations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Brands$Agents$Integrations$Delete, options?: MethodOptions): GaxiosPromise<Schema$GoogleProtobufEmpty>;
        delete(params: Params$Resource$Brands$Agents$Integrations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Brands$Agents$Integrations$Delete, options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(params: Params$Resource$Brands$Agents$Integrations$Delete, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        /**
         * Get an integration.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "dialogflowEsIntegration": {},
         *   //   "dialogflowCxIntegration": {},
         *   //   "status": "my_status",
         *   //   "agentWebhookIntegration": {},
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
        get(params: Params$Resource$Brands$Agents$Integrations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Brands$Agents$Integrations$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>;
        get(params: Params$Resource$Brands$Agents$Integrations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Brands$Agents$Integrations$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        get(params: Params$Resource$Brands$Agents$Integrations$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        /**
         * List integrations.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "integrations": []
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
        list(params: Params$Resource$Brands$Agents$Integrations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Brands$Agents$Integrations$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>;
        list(params: Params$Resource$Brands$Agents$Integrations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Brands$Agents$Integrations$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>): void;
        list(params: Params$Resource$Brands$Agents$Integrations$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListIntegrationsResponse>): void;
        /**
         * Update an integration. For adding a DialogflowDocument, only the "dialogflow_es_integration.dialogflow_knowledge_bases" flag should be specified. Adding a document should be an isolated update.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "dialogflowEsIntegration": {},
         *       //   "dialogflowCxIntegration": {},
         *       //   "status": "my_status",
         *       //   "agentWebhookIntegration": {},
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dialogflowEsIntegration": {},
         *   //   "dialogflowCxIntegration": {},
         *   //   "status": "my_status",
         *   //   "agentWebhookIntegration": {},
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
        patch(params: Params$Resource$Brands$Agents$Integrations$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Brands$Agents$Integrations$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>;
        patch(params: Params$Resource$Brands$Agents$Integrations$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Brands$Agents$Integrations$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        patch(params: Params$Resource$Brands$Agents$Integrations$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Integration>): void;
    }
    export interface Params$Resource$Brands$Agents$Integrations$Create extends StandardParameters {
        /**
         * Required. The unique identifier of the agent. If the brand identifier is "1234" and the agent identifier is "5678", this parameter resolves to "brands/1234/agents/5678".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Integration;
    }
    export interface Params$Resource$Brands$Agents$Integrations$Delete extends StandardParameters {
        /**
         * Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Integrations$Get extends StandardParameters {
        /**
         * Required. The unique identifier of the integration. If the brand identifier is "1234", the agent identifier is "5678", and the integration identifier is "9092", this parameter resolves to "brands/1234/agents/5678/integrations/9092".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Agents$Integrations$List extends StandardParameters {
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
    export interface Params$Resource$Brands$Agents$Integrations$Patch extends StandardParameters {
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
    export class Resource$Brands$Locations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * Creates a new location for a brand.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.create({
         *     // Required. The unique identifier of the brand associated with the location. If the brand identifier is "1234", this parameter resolves to "brands/1234".
         *     parent: 'brands/my-brand',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "listingId": "my_listingId",
         *       //   "defaultLocale": "my_defaultLocale",
         *       //   "testUrls": [],
         *       //   "locationTestUrl": "my_locationTestUrl",
         *       //   "conversationalSettings": {},
         *       //   "locationEntryPointConfigs": [],
         *       //   "name": "my_name",
         *       //   "agent": "my_agent",
         *       //   "placeId": "my_placeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "listingId": "my_listingId",
         *   //   "defaultLocale": "my_defaultLocale",
         *   //   "testUrls": [],
         *   //   "locationTestUrl": "my_locationTestUrl",
         *   //   "conversationalSettings": {},
         *   //   "locationEntryPointConfigs": [],
         *   //   "name": "my_name",
         *   //   "agent": "my_agent",
         *   //   "placeId": "my_placeId"
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
        create(params: Params$Resource$Brands$Locations$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Brands$Locations$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>;
        create(params: Params$Resource$Brands$Locations$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Brands$Locations$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        create(params: Params$Resource$Brands$Locations$Create, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        create(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        /**
         * Deletes a location. The delete request fails if any `brands.locations.requestVerification` requests have been made for the location.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.delete({
         *     // Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         *     name: 'brands/my-brand/locations/my-location',
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
        delete(params: Params$Resource$Brands$Locations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Brands$Locations$Delete, options?: MethodOptions): GaxiosPromise<Schema$GoogleProtobufEmpty>;
        delete(params: Params$Resource$Brands$Locations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Brands$Locations$Delete, options: MethodOptions | BodyResponseCallback<Schema$GoogleProtobufEmpty>, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(params: Params$Resource$Brands$Locations$Delete, callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        delete(callback: BodyResponseCallback<Schema$GoogleProtobufEmpty>): void;
        /**
         * Get information about a location.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.get({
         *     // Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         *     name: 'brands/my-brand/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "listingId": "my_listingId",
         *   //   "defaultLocale": "my_defaultLocale",
         *   //   "testUrls": [],
         *   //   "locationTestUrl": "my_locationTestUrl",
         *   //   "conversationalSettings": {},
         *   //   "locationEntryPointConfigs": [],
         *   //   "name": "my_name",
         *   //   "agent": "my_agent",
         *   //   "placeId": "my_placeId"
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
        get(params: Params$Resource$Brands$Locations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Brands$Locations$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>;
        get(params: Params$Resource$Brands$Locations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Brands$Locations$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        get(params: Params$Resource$Brands$Locations$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        /**
         * Gets the launch information for a location.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.getLaunch({
         *     // Required. The unique identifier of the location launch.
         *     name: 'brands/my-brand/locations/my-location/launch',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "launchState": "my_launchState"
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
        getLaunch(params: Params$Resource$Brands$Locations$Getlaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getLaunch(params?: Params$Resource$Brands$Locations$Getlaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>;
        getLaunch(params: Params$Resource$Brands$Locations$Getlaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getLaunch(params: Params$Resource$Brands$Locations$Getlaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        getLaunch(params: Params$Resource$Brands$Locations$Getlaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        getLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        /**
         * Gets the verification information for a location.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.getVerification({
         *     // Required. The unique identifier of the location verification.
         *     name: 'brands/my-brand/locations/my-location/verification',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "verificationState": "my_verificationState",
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
        getVerification(params: Params$Resource$Brands$Locations$Getverification, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getVerification(params?: Params$Resource$Brands$Locations$Getverification, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>;
        getVerification(params: Params$Resource$Brands$Locations$Getverification, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getVerification(params: Params$Resource$Brands$Locations$Getverification, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        getVerification(params: Params$Resource$Brands$Locations$Getverification, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        getVerification(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        /**
         * Lists all the locations for a brand. *Note*: This method always sets `pageSize` to `0`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.list({
         *     // The maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
         *     pageSize: 'placeholder-value',
         *     // The next_page_token value returned from a previous List request, if any.
         *     pageToken: 'placeholder-value',
         *     // Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
         *     parent: 'brands/my-brand',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "locations": []
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
        list(params: Params$Resource$Brands$Locations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Brands$Locations$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse>;
        list(params: Params$Resource$Brands$Locations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Brands$Locations$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse>): void;
        list(params: Params$Resource$Brands$Locations$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListLocationsResponse>): void;
        /**
         * Updates information about a location. *Caution*: If you update a field that takes a list as input, you must include the entire list in the update request. Updates to list fields replace the entire list.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.patch({
         *     // The unique identifier of the location. Read-only. Defined by the platform.
         *     name: 'brands/my-brand/locations/my-location',
         *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "listingId": "my_listingId",
         *       //   "defaultLocale": "my_defaultLocale",
         *       //   "testUrls": [],
         *       //   "locationTestUrl": "my_locationTestUrl",
         *       //   "conversationalSettings": {},
         *       //   "locationEntryPointConfigs": [],
         *       //   "name": "my_name",
         *       //   "agent": "my_agent",
         *       //   "placeId": "my_placeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "listingId": "my_listingId",
         *   //   "defaultLocale": "my_defaultLocale",
         *   //   "testUrls": [],
         *   //   "locationTestUrl": "my_locationTestUrl",
         *   //   "conversationalSettings": {},
         *   //   "locationEntryPointConfigs": [],
         *   //   "name": "my_name",
         *   //   "agent": "my_agent",
         *   //   "placeId": "my_placeId"
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
        patch(params: Params$Resource$Brands$Locations$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Brands$Locations$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>;
        patch(params: Params$Resource$Brands$Locations$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Brands$Locations$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        patch(params: Params$Resource$Brands$Locations$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Location>): void;
        /**
         * Begins the launch process for a location. A location is available to users after it launches. A location can only have one instance of launch at a time. If the location hasn't been launched previously, sets the launch status to `PENDING`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.requestLaunch({
         *     // Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         *     name: 'brands/my-brand/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "launchState": "my_launchState"
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
        requestLaunch(params: Params$Resource$Brands$Locations$Requestlaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        requestLaunch(params?: Params$Resource$Brands$Locations$Requestlaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>;
        requestLaunch(params: Params$Resource$Brands$Locations$Requestlaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        requestLaunch(params: Params$Resource$Brands$Locations$Requestlaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        requestLaunch(params: Params$Resource$Brands$Locations$Requestlaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        requestLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        /**
         * Begins verification for a location. A location is available for use after it's verified. A location can only have one instance of verification at a time. If the location status hasn't been verified previously, sets the status to `PENDING`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.requestVerification(
         *     {
         *       // Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         *       name: 'brands/my-brand/locations/my-location',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {}
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "verificationState": "my_verificationState",
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
        requestVerification(params: Params$Resource$Brands$Locations$Requestverification, options: StreamMethodOptions): GaxiosPromise<Readable>;
        requestVerification(params?: Params$Resource$Brands$Locations$Requestverification, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>;
        requestVerification(params: Params$Resource$Brands$Locations$Requestverification, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        requestVerification(params: Params$Resource$Brands$Locations$Requestverification, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        requestVerification(params: Params$Resource$Brands$Locations$Requestverification, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        requestVerification(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationVerification>): void;
        /**
         * Updates the launch information for a location.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   const res = await businesscommunications.brands.locations.updateLaunch({
         *     // Required. The identifier for launch.
         *     name: 'brands/my-brand/locations/my-location/launch',
         *     // The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "launchState": "my_launchState"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "launchState": "my_launchState"
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
        updateLaunch(params: Params$Resource$Brands$Locations$Updatelaunch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateLaunch(params?: Params$Resource$Brands$Locations$Updatelaunch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>;
        updateLaunch(params: Params$Resource$Brands$Locations$Updatelaunch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateLaunch(params: Params$Resource$Brands$Locations$Updatelaunch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        updateLaunch(params: Params$Resource$Brands$Locations$Updatelaunch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
        updateLaunch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch>): void;
    }
    export interface Params$Resource$Brands$Locations$Create extends StandardParameters {
        /**
         * Required. The unique identifier of the brand associated with the location. If the brand identifier is "1234", this parameter resolves to "brands/1234".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Location;
    }
    export interface Params$Resource$Brands$Locations$Delete extends StandardParameters {
        /**
         * Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Locations$Get extends StandardParameters {
        /**
         * Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Locations$Getlaunch extends StandardParameters {
        /**
         * Required. The unique identifier of the location launch.
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Locations$Getverification extends StandardParameters {
        /**
         * Required. The unique identifier of the location verification.
         */
        name?: string;
    }
    export interface Params$Resource$Brands$Locations$List extends StandardParameters {
        /**
         * The maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. If the page_size is 0, the server will decide the number of results to be returned.
         */
        pageSize?: number;
        /**
         * The next_page_token value returned from a previous List request, if any.
         */
        pageToken?: string;
        /**
         * Required. The unique identifier of the brand. If the brand identifier is "1234", this parameter resolves to "brands/1234".
         */
        parent?: string;
    }
    export interface Params$Resource$Brands$Locations$Patch extends StandardParameters {
        /**
         * The unique identifier of the location. Read-only. Defined by the platform.
         */
        name?: string;
        /**
         * The update mask applies to the resource. For the FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1Location;
    }
    export interface Params$Resource$Brands$Locations$Requestlaunch extends StandardParameters {
        /**
         * Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestLocationLaunchRequest;
    }
    export interface Params$Resource$Brands$Locations$Requestverification extends StandardParameters {
        /**
         * Required. The unique identifier of the location. If the brand identifier is "1234" and the location identifier is "5678", this parameter resolves to "brands/1234/locations/5678".
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1RequestLocationVerificationRequest;
    }
    export interface Params$Resource$Brands$Locations$Updatelaunch extends StandardParameters {
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
        requestBody?: Schema$GoogleCommunicationsBusinesscommunicationsV1LocationLaunch;
    }
    export class Resource$Partners {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * Get the information about the partner.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *   //   "displayName": "my_displayName",
         *   //   "productCapabilities": [],
         *   //   "name": "my_name",
         *   //   "company": "my_company",
         *   //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail",
         *   //   "contactEmails": []
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
        get(params: Params$Resource$Partners$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Partners$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>;
        get(params: Params$Resource$Partners$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Partners$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
        get(params: Params$Resource$Partners$Get, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
        /**
         * Updates the information for a partner.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
         *       //   "displayName": "my_displayName",
         *       //   "productCapabilities": [],
         *       //   "name": "my_name",
         *       //   "company": "my_company",
         *       //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail",
         *       //   "contactEmails": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "productCapabilities": [],
         *   //   "name": "my_name",
         *   //   "company": "my_company",
         *   //   "dialogflowServiceAccountEmail": "my_dialogflowServiceAccountEmail",
         *   //   "contactEmails": []
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
        patch(params: Params$Resource$Partners$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Partners$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>;
        patch(params: Params$Resource$Partners$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Partners$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
        patch(params: Params$Resource$Partners$Patch, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1Partner>): void;
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
        constructor(context: APIRequestContext);
        /**
         * Lists all RCS Business Messaging regions.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        list(params: Params$Resource$Regions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Regions$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>;
        list(params: Params$Resource$Regions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Regions$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>): void;
        list(params: Params$Resource$Regions$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListRegionsResponse>): void;
    }
    export interface Params$Resource$Regions$List extends StandardParameters {
    }
    export class Resource$Surveyquestions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * Lists all Google predefined survey questions. *Note*: This method always sets `pageSize` to `0`.
         * @example
         * ```js
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/businesscommunications.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
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
        list(params: Params$Resource$Surveyquestions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Surveyquestions$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>;
        list(params: Params$Resource$Surveyquestions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Surveyquestions$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>): void;
        list(params: Params$Resource$Surveyquestions$List, callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCommunicationsBusinesscommunicationsV1ListSurveyQuestionsResponse>): void;
    }
    export interface Params$Resource$Surveyquestions$List extends StandardParameters {
        /**
         * Optional. List Google template questions by locale. Locale is represented by a well-formed IETF BCP 47 language tag. Default is EN.
         */
        locale?: string;
    }
    export {};
}
