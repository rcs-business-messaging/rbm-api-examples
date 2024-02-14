using System;
using System.IO;
using System.Collections.Generic;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.RCSBusinessMessaging.v1;
using Google.Apis.RCSBusinessMessaging.v1.Data;

using Google.RBM.Cards;

namespace Google.RBM
{
    /// <summary>
    /// Helper class for using the RBM API.
    /// </summary>
    public class RbmApiHelper
    {
        // the URL for the API endpoint
        private const string RBM_API_URL = "https://www.googleapis.com/auth/rcsbusinessmessaging";

        // reference to the RBM SDK
        private RCSBusinessMessagingService rcsBusinessMessagingService;

        private string agentId;

        private RbmApiHelper()
        {
            // unused
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="T:rbm_csharp_client_v1.RbmApiHelper"/> class.
        /// </summary>
        /// <param name="credentialsFileLocation">The service credentials file location.</param>
        /// <param name="agentId">The agent id i.e. xxxx if the agent id is xxxx@rbm.goog. Mandatory if using the RBM Partner model.</param>
        public RbmApiHelper(string credentialsFileLocation, string agentId = null)
        {
            this.agentId = agentId;
            InitCredentials(credentialsFileLocation);
        }

        /// <summary>
        /// Initializes credentials used by the RBM API.
        /// </summary>
        /// <param name="credentialsFileLocation">The service credentials file location.</param>
        private void InitCredentials(string credentialsFileLocation)
        {
            string[] scopes = new string[] { RBM_API_URL };

            GoogleCredential credential;
            using (var stream = new FileStream(credentialsFileLocation,
                                               FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                                             .CreateScoped(scopes);
            }

            rcsBusinessMessagingService = new RCSBusinessMessagingService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential
            });
        }

        /// <summary>
        /// Takes the msisdn and converts it into the format
        /// we need to make API calls.
        /// </summary>
        /// <returns>The phone number reformatted for the API.</returns>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        private string ConvertToApiFormat(string msisdn)
        {
            return "phones/" + msisdn;
        }

        /// <summary>
        /// Generic method to send a text message using the RBM api to the
        /// user with the phone number msisdn.
        /// </summary>
        /// <param name="messageText">The text to send the user.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void SendTextMessage(string messageText, string msisdn)
        {
            SendTextMessage(messageText, msisdn, null);
        }

        /// <summary>
        /// Generic method to send a text message using the RBM api to the
        /// user with the phone number msisdn.
        /// </summary>
        /// <param name="messageText">The text to send the user.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        /// <param name="suggestions">The chip list suggestions.</param>
        public void SendTextMessage(string messageText, string msisdn,
                                    List<Suggestion> suggestions)
        {
            AgentContentMessage contentMessage = new AgentContentMessage();
            contentMessage.Text = messageText;

            // set suggestions if there are some
            if (suggestions != null)
            {
                contentMessage.Suggestions = suggestions;
            }

            AgentMessage agentMessage = new AgentMessage();
            agentMessage.ContentMessage = contentMessage;

            SendAgentMessage(agentMessage, msisdn);
        }

        /// <summary>
        /// Registers the device as a tester for this agent.
        /// </summary>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void RegsisterTester(string msisdn)
        {
            string phoneNumber = ConvertToApiFormat(msisdn);

            Tester tester = new Tester();

            PhonesResource.TestersResource.CreateRequest request
                          = rcsBusinessMessagingService.Phones.Testers.Create(tester, phoneNumber);

            if (this.agentId != null) request.AgentId = this.agentId;
            request.Execute();
        }

        /// <summary>
        /// Performs a batch user capability check. The API supports a maximum of 10,000
        /// users per request.
        /// </summary>
        /// <returns>A BatchGetUsersResponse object.</returns>
        /// <param name="phoneNumbers">List of user phone numbers to check.</param>
        /// <param name="agentId">Agent id.</param>
        public BatchGetUsersResponse GetUsers(List<string> phoneNumbers, string agentId)
        {
            BatchGetUsersRequest batchGetUsersRequest = new BatchGetUsersRequest();
            batchGetUsersRequest.Users = phoneNumbers;
            batchGetUsersRequest.AgentId = agentId;

            UsersResource.BatchGetRequest batchGetRequest
                          = rcsBusinessMessagingService.Users.BatchGet(batchGetUsersRequest);

            return batchGetRequest.Execute();
        }

