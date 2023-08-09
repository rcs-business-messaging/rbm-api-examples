/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace rcsbusinessmessaging_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
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
     * RCS Business Messaging API
     *
     *
     *
     * @example
     * const {google} = require('googleapis');
     * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
     *
     * @namespace rcsbusinessmessaging
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Rcsbusinessmessaging
     */
    export class Rcsbusinessmessaging {
        context: APIRequestContext;
        files: Resource$Files;
        phones: Resource$Phones;
        users: Resource$Users;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * The content of a message sent from the agent to a user.
     */
    export interface Schema$AgentContentMessage {
        /**
         * Information about a file, including the URL of the file and the URL of the file’s thumbnail. The RBM platform serves content from a cache, but an agent can force the RBM platform to fetch a new version of the content and refresh the cache.
         */
        contentInfo?: Schema$ContentInfo;
        /**
         * The unique name of a file. The RBM platform returns a file name when an agent uploads a file.
         */
        fileName?: string | null;
        /**
         * A standalone rich card.
         */
        richCard?: Schema$RichCard;
        /**
         * A list of suggested replies and suggested actions that appear as a list of suggestion chips following the associated agent message. Maximum 11 suggestions. The chips only display when the associated agent message is the most recent message within the conversation (including both agent and user messages). The user can tap a suggested reply to send the text reply back to the agent or tap a suggested action to initiate a native action on the device.
         */
        suggestions?: Schema$Suggestion[];
        /**
         * Text encoded in UTF-8.
         */
        text?: string | null;
    }
    /**
     * An event from the agent to the user.
     */
    export interface Schema$AgentEvent {
        /**
         * The type of the agent event.
         */
        eventType?: string | null;
        /**
         * The ID of the user message that the agent event pertains to. This field is only applicable for agent events of type READ.
         */
        messageId?: string | null;
        /**
         * This field is set by the RBM platform. Do not include it when creating an agent event. The field resolves &quot;phones/{E.164}/agentEvents/{eventId}&quot;, where {E.164} is the user&#39;s phone number in E.164 format and {eventId} is the agent-assigned ID of the agent event.
         */
        name?: string | null;
        /**
         * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves the time when the event is sent to the user.
         */
        sendTime?: string | null;
    }
    /**
     * A message sent from the agent to a user.
     */
    export interface Schema$AgentMessage {
        /**
         * The content of the agent message.
         */
        contentMessage?: Schema$AgentContentMessage;
        /**
         * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves &quot;phones/{E.164}/agentMessages/{messageId}&quot;, where {E.164} is the user&#39;s phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message.
         */
        name?: string | null;
        /**
         * This field is set by the RBM platform. Do not include it when creating an agent message. The field resolves the time when the message is sent to the user.
         */
        sendTime?: string | null;
    }
    /**
     * Request message for RBMService.BatchGetUsers method.
     */
    export interface Schema$BatchGetUsersRequest {
        /**
         * List of users&#39; phone numbers in E.164 format.
         */
        users?: string[] | null;
    }
    /**
     * Response message for RBMService.BatchGetUsers method.
     */
    export interface Schema$BatchGetUsersResponse {
        /**
         * Amount of users&#39; phone numbers from the randomly selected list that are RCS-enabled regardless of the launch status for the agent. The ratio between this value and the total_random_sample_user_count can be used to approximate the potential reach for a list of users.
         */
        reachableRandomSampleUserCount?: number | null;
        /**
         * List of users&#39; phone numbers that can be reached from the RBM platform. Only users on carriers that the agent is launched on will be returned.
         */
        reachableUsers?: string[] | null;
        /**
         * Amount of users&#39; phone number randomly selected from the request. Typically this value will be ~75% of the total requested users in the initial BatchGetUsers request. This value will be 0 if the amount of requested users is less than 500.
         */
        totalRandomSampleUserCount?: number | null;
    }
    /**
     * List of supported features by the user
     */
    export interface Schema$Capabilities {
        /**
         * List of RBM features that this device supports.
         */
        features?: string[] | null;
    }
    /**
     * Card content
     */
    export interface Schema$CardContent {
        /**
         * (Optional) Description of the card. Maximum 2000 characters.
         */
        description?: string | null;
        /**
         * (Optional) Media (image, GIF, video) to include in the card.
         */
        media?: Schema$Media;
        /**
         * (Optional) List of suggestions to include in the card. Maximum 4 suggestions.
         */
        suggestions?: Schema$Suggestion[];
        /**
         * (Optional) Title of the card. Maximum 200 characters.
         */
        title?: string | null;
    }
    /**
     * Carousel of cards.
     */
    export interface Schema$CarouselCard {
        /**
         * The list of contents for each card in the carousel. A carousel can have a minimum of 2 cards and a maximum 10 cards.
         */
        cardContents?: Schema$CardContent[];
        /**
         * The width of the cards in the carousel.
         */
        cardWidth?: string | null;
    }
    /**
     * Message containing the content information.
     */
    export interface Schema$ContentInfo {
        /**
         * Publicly reachable URL of the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when the platform fetches the file. The content-type field must be present and accurate in the HTTP response from the URL.
         */
        fileUrl?: string | null;
        /**
         * If set, the RBM platform fetches the file and thumbnail from the specified URLs, even if the platform has cached copies of the file (and/or of the thumbnail).
         */
        forceRefresh?: boolean | null;
        /**
         * (Optional, for image and video files only) Publicly reachable URL of the thumbnail. If you don&#39;t provide a thumbnail URL, the RBM platform displays a blank placeholder thumbnail until the user&#39;s device downloads the file. Depending on the user&#39;s setting, the file may not download automatically and may require the user to tap a download button.
         */
        thumbnailUrl?: string | null;
    }
    /**
     * Opens the user&#39;s default calendar app and starts the new calendar event flow with the agent-specified event data pre-filled.
     */
    export interface Schema$CreateCalendarEventAction {
        /**
         * Event description.
         */
        description?: string | null;
        /**
         * Event end time.
         */
        endTime?: string | null;
        /**
         * Event start time.
         */
        startTime?: string | null;
        /**
         * Event title.
         */
        title?: string | null;
    }
    /**
     * Request for creating file.
     */
    export interface Schema$CreateFileRequest {
        /**
         * Blob file reference. This will be propagated by scotty agent automatically.
         */
        blob?: Schema$GdataMedia;
        /**
         * Optional. Text description of the file&#39;s content. Screen readers use this description to help users with disabilities understand what the file contains.
         */
        contentDescription?: string | null;
        /**
         * Optional. Publicly available URL of the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when fetching the file. Supported image content types: image/jpeg, image/jpg, image/gif, image/png. Supported video content types: video/h263, video/m4v, video/mp4, video/mpeg, video/mpeg4, video/webm.
         */
        fileUrl?: string | null;
        /**
         * Media request info populated by Scotty server. This will be propagated by scotty agent automatically.
         */
        mediaRequestInfo?: Schema$MediaRequestInfo;
        /**
         * Optional. Publicly available URL of the thumbnail corresponding to the file. If this field is not set, then the RBM platform automatically generates a thumbnail from the file. The RBM platform determines the MIME type of the file from the content-type field in the HTTP headers when fetching the file. Supported image content types: image/jpeg, image/jpg, image/gif, image/png.
         */
        thumbnailUrl?: string | null;
    }
    /**
     * Opens the user&#39;s default dialer app with the agent-specified phone number filled in.
     */
    export interface Schema$DialAction {
        /**
         * The phone number in E.164 format, for example, +12223334444.
         */
        phoneNumber?: string | null;
    }
    /**
     * Dialogflow event triggered by the RBM Platform. With events, an agent can match an intent without using language as an input. Parameters enable personalized responses. For example, with the input `{ &quot;eventName&quot;: &quot;welcome_event&quot;, &quot;parameters&quot;: { &quot;name&quot;: &quot;Sam&quot; } }`, a Dialogflow agent can create the response `&quot;Hello Sam! What can I do for you today?&quot;`.
     */
    export interface Schema$DialogflowEvent {
        /**
         * The unique identifier of the event. For example, `RBM_WELCOME_EVENT`.
         */
        eventName?: string | null;
        /**
         * The language of this query. For a list of language codes, see Language Support. Before a Dialogflow agent can use a language, the language must be enabled in the Dialogflow console. Queries in the same session can specify different languages. If a language isn&#39;t specified, Dialogflow uses the agent&#39;s default language. do not necessarily need to specify the same language.
         */
        languageCode?: string | null;
        /**
         * This field is set by the RBM platform. Don&#39;t include it when creating an agent message. The field resolves &quot;phones/{E.164}/dialogflowMessages/{messageId}&quot;, where {E.164} is the user&#39;s phone number in E.164 format and {messageId} is the agent-assigned ID of the RBM agent message.
         */
        name?: string | null;
        /**
         * (Optional) Parameters associated with the event.
         */
        parameters?: {
            [key: string]: any;
        } | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * A file resource with a unique name that an agent can use to identify the file when sending messages.
     */
    export interface Schema$File {
        /**
         * Server-assigned unique name of the file resource, which an agent can use to identify the file when sending messages. The format is &quot;files/{uid}&quot;, where {uid} is a unique ID.
         */
        name?: string | null;
    }
    /**
     * Information to read/write to blobstore2.
     */
    export interface Schema$GdataBlobstore2Info {
        /**
         * The blob generation id.
         */
        blobGeneration?: string | null;
        /**
         * The blob id, e.g., /blobstore/prod/playground/scotty
         */
        blobId?: string | null;
        /**
         * Read handle passed from Bigstore -&gt; Scotty for a GCS download. This is a signed, serialized blobstore2.ReadHandle proto which must never be set outside of Bigstore, and is not applicable to non-GCS media downloads.
         */
        downloadReadHandle?: string | null;
        /**
         * The blob read token. Needed to read blobs that have not been replicated. Might not be available until the final call.
         */
        readToken?: string | null;
        /**
         * Metadata passed from Blobstore -&gt; Scotty for a new GCS upload. This is a signed, serialized blobstore2.BlobMetadataContainer proto which must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads.
         */
        uploadMetadataContainer?: string | null;
    }
    /**
     * A sequence of media data references representing composite data. Introduced to support Bigstore composite objects. For details, visit http://go/bigstore-composites.
     */
    export interface Schema$GdataCompositeMedia {
        /**
         * Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef.
         */
        blobRef?: string | null;
        /**
         * Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob.
         */
        blobstore2Info?: Schema$GdataBlobstore2Info;
        /**
         * A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn&#39;t support JavaScript. This prevents us from including the actual type of this field.
         */
        cosmoBinaryReference?: string | null;
        /**
         * crc32.c hash for the payload.
         */
        crc32cHash?: number | null;
        /**
         * Media data, set if reference_type is INLINE
         */
        inline?: string | null;
        /**
         * Size of the data, in bytes
         */
        length?: string | null;
        /**
         * MD5 hash for the payload.
         */
        md5Hash?: string | null;
        /**
         * Reference to a TI Blob, set if reference_type is BIGSTORE_REF.
         */
        objectId?: Schema$GdataObjectId;
        /**
         * Path to the data, set if reference_type is PATH
         */
        path?: string | null;
        /**
         * Describes what the field reference contains.
         */
        referenceType?: string | null;
        /**
         * SHA-1 hash for the payload.
         */
        sha1Hash?: string | null;
    }
    /**
     * Detailed Content-Type information from Scotty. The Content-Type of the media will typically be filled in by the header or Scotty&#39;s best_guess, but this extended information provides the backend with more information so that it can make a better decision if needed. This is only used on media upload requests from Scotty.
     */
    export interface Schema$GdataContentTypeInfo {
        /**
         * Scotty&#39;s best guess of what the content type of the file is.
         */
        bestGuess?: string | null;
        /**
         * The content type of the file derived by looking at specific bytes (i.e. &quot;magic bytes&quot;) of the actual file.
         */
        fromBytes?: string | null;
        /**
         * The content type of the file derived from the file extension of the original file name used by the client.
         */
        fromFileName?: string | null;
        /**
         * The content type of the file as specified in the request headers, multipart headers, or RUPIO start request.
         */
        fromHeader?: string | null;
        /**
         * The content type of the file derived from the file extension of the URL path. The URL path is assumed to represent a file name (which is typically only true for agents that are providing a REST API).
         */
        fromUrlPath?: string | null;
    }
    /**
     * Backend response for a Diff get checksums response. For details on the Scotty Diff protocol, visit http://go/scotty-diff-protocol.
     */
    export interface Schema$GdataDiffChecksumsResponse {
        /**
         * Exactly one of these fields must be populated. If checksums_location is filled, the server will return the corresponding contents to the user. If object_location is filled, the server will calculate the checksums based on the content there and return that to the user. For details on the format of the checksums, see http://go/scotty-diff-protocol.
         */
        checksumsLocation?: Schema$GdataCompositeMedia;
        /**
         * The chunk size of checksums. Must be a multiple of 256KB.
         */
        chunkSizeBytes?: string | null;
        /**
         * If set, calculate the checksums based on the contents and return them to the caller.
         */
        objectLocation?: Schema$GdataCompositeMedia;
        /**
         * The total size of the server object.
         */
        objectSizeBytes?: string | null;
        /**
         * The object version of the object the checksums are being returned for.
         */
        objectVersion?: string | null;
    }
    /**
     * Backend response for a Diff download response. For details on the Scotty Diff protocol, visit http://go/scotty-diff-protocol.
     */
    export interface Schema$GdataDiffDownloadResponse {
        /**
         * The original object location.
         */
        objectLocation?: Schema$GdataCompositeMedia;
    }
    /**
     * A Diff upload request. For details on the Scotty Diff protocol, visit http://go/scotty-diff-protocol.
     */
    export interface Schema$GdataDiffUploadRequest {
        /**
         * The location of the checksums for the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received. For details on the format of the checksums, see http://go/scotty-diff-protocol.
         */
        checksumsInfo?: Schema$GdataCompositeMedia;
        /**
         * The location of the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received.
         */
        objectInfo?: Schema$GdataCompositeMedia;
        /**
         * The object version of the object that is the base version the incoming diff script will be applied to. This field will always be filled in.
         */
        objectVersion?: string | null;
    }
    /**
     * Backend response for a Diff upload request. For details on the Scotty Diff protocol, visit http://go/scotty-diff-protocol.
     */
    export interface Schema$GdataDiffUploadResponse {
        /**
         * The object version of the object at the server. Must be included in the end notification response. The version in the end notification response must correspond to the new version of the object that is now stored at the server, after the upload.
         */
        objectVersion?: string | null;
        /**
         * The location of the original file for a diff upload request. Must be filled in if responding to an upload start notification.
         */
        originalObject?: Schema$GdataCompositeMedia;
    }
    /**
     * Backend response for a Diff get version response. For details on the Scotty Diff protocol, visit http://go/scotty-diff-protocol.
     */
    export interface Schema$GdataDiffVersionResponse {
        /**
         * The total size of the server object.
         */
        objectSizeBytes?: string | null;
        /**
         * The version of the object stored at the server.
         */
        objectVersion?: string | null;
    }
    /**
     * Parameters specific to media downloads.
     */
    export interface Schema$GdataDownloadParameters {
        /**
         * A boolean to be returned in the response to Scotty. Allows/disallows gzip encoding of the payload content when the server thinks it&#39;s advantageous (hence, does not guarantee compression) which allows Scotty to GZip the response to the client.
         */
        allowGzipCompression?: boolean | null;
        /**
         * Determining whether or not Apiary should skip the inclusion of any Content-Range header on its response to Scotty.
         */
        ignoreRange?: boolean | null;
    }
    /**
     * A reference to data stored on the filesystem, on GFS or in blobstore.
     */
    export interface Schema$GdataMedia {
        /**
         * Deprecated, use one of explicit hash type fields instead. Algorithm used for calculating the hash. As of 2011/01/21, &quot;MD5&quot; is the only possible value for this field. New values may be added at any time.
         */
        algorithm?: string | null;
        /**
         * Use object_id instead.
         */
        bigstoreObjectRef?: string | null;
        /**
         * Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef.
         */
        blobRef?: string | null;
        /**
         * Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob.
         */
        blobstore2Info?: Schema$GdataBlobstore2Info;
        /**
         * A composite media composed of one or more media objects, set if reference_type is COMPOSITE_MEDIA. The media length field must be set to the sum of the lengths of all composite media objects. Note: All composite media must have length specified.
         */
        compositeMedia?: Schema$GdataCompositeMedia[];
        /**
         * MIME type of the data
         */
        contentType?: string | null;
        /**
         * Extended content type information provided for Scotty uploads.
         */
        contentTypeInfo?: Schema$GdataContentTypeInfo;
        /**
         * A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn&#39;t support JavaScript. This prevents us from including the actual type of this field.
         */
        cosmoBinaryReference?: string | null;
        /**
         * For Scotty Uploads: Scotty-provided hashes for uploads For Scotty Downloads: (WARNING: DO NOT USE WITHOUT PERMISSION FROM THE SCOTTY TEAM.) A Hash provided by the agent to be used to verify the data being downloaded. Currently only supported for inline payloads. Further, only crc32c_hash is currently supported.
         */
        crc32cHash?: number | null;
        /**
         * Set if reference_type is DIFF_CHECKSUMS_RESPONSE.
         */
        diffChecksumsResponse?: Schema$GdataDiffChecksumsResponse;
        /**
         * Set if reference_type is DIFF_DOWNLOAD_RESPONSE.
         */
        diffDownloadResponse?: Schema$GdataDiffDownloadResponse;
        /**
         * Set if reference_type is DIFF_UPLOAD_REQUEST.
         */
        diffUploadRequest?: Schema$GdataDiffUploadRequest;
        /**
         * Set if reference_type is DIFF_UPLOAD_RESPONSE.
         */
        diffUploadResponse?: Schema$GdataDiffUploadResponse;
        /**
         * Set if reference_type is DIFF_VERSION_RESPONSE.
         */
        diffVersionResponse?: Schema$GdataDiffVersionResponse;
        /**
         * Parameters for a media download.
         */
        downloadParameters?: Schema$GdataDownloadParameters;
        /**
         * Original file name
         */
        filename?: string | null;
        /**
         * Deprecated, use one of explicit hash type fields instead. These two hash related fields will only be populated on Scotty based media uploads and will contain the content of the hash group in the NotificationRequest: http://cs/#google3/uploader/service/proto/upload_listener.proto&amp;q=class:Hash Hex encoded hash value of the uploaded media.
         */
        hash?: string | null;
        /**
         * For Scotty uploads only. If a user sends a hash code and the backend has requested that Scotty verify the upload against the client hash, Scotty will perform the check on behalf of the backend and will reject it if the hashes don&#39;t match. This is set to true if Scotty performed this verification.
         */
        hashVerified?: boolean | null;
        /**
         * Media data, set if reference_type is INLINE
         */
        inline?: string | null;
        /**
         * |is_potential_retry| is set false only when Scotty is certain that it has not sent the request before. When a client resumes an upload, this field must be set true in agent calls, because Scotty cannot be certain that it has never sent the request before due to potential failure in the session state persistence.
         */
        isPotentialRetry?: boolean | null;
        /**
         * Size of the data, in bytes
         */
        length?: string | null;
        /**
         * Scotty-provided MD5 hash for an upload.
         */
        md5Hash?: string | null;
        /**
         * Media id to forward to the operation GetMedia. Can be set if reference_type is GET_MEDIA.
         */
        mediaId?: string | null;
        /**
         * Reference to a TI Blob, set if reference_type is BIGSTORE_REF.
         */
        objectId?: Schema$GdataObjectId;
        /**
         * Path to the data, set if reference_type is PATH
         */
        path?: string | null;
        /**
         * Describes what the field reference contains.
         */
        referenceType?: string | null;
        /**
         * Scotty-provided SHA1 hash for an upload.
         */
        sha1Hash?: string | null;
        /**
         * Scotty-provided SHA256 hash for an upload.
         */
        sha256Hash?: string | null;
        /**
         * Time at which the media data was last updated, in milliseconds since UNIX epoch
         */
        timestamp?: string | null;
        /**
         * A unique fingerprint/version id for the media data
         */
        token?: string | null;
    }
    /**
     * This is a copy of the tech.blob.ObjectId proto, which could not be used directly here due to transitive closure issues with JavaScript support; see http://b/8801763.
     */
    export interface Schema$GdataObjectId {
        /**
         * The name of the bucket to which this object belongs.
         */
        bucketName?: string | null;
        /**
         * Generation of the object. Generations are monotonically increasing across writes, allowing them to be be compared to determine which generation is newer. If this is omitted in a request, then you are requesting the live object. See http://go/bigstore-versions
         */
        generation?: string | null;
        /**
         * The name of the object.
         */
        objectName?: string | null;
    }
    /**
     * An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this must conform to the WGS84 standard. Values must be within normalized ranges.
     */
    export interface Schema$LatLng {
        /**
         * The latitude in degrees. It must be in the range [-90.0, +90.0].
         */
        latitude?: number | null;
        /**
         * The longitude in degrees. It must be in the range [-180.0, +180.0].
         */
        longitude?: number | null;
    }
    /**
     * A line item in a payment request.
     */
    export interface Schema$LineItem {
        /**
         * The amount of the line item. SECONDARY line items may have a negative amount.
         */
        amount?: Schema$Money;
        /**
         * The text for a line item. For example, &quot;Total due&quot;.
         */
        label?: string | null;
        /**
         * (Optional) Text that is displayed in a smaller font below the line item label.
         */
        subText?: string | null;
        /**
         * The line item type.
         */
        type?: string | null;
    }
    /**
     * A media file within a rich card.
     */
    export interface Schema$Media {
        /**
         * Information about a file, including the URL of the file and the URL of the file’s thumbnail. The RBM platform serves content from a cache, but an agent can force the RBM platform to fetch a new version of the content and refresh the cache.
         */
        contentInfo?: Schema$ContentInfo;
        /**
         * The unique name of the file, returned by the RBM platform when the file was uploaded.
         */
        fileName?: string | null;
        /**
         * The height of the media within a rich card with a vertical layout. For a standalone card with horizontal layout, height is not customizable, and this field is ignored.
         */
        height?: string | null;
    }
    /**
     * Extra information added to operations that support Scotty media requests.
     */
    export interface Schema$MediaRequestInfo {
        /**
         * The number of current bytes uploaded or downloaded.
         */
        currentBytes?: string | null;
        /**
         * Data to be copied to backend requests. Custom data is returned to Scotty in the agent_state field, which Scotty will then provide in subsequent upload notifications.
         */
        customData?: string | null;
        /**
         * Set if the http request info is diff encoded. The value of this field is the version number of the base revision. This is corresponding to Apiary&#39;s mediaDiffObjectVersion (//depot/google3/java/com/google/api/server/media/variable/DiffObjectVersionVariable.java). See go/esf-scotty-diff-upload for more information.
         */
        diffObjectVersion?: string | null;
        /**
         * The existence of the final_status field indicates that this is the last call to the agent for this request_id. http://google3/uploader/agent/scotty_agent.proto?l=737&amp;rcl=347601929
         */
        finalStatus?: number | null;
        /**
         * The type of notification received from Scotty.
         */
        notificationType?: string | null;
        /**
         * The Scotty request ID.
         */
        requestId?: string | null;
        /**
         * The total size of the file.
         */
        totalBytes?: string | null;
        /**
         * Whether the total bytes field contains an estimated data.
         */
        totalBytesIsEstimated?: boolean | null;
    }
    /**
     * Supported payment methods.
     */
    export interface Schema$Method {
        /**
         * The countries that the payment request is valid in, as ISO-2 country codes. For example, `[&quot;US&quot;, &quot;MX&quot;]`.
         */
        allowedCountryCodes?: string[] | null;
        /**
         * The billing address format.
         */
        billingAddressFormat?: string | null;
        /**
         * Whether or not the user must provide a billing address.
         */
        billingAddressRequired?: boolean | null;
        /**
         * The merchant ID for the supported payment method.
         */
        merchantId?: string | null;
        /**
         * The merchant name.
         */
        merchantName?: string | null;
        /**
         * The payment method name. You must set this field to `&quot;https://paywith.google.com/pay&quot;`.
         */
        paymentMethod?: string | null;
        /**
         * The supported card networks. For example, `[&quot;MASTERCARD&quot;, &quot;VISA&quot;, &quot;DISCOVER&quot;]`.
         */
        supportedCardNetworks?: string[] | null;
        /**
         * The supported card types. For example, `[&quot;CARD&quot;, &quot;TOKENIZED_CARD&quot;]`.
         */
        supportedCardTypes?: string[] | null;
        /**
         * Tokenization information for the payment request.
         */
        tokenizationData?: Schema$TokenizationData;
    }
    /**
     * Represents an amount of money with its currency type.
     */
    export interface Schema$Money {
        /**
         * The three-letter currency code defined in ISO 4217.
         */
        currencyCode?: string | null;
        /**
         * Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
         */
        nanos?: number | null;
        /**
         * The whole units of the amount. For example if `currencyCode` is `&quot;USD&quot;`, then 1 unit is one US dollar.
         */
        units?: string | null;
    }
    /**
     * Opens the user&#39;s default web browser app to the specified URL. If the user has an app installed that is registered as the default handler for the URL, then this app will be opened instead, and its icon will be used in the suggested action UI.
     */
    export interface Schema$OpenUrlAction {
        /**
         * URL
         */
        url?: string | null;
    }
    /**
     * Payment request action.
     */
    export interface Schema$PaymentRequestAction {
        /**
         * Text that replaces the payment request text when the transaction is complete.
         */
        completedMessage?: string | null;
        /**
         * Text that replaces the payment request text when the request is expired.
         */
        expiredMessage?: string | null;
        /**
         * (Optional) A timestamp of when the payment request expires. If a payment request expires, the request becomes invalid. If you specify a timestamp, the RCS-enabled messaging app doesn&#39;t verify an expiration time with the RBM agent. If you don&#39;t specify a timestamp, the payment request only expires if the agent flags the request as expired via the experation check webhook.
         */
        expireTime?: string | null;
        /**
         * Payment request line items, including regular items, taxes, sub-total, and shipping.
         */
        items?: Schema$LineItem[];
        /**
         * Supported payment methods.
         */
        paymentMethods?: Schema$Method[];
        /**
         * The agent-assigned ID of the payment request. This may be a UUID, as defined in https://tools.ietf.org/html/rfc4122.
         */
        requestId?: string | null;
        /**
         * This field is set by the RBM platform. Do not include it when creating a payment request. The field resolves to a checksum the RBM platform uses to validate the payment request.
         */
        signature?: string | null;
        /**
         * The total amount of the payment request. The value must be positive.
         */
        total?: Schema$LineItem;
    }
    /**
     * Request message for RBMService.RequestCapabilityCallback method.
     */
    export interface Schema$RequestCapabilityCallbackRequest {
        /**
         * The ID of the request, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. This request ID is included in the capability callback, which returns asynchronously.
         */
        requestId?: string | null;
    }
    /**
     * A standalone rich card or a carousel of rich cards sent from the agent to the user.
     */
    export interface Schema$RichCard {
        /**
         * Carousel of cards.
         */
        carouselCard?: Schema$CarouselCard;
        /**
         * Standalone card.
         */
        standaloneCard?: Schema$StandaloneCard;
    }
    /**
     * Opens the RCS app&#39;s location chooser so the user can pick a location to send back to the agent.
     */
    export interface Schema$ShareLocationAction {
    }
    /**
     * Standalone card
     */
    export interface Schema$StandaloneCard {
        /**
         * Card content.
         */
        cardContent?: Schema$CardContent;
        /**
         * Orientation of the card.
         */
        cardOrientation?: string | null;
        /**
         * Image preview alignment for standalone cards with horizontal layout.
         */
        thumbnailImageAlignment?: string | null;
    }
    /**
     * When tapped, initiates the corresponding native action on the device.
     */
    export interface Schema$SuggestedAction {
        /**
         * Opens the user&#39;s default calendar app and starts the new calendar event flow with the agent-specified event data pre-filled.
         */
        createCalendarEventAction?: Schema$CreateCalendarEventAction;
        /**
         * Opens the user&#39;s default dialer app with the agent-specified phone number filled in.
         */
        dialAction?: Schema$DialAction;
        /**
         * (Optional) Fallback URL to use if a client doesn&#39;t support a suggested action. Fallback URLs open in new browser windows.
         */
        fallbackUrl?: string | null;
        /**
         * Opens the user&#39;s default web browser app to the given URL. If the user has an app installed that is registered as the default handler for the URL, then this app will be opened instead, and its icon will be used in the suggested action UI.
         */
        openUrlAction?: Schema$OpenUrlAction;
        /**
         * Sends a payment request from the agent to the user.
         */
        paymentRequestAction?: Schema$PaymentRequestAction;
        /**
         * Payload (base64 encoded) that will be sent to the agent in the user event that results when the user taps the suggested action
         */
        postbackData?: string | null;
        /**
         * Opens the RCS app&#39;s location chooser so the user can pick a location to send to the agent.
         */
        shareLocationAction?: Schema$ShareLocationAction;
        /**
         * Text that is shown in the suggested action. Maximum 25 characters.
         */
        text?: string | null;
        /**
         * Opens the user&#39;s default map app and selects the agent-specified location or searches around the user&#39;s location given an agent-specified query.
         */
        viewLocationAction?: Schema$ViewLocationAction;
    }
    /**
     * When tapped, sends the text reply back to the agent.
     */
    export interface Schema$SuggestedReply {
        /**
         * The base64-encoded payload that the agent receives in a user event when the user taps the suggested reply.
         */
        postbackData?: string | null;
        /**
         * Text that is shown in the suggested reply and sent back to the agent when the user taps it. Maximum 25 characters.
         */
        text?: string | null;
    }
    /**
     * A suggested reply or a suggested action included within a rich card or within a suggestion chip list.
     */
    export interface Schema$Suggestion {
        /**
         * Users can tap a suggested action to initiate the corresponding native action on the device.
         */
        action?: Schema$SuggestedAction;
        /**
         * Users can tap a suggested reply to send the text reply back to the agent.
         */
        reply?: Schema$SuggestedReply;
    }
    /**
     * A tester for the agent. The agent can interact with verified testers even if the agent has not yet launched.
     */
    export interface Schema$Tester {
        /**
         * The status of the invitation.
         */
        inviteStatus?: string | null;
        /**
         * This field is set by the RBM platform. Do not include it when creating a tester object. The field resolves &quot;phones/{E.164}/testers&quot;, where {E.164} is the tester&#39;s phone number in E.164 format.
         */
        name?: string | null;
    }
    /**
     * Tokenization information for the payment request.
     */
    export interface Schema$TokenizationData {
        /**
         * Tokenization parameters, such as the public key.
         */
        parameters?: {
            [key: string]: string;
        } | null;
        /**
         * The tokenization type for the payment processing provider.
         */
        tokenizationType?: string | null;
    }
    /**
     * Opens the user&#39;s default map app and selects the agent-specified location or searches around the user&#39;s location given an agent-specified query.
     */
    export interface Schema$ViewLocationAction {
        /**
         * (Optional) The label of the pin dropped at lat_long.
         */
        label?: string | null;
        /**
         * (Optional) The latitude and longitude of the specified location.
         */
        latLong?: Schema$LatLng;
        /**
         * (Optional, only supported on Android Messages clients) Rather than specify a lat_long (and optionally, a label), the agent can instead specify a query string. For default map apps that support search functionality (including Google Maps), tapping this suggested action results in a location search centered around the user&#39;s current location. If the query is sufficiently specific, then agents can use it to select any location in the world. For instance, setting the query string to &quot;Growing Tree Bank&quot; will show all Growing Tree Bank locations in the user&#39;s vicinity. Setting the query string to &quot;1600 Amphitheater Parkway, Mountain View, CA 94043&quot; will select that specific address, regardless of the user&#39;s location.
         */
        query?: string | null;
    }
    export class Resource$Files {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.files.create
         * @desc Uploads a file for use in media or rich card messages. The agent provides the URL or binary of the file and (optionally) the URL of the corresponding thumbnail file. The RBM platform caches the file for 60 days and returns a unique name that you can use to identify the file when sending agent messages. To upload a file binary, make an HTTP POST request to the Upload URI, omit the `fileUrl` field from the JSON request body, and specify the binary as the POST request body. For example, use the `--upload-file` cURL flag with the fully qualified file path of the binary file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.files.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fileUrl": "my_fileUrl",
         *       //   "thumbnailUrl": "my_thumbnailUrl",
         *       //   "contentDescription": "my_contentDescription",
         *       //   "blob": {},
         *       //   "mediaRequestInfo": {}
         *       // }
         *     },
         *     media: {
         *       mimeType: 'placeholder-value',
         *       body: 'placeholder-value',
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
         * @alias rcsbusinessmessaging.files.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Files$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Files$Create, options?: MethodOptions): GaxiosPromise<Schema$File>;
        create(params: Params$Resource$Files$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Files$Create, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        create(params: Params$Resource$Files$Create, callback: BodyResponseCallback<Schema$File>): void;
        create(callback: BodyResponseCallback<Schema$File>): void;
    }
    export interface Params$Resource$Files$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateFileRequest;
        /**
         * Media metadata
         */
        media?: {
            /**
             * Media mime-type
             */
            mimeType?: string;
            /**
             * Media body contents
             */
            body?: any;
        };
    }
    export class Resource$Phones {
        context: APIRequestContext;
        agentEvents: Resource$Phones$Agentevents;
        agentMessages: Resource$Phones$Agentmessages;
        capability: Resource$Phones$Capability;
        dialogflowMessages: Resource$Phones$Dialogflowmessages;
        testers: Resource$Phones$Testers;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.getCapabilities
         * @desc Get the RBM-related capabilities of a user. The returned payload specifies whether a user can be reached with RBM and, if so, which RBM features the user supports. If the user can't be reached with RBM, the RBM platform returns `404 NOT_FOUND`. An agent that isn't launched can only request capabilities for users who are testers of that agent. If an unlaunched agent requests the capabilities of a non-tester, the RBM platform returns `403 PERMISSION_DENIED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.getCapabilities({
         *     // This field resolves to "phones/{E.164}/capabilities", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the resulting endpoint is https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capabilities.
         *     name: 'phones/my-phone',
         *     // The unique ID of the request, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. If the request ID matches an ID that the agent used for a previous request, the RBM platform ignores the new request.
         *     requestId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "features": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.phones.getCapabilities
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name This field resolves to "phones/{E.164}/capabilities", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the resulting endpoint is https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capabilities.
         * @param {string=} params.requestId The unique ID of the request, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. If the request ID matches an ID that the agent used for a previous request, the RBM platform ignores the new request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCapabilities(params: Params$Resource$Phones$Getcapabilities, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getCapabilities(params?: Params$Resource$Phones$Getcapabilities, options?: MethodOptions): GaxiosPromise<Schema$Capabilities>;
        getCapabilities(params: Params$Resource$Phones$Getcapabilities, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getCapabilities(params: Params$Resource$Phones$Getcapabilities, options: MethodOptions | BodyResponseCallback<Schema$Capabilities>, callback: BodyResponseCallback<Schema$Capabilities>): void;
        getCapabilities(params: Params$Resource$Phones$Getcapabilities, callback: BodyResponseCallback<Schema$Capabilities>): void;
        getCapabilities(callback: BodyResponseCallback<Schema$Capabilities>): void;
    }
    export interface Params$Resource$Phones$Getcapabilities extends StandardParameters {
        /**
         * This field resolves to "phones/{E.164}/capabilities", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the resulting endpoint is https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capabilities.
         */
        name?: string;
        /**
         * The unique ID of the request, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. If the request ID matches an ID that the agent used for a previous request, the RBM platform ignores the new request.
         */
        requestId?: string;
    }
    export class Resource$Phones$Agentevents {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.agentEvents.create
         * @desc Sends an event from the agent to a user. Agent events can be used to indicate that the agent has read a message from the user or that the agent is in the process of typing (which adds a human element to the RBM experience). Unlike agent messages, agent events cannot be revoked after sending.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.agentEvents.create({
         *     // The ID of the event, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         *     eventId: 'placeholder-value',
         *     // "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentEvents.
         *     parent: 'phones/my-phone',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "eventType": "my_eventType",
         *       //   "messageId": "my_messageId",
         *       //   "sendTime": "my_sendTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "eventType": "my_eventType",
         *   //   "messageId": "my_messageId",
         *   //   "sendTime": "my_sendTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.phones.agentEvents.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.eventId The ID of the event, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentEvents.
         * @param {().AgentEvent} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Phones$Agentevents$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Phones$Agentevents$Create, options?: MethodOptions): GaxiosPromise<Schema$AgentEvent>;
        create(params: Params$Resource$Phones$Agentevents$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Phones$Agentevents$Create, options: MethodOptions | BodyResponseCallback<Schema$AgentEvent>, callback: BodyResponseCallback<Schema$AgentEvent>): void;
        create(params: Params$Resource$Phones$Agentevents$Create, callback: BodyResponseCallback<Schema$AgentEvent>): void;
        create(callback: BodyResponseCallback<Schema$AgentEvent>): void;
    }
    export interface Params$Resource$Phones$Agentevents$Create extends StandardParameters {
        /**
         * The ID of the event, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         */
        eventId?: string;
        /**
         * "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, for a user with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentEvents.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AgentEvent;
    }
    export class Resource$Phones$Agentmessages {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.agentMessages.create
         * @desc Sends a message from the agent to a user. The user must be RCS enabled and reachable by the RBM platform in order for the agent to successfully send a message. When the message has been successfully sent, the call returns with no error. Otherwise, the agent receives an error code. If the user is online, the RBM platform delivers the message right away. Otherwise, the RBM platform queues the message and delivered it when the user is next online. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent. Agent messages can be revoked between the time that they are sent and the time that they are delivered.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.agentMessages.create({
         *     // The unique ID of the message, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         *     messageId: 'placeholder-value',
         *     // "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages.
         *     parent: 'phones/my-phone',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "sendTime": "my_sendTime",
         *       //   "contentMessage": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "sendTime": "my_sendTime",
         *   //   "contentMessage": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.phones.agentMessages.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.messageId The unique ID of the message, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages.
         * @param {().AgentMessage} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Phones$Agentmessages$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Phones$Agentmessages$Create, options?: MethodOptions): GaxiosPromise<Schema$AgentMessage>;
        create(params: Params$Resource$Phones$Agentmessages$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Phones$Agentmessages$Create, options: MethodOptions | BodyResponseCallback<Schema$AgentMessage>, callback: BodyResponseCallback<Schema$AgentMessage>): void;
        create(params: Params$Resource$Phones$Agentmessages$Create, callback: BodyResponseCallback<Schema$AgentMessage>): void;
        create(callback: BodyResponseCallback<Schema$AgentMessage>): void;
        /**
         * rcsbusinessmessaging.phones.agentMessages.delete
         * @desc Revokes an agent message that has been sent but not yet delivered. If the RBM platform successfully revokes a message, then the message is deleted from the user’s message queue and is never delivered. This method immediately returns 200 OK, whether or not the message was successfully revoked. There is a small chance that the agent may initiate a revocation while the RBM platform is in the process of delivering the message. In these rare cases, the agent receives a DELIVERED user event for the message shortly after initiating the revocation request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.agentMessages.delete({
         *     // "phones/{E.164}/agentMessages/{messageId}", where {E.164} is the user's phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message that should be revoked. For example, with the US phone number +1-222-333-4444 and an agent message with the ID "12345xyz", the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages/12345xyz.
         *     name: 'phones/my-phone/agentMessages/my-agentMessage',
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
         * @alias rcsbusinessmessaging.phones.agentMessages.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name "phones/{E.164}/agentMessages/{messageId}", where {E.164} is the user's phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message that should be revoked. For example, with the US phone number +1-222-333-4444 and an agent message with the ID "12345xyz", the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages/12345xyz.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Phones$Agentmessages$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Phones$Agentmessages$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Phones$Agentmessages$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Phones$Agentmessages$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Phones$Agentmessages$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
    }
    export interface Params$Resource$Phones$Agentmessages$Create extends StandardParameters {
        /**
         * The unique ID of the message, assigned by the agent. This must be a UUID, as defined in https://tools.ietf.org/html/rfc4122. The RBM platform ignores any agent message sent with an ID that was used by an earlier message or event sent from the same agent.
         */
        messageId?: string;
        /**
         * "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the value would be phones/+12223334444, and the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AgentMessage;
    }
    export interface Params$Resource$Phones$Agentmessages$Delete extends StandardParameters {
        /**
         * "phones/{E.164}/agentMessages/{messageId}", where {E.164} is the user's phone number in E.164 format and {messageId} is the agent-assigned ID of the agent message that should be revoked. For example, with the US phone number +1-222-333-4444 and an agent message with the ID "12345xyz", the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/agentMessages/12345xyz.
         */
        name?: string;
    }
    export class Resource$Phones$Capability {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.capability.requestCapabilityCallback
         * @desc Requests a callback containing the capabilities of a user. Following this request, the agent receives an asynchronous callback with the user's capabilities.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.capability.requestCapabilityCallback(
         *     {
         *       // "phones/{E.164}/capability", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capability:requestCapabilityCallback
         *       name: 'phones/my-phone',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "requestId": "my_requestId"
         *         // }
         *       },
         *     }
         *   );
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
         * @alias rcsbusinessmessaging.phones.capability.requestCapabilityCallback
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name "phones/{E.164}/capability", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capability:requestCapabilityCallback
         * @param {().RequestCapabilityCallbackRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        requestCapabilityCallback(params: Params$Resource$Phones$Capability$Requestcapabilitycallback, options: StreamMethodOptions): GaxiosPromise<Readable>;
        requestCapabilityCallback(params?: Params$Resource$Phones$Capability$Requestcapabilitycallback, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        requestCapabilityCallback(params: Params$Resource$Phones$Capability$Requestcapabilitycallback, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        requestCapabilityCallback(params: Params$Resource$Phones$Capability$Requestcapabilitycallback, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        requestCapabilityCallback(params: Params$Resource$Phones$Capability$Requestcapabilitycallback, callback: BodyResponseCallback<Schema$Empty>): void;
        requestCapabilityCallback(callback: BodyResponseCallback<Schema$Empty>): void;
    }
    export interface Params$Resource$Phones$Capability$Requestcapabilitycallback extends StandardParameters {
        /**
         * "phones/{E.164}/capability", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/capability:requestCapabilityCallback
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RequestCapabilityCallbackRequest;
    }
    export class Resource$Phones$Dialogflowmessages {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.dialogflowMessages.create
         * @desc Prompts a Dialogflow agent to send messages through an RBM agent. If Dialogflow integration isn't enabled for an RBM agent, this method returns `403 PERMISSION_DENIED`. When an RBM agent is integrated with a Dialogflow agent, this method triggers an event in the Dialogflow agent. The RBM Platform routes responses from Dialogflow to the user's device and routes messages from the user back to the Dialogflow agent. If a Dialogflow intent defines multiple responses, the RBM Platform sends users one message per defined response. If you contact a webhook with Dialogflow fulfillment, the fulfillment request includes the following information in the payload: Field Description rbm_user_phone_number The user's phone number. rbm_share_location_response The user's location, if they tapped the share location suggested action.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.dialogflowMessages.create({
         *     // A unique prefix of RBM message IDs that result from the Dialogflow event. Dialogflow supports multiple responses for a given event. If an event triggers multiple responses, RBM forwards each response as a separate message. Each message ID shares the same prefix.
         *     messageIdPrefix: 'placeholder-value',
         *     // "phones/{E.164}", where {E.164} is the user's phone number
         *     parent: 'phones/my-phone',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "eventName": "my_eventName",
         *       //   "parameters": {},
         *       //   "languageCode": "my_languageCode"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "eventName": "my_eventName",
         *   //   "parameters": {},
         *   //   "languageCode": "my_languageCode"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.phones.dialogflowMessages.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.messageIdPrefix A unique prefix of RBM message IDs that result from the Dialogflow event. Dialogflow supports multiple responses for a given event. If an event triggers multiple responses, RBM forwards each response as a separate message. Each message ID shares the same prefix.
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number
         * @param {().DialogflowEvent} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Phones$Dialogflowmessages$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Phones$Dialogflowmessages$Create, options?: MethodOptions): GaxiosPromise<Schema$DialogflowEvent>;
        create(params: Params$Resource$Phones$Dialogflowmessages$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Phones$Dialogflowmessages$Create, options: MethodOptions | BodyResponseCallback<Schema$DialogflowEvent>, callback: BodyResponseCallback<Schema$DialogflowEvent>): void;
        create(params: Params$Resource$Phones$Dialogflowmessages$Create, callback: BodyResponseCallback<Schema$DialogflowEvent>): void;
        create(callback: BodyResponseCallback<Schema$DialogflowEvent>): void;
    }
    export interface Params$Resource$Phones$Dialogflowmessages$Create extends StandardParameters {
        /**
         * A unique prefix of RBM message IDs that result from the Dialogflow event. Dialogflow supports multiple responses for a given event. If an event triggers multiple responses, RBM forwards each response as a separate message. Each message ID shares the same prefix.
         */
        messageIdPrefix?: string;
        /**
         * "phones/{E.164}", where {E.164} is the user's phone number
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DialogflowEvent;
    }
    export class Resource$Phones$Testers {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.phones.testers.create
         * @desc Invites a user to test an agent. The invited user must be RCS-enabled and reachable by the RBM platform. When an agent invites a user to become a tester, an RBM platform management agent sends a message to the user asking for confirmation that she wants to be a tester of the agent. Once the user confirms, she becomes a tester. An agent that has not yet launched can only interact with users who are testers of that agent. If an unlaunched agent attempts to send a message, event, or capability callback to a non-tester, the RBM platform returns a `403 PERMISSION_DENIED` error. An agent can send 20 tester requests each day with a total maximum of 200 tester requests. If you send tester requests above those limits, the RBM platform returns a `429 RESOURCE_EXHAUSTED` response.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.phones.testers.create({
         *     // "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/testers/.
         *     parent: 'phones/my-phone',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "inviteStatus": "my_inviteStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "inviteStatus": "my_inviteStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.phones.testers.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/testers/.
         * @param {().Tester} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Phones$Testers$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Phones$Testers$Create, options?: MethodOptions): GaxiosPromise<Schema$Tester>;
        create(params: Params$Resource$Phones$Testers$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Phones$Testers$Create, options: MethodOptions | BodyResponseCallback<Schema$Tester>, callback: BodyResponseCallback<Schema$Tester>): void;
        create(params: Params$Resource$Phones$Testers$Create, callback: BodyResponseCallback<Schema$Tester>): void;
        create(callback: BodyResponseCallback<Schema$Tester>): void;
    }
    export interface Params$Resource$Phones$Testers$Create extends StandardParameters {
        /**
         * "phones/{E.164}", where {E.164} is the user's phone number in E.164 format. For example, with the US phone number +1-222-333-4444, the resulting endpoint would be https://rcsbusinessmessaging.googleapis.com/v1/phones/+12223334444/testers/.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Tester;
    }
    export class Resource$Users {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * rcsbusinessmessaging.users.batchGet
         * @desc Gets the RCS-enabled phone numbers for a list of users. The returned payload contains a list of RCS-enabled phone numbers reachable by the RBM platform for the specified users. Only phone numbers that are RCS-enabled for a carrier the agent is launched on will be returned. The returned payload also contains values that can be used to estimate the potential reach of a list of phone numbers regardless of the launch status of the agent.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/rcsbusinessmessaging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
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
         *   const res = await rcsbusinessmessaging.users.batchGet({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "users": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "reachableUsers": [],
         *   //   "totalRandomSampleUserCount": 0,
         *   //   "reachableRandomSampleUserCount": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias rcsbusinessmessaging.users.batchGet
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().BatchGetUsersRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchGet(params: Params$Resource$Users$Batchget, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchGet(params?: Params$Resource$Users$Batchget, options?: MethodOptions): GaxiosPromise<Schema$BatchGetUsersResponse>;
        batchGet(params: Params$Resource$Users$Batchget, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchGet(params: Params$Resource$Users$Batchget, options: MethodOptions | BodyResponseCallback<Schema$BatchGetUsersResponse>, callback: BodyResponseCallback<Schema$BatchGetUsersResponse>): void;
        batchGet(params: Params$Resource$Users$Batchget, callback: BodyResponseCallback<Schema$BatchGetUsersResponse>): void;
        batchGet(callback: BodyResponseCallback<Schema$BatchGetUsersResponse>): void;
    }
    export interface Params$Resource$Users$Batchget extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchGetUsersRequest;
    }
    export {};
}