        /// <summary>
        /// Checks whether the device associated with the phone number is RCS enabled.
        /// This uses the alpha synchronous capability check API.
        /// </summary>
        /// <returns>A Capabilities object indicating the device capability.</returns>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public Capabilities GetCapability(string msisdn)
        {
            string phoneNumber = ConvertToApiFormat(msisdn);

            PhonesResource.GetCapabilitiesRequest request
                          = rcsBusinessMessagingService.Phones.GetCapabilities(phoneNumber);

            request.RequestId = System.Guid.NewGuid().ToString();
            if (this.agentId != null) request.AgentId = this.agentId;

            Capabilities capabilities = null;
            try
            {
                capabilities = request.Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return capabilities;
        }

        /// <summary>
        /// Creates a card content object based on the parameters.
        /// </summary>
        /// <returns>The card content for a standalone card or carousel.</returns>
        /// <param name="title">The title for the card.</param>
        /// <param name="description">The description for the card.</param>
        /// <param name="imageUrl">The image url for the media file.</param>
        /// <param name="height">The height to display the media.</param>
        /// <param name="suggestions">List of suggestions to attach to the card.</param>
        public static CardContent CreateCardContent(string title,
                                             string description,
                                             string imageUrl,
                                             MediaHeight height,
                                             List<Suggestion> suggestions)
        {
            CardContent cardContent = new CardContent();

            if (imageUrl != null)
            {
                Media media = new Media();
                media.Height = height.ToString();

                ContentInfo contentInfo = new ContentInfo();
                contentInfo.FileUrl = imageUrl;
                contentInfo.ForceRefresh = true;

                media.ContentInfo = contentInfo;

                cardContent.Media = media;
            }

            if (title != null)
            {
                cardContent.Title = title;
            }

            if (description != null)
            {
                cardContent.Description = description;
            }

            if (suggestions != null && suggestions.Count > 0)
            {
                cardContent.Suggestions = suggestions;
            }

            return cardContent;
        }

        /// <summary>
        /// Creates a standalone card object based on the passed in parameters.
        /// </summary>
        /// <returns>The standalone card object.</returns>
        /// <param name="title">The title for the card.</param>
        /// <param name="description">The description for the card.</param>
        /// <param name="imageUrl">The image url for the media file.</param>
        /// <param name="height">The height to display the media.</param>
        /// <param name="orientation">The orientation of the card.</param>
        /// <param name="suggestions">List of suggestions to attach to the card.</param>
        public StandaloneCard CreateStandaloneCard(string title,
                                               string description,
                                               string imageUrl,
                                               MediaHeight height,
                                               CardOrientation orientation,
                                               List<Suggestion> suggestions)
        {
            // create the card content representation of the parameters
            CardContent cardContent = CreateCardContent(
                title,
                description,
                imageUrl,
                height,
                suggestions
            );

            // create a standalone vertical card
            StandaloneCard standaloneCard = new StandaloneCard();
            standaloneCard.CardContent = cardContent;
            standaloneCard.CardOrientation = orientation.ToString();

            return standaloneCard;
        }

        /// <summary>
        /// Generic method to execute the sending a standalone card to a client.
        /// </summary>
        /// <param name="standaloneCard">The card object to send.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void SendStandaloneCard(StandaloneCard standaloneCard, string msisdn)
        {
            // attach the standalone card to a rich card
            RichCard richCard = new RichCard();
            richCard.StandaloneCard = standaloneCard;

            // attach the rich card to the content for the message
            AgentContentMessage agentContentMessage = new AgentContentMessage();
            agentContentMessage.RichCard = richCard;

            // attach content to message
            AgentMessage agentMessage = new AgentMessage();
            agentMessage.ContentMessage = agentContentMessage;

            // send the message to the user
            SendAgentMessage(agentMessage, msisdn);
        }

        /// <summary>
        /// Generic method to execute the sending of a carousel rich card to a client.
        /// </summary>
        /// <param name="cardContents">List of CardContent items to be attached to the CarourselCard.</param>
        /// <param name="cardWidth">Width of the cards for the carousel.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void SendCarouselCards(List<CardContent> cardContents, CardWidth cardWidth, string msisdn)
        {
            // create a carousel card and attach the falist of card contents
            CarouselCard carouselCard = new CarouselCard();
            carouselCard.CardContents = cardContents;
            carouselCard.CardWidth = cardWidth.ToString();

            // attach the carousel card to a rich card
            RichCard richCard = new RichCard();
            richCard.CarouselCard = carouselCard;

            // attach the rich card to the content for the message
            AgentContentMessage agentContentMessage = new AgentContentMessage();
            agentContentMessage.RichCard = richCard;

            // attach content to message
            AgentMessage agentMessage = new AgentMessage();
            agentMessage.ContentMessage = agentContentMessage;

            // send the message to the user
            SendAgentMessage(agentMessage, msisdn);
    }

    /// <summary>
    /// Sends a READ request to a user's phone.
    /// </summary>
    /// <param name="messageId">The message id for the message that was read.</param>
    /// <param name="msisdn">The phone number in E.164 format to send the event to.</param>
    public void SendReadMessage(string messageId, string msisdn)
        {
            string phoneNumber = ConvertToApiFormat(msisdn);

            // create READ event to send user
            AgentEvent agentEvent = new AgentEvent();
            agentEvent.EventType = EventType.READ.ToString();
            agentEvent.MessageId = messageId;

            // create an agent event request to send to the msisdn
            PhonesResource.AgentEventsResource.CreateRequest request
                          = rcsBusinessMessagingService.Phones.AgentEvents.Create(agentEvent, phoneNumber);

            // set a unique event id
            request.EventId = System.Guid.NewGuid().ToString();
            if (this.agentId != null) request.AgentId = this.agentId;

            // execute the request, sending the READ event to the user's phone
            request.Execute();
        }

        /// <summary>
        /// Sends the IS_TYPING event to the user.
        /// </summary>
        /// <param name="msisdn">The phone number in E.164 format to send the event to.</param>
        public void SendIsTypingMessage(string msisdn)
        {
            string phoneNumber = ConvertToApiFormat(msisdn);

            // create IS_TYPING event to send user
            AgentEvent agentEvent = new AgentEvent();
            agentEvent.EventType = EventType.IS_TYPING.ToString();

            // create an agent event request to send to the msisdn
            PhonesResource.AgentEventsResource.CreateRequest request
                          = rcsBusinessMessagingService.Phones.AgentEvents.Create(agentEvent, phoneNumber);

            // set a unique event id
            request.EventId = System.Guid.NewGuid().ToString();
            if (this.agentId != null) request.AgentId = this.agentId;

            // execute the request, sending the IS_TYPING event to the user's phone
            request.Execute();
        }

        /// <summary>
        /// Revokes the message associated with messageId.
        /// </summary>
        /// <param name="messageId">The message id for the message that was sent.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void RevokeMessage(string messageId, string msisdn)
        {
            string name = ConvertToApiFormat(msisdn) + "/agentMessages/" + messageId;

            PhonesResource.AgentMessagesResource.DeleteRequest request
                          = rcsBusinessMessagingService.Phones.AgentMessages.Delete(name);

            if (this.agentId != null) request.AgentId = this.agentId;

            request.Execute();
        }

        /// <summary>
        /// Generic method to execute the sending of an agent message to a client.
        /// </summary>
        /// <param name="agentMessage">The message payload to send.</param>
        /// <param name="msisdn">The phone number in E.164 format.</param>
        public void SendAgentMessage(AgentMessage agentMessage, string msisdn)
        {
            string phoneNumber = ConvertToApiFormat(msisdn);

            PhonesResource.AgentMessagesResource.CreateRequest request
                          = rcsBusinessMessagingService.Phones.AgentMessages.Create(agentMessage, phoneNumber);

            request.MessageId = System.Guid.NewGuid().ToString();
            if (this.agentId != null) request.AgentId = this.agentId;

            request.Execute();
        }
    }
}
