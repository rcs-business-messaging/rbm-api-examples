using System;
using System.Collections;
using Google.Apis.RCSBusinessMessaging.v1.Data;

using System.Threading;
using System.Collections.Generic;

using Newtonsoft.Json.Linq;

using Google.RBM;
using Google.RBM.Cards;
using System.Globalization;

namespace KitchenSink
{
    /// <summary>
    /// RCS Business Messaging Kitchen Sink Bot.
    ///
    /// Sets up the chat between the bot and the user. This class handles all sending of
    /// RBM messages to the client.
    /// </summary>
    public class KitchenSinkBot
    {
        // the phone number, in E.164 format, to start a conversation with
        private string msisdn;

        // RBM api helper, makes SDK easier to use
        private RbmApiHelper rbmApiHelper;

        // cloud datastore db used for keeping track of user choices between selections
        private KitchenSinkConfigDb kitchenSinkConfigDb;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:rbm_csharp_client_v1.FirstAgent"/> class.
        /// </summary>
        /// <param name="credentialsFileLocation">The service credentials file location.</param>
        /// <param name="msisdn">The client msisdn in E.164 format.</param>
        public KitchenSinkBot(string credentialsFileLocation, string msisdn)
        {
            // If using a legacy RBM account you should use this
            // The agentId is optional but you can provide it if it makes things easier
            // this.rbmApiHelper = new RbmApiHelper(credentialsFileLocation);

            // If you are using the Partner Model you should supply the agent id
            this.rbmApiHelper = new RbmApiHelper(credentialsFileLocation, "MY AGENT ID");

            this.msisdn = msisdn;

            this.kitchenSinkConfigDb = KitchenSinkConfigDb.GetInstance();
        }

        /// <summary>
        /// Sends the is typing message.
        /// </summary>
        /// <param name="msisdn">The client msisdn in E.164 format.</param>
        public void SendIsTypingMessage(string msisdn) {
            rbmApiHelper.SendIsTypingMessage(msisdn);
        }

        /// <summary>
        /// Sends the read message.
        /// </summary>
        /// <param name="messageId">Message identifier for the message that was read.</param>
        /// <param name="msisdn">The client msisdn in E.164 format.</param>
        public void SendReadMessage(string messageId, string msisdn) {
            rbmApiHelper.SendReadMessage(messageId, msisdn);
        }

        /// <summary>
        /// Sends the initial greeting of to the user.
        /// </summary>
        public void SendGreeting()
        {
            SendDefaultOptions();
        }

        /// <summary>
        /// Sends the client a chip list of RBM features to explore with a default message.
        /// </summary>
        private void SendDefaultOptions()
        {
            SendDefaultOptions("Welcome! Pick a feature to explore.");
        }

        /// <summary>
        /// Sends the client a chip list of RBM features to explore.
        /// </summary>
        /// <param name="messageText">The text of the message.</param>
        public void SendDefaultOptions(string messageText)
        {
            List<Suggestion> suggestions = DefaultSuggestionList();

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Creates the default set of suggested replies for a client.
        /// </summary>
        /// <returns>A list of suggested replies..</returns>
        public List<Suggestion> DefaultSuggestionList()
        {
            List<Suggestion> suggestions = new List<Suggestion>
            {
                Constants.CAROUSEL_OPTION.SuggestedReply(),
                Constants.ACTIONS_CHIP_LIST_OPTION.SuggestedReply(),
                Constants.TEXT_MESSAGE_OPTION.SuggestedReply(),
                Constants.TEXT_WITH_CHIP_LIST_OPTION.SuggestedReply(),
                Constants.FILE_WITH_CHIP_LIST_OPTION.SuggestedReply(),
                Constants.RICH_CARD_OPTION.SuggestedReply(),
                Constants.USER_GENERATED.SuggestedReply()
            };

            return suggestions;
        }

        /// <summary>
        /// Sends the client a response after they liked/disliked an image.
        /// </summary>
        /// <param name="userResponse">The postback data from the client.</param>
        public void SendImageResponseNotification(string userResponse)
        {
            string messageText = "Cool! I'm glad you liked the image 😊.";

            if (userResponse.Equals(Constants.DISLIKE_ITEM.PostbackData))
            {
                messageText = "😞 I'm sorry that you did not like the image.";
            }

            List<Suggestion> suggestions = DefaultSuggestionList();

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Based on the orientation choice by the user, asks about
        /// sizing and alignment for the card.
        /// </summary>
        /// <param name="userResponse">The orientation choice from the user.</param>
        public void SendRichCardMediaOptions(string userResponse)
        {
            // save the orientation to a datastore
            kitchenSinkConfigDb.SaveClientConfig(Constants.RICH_CARD_ORIENTATION,
                                                 userResponse,
                                                 msisdn);

            // send client the rich card size or alignment options
            // based on the orientation they chose
            if (userResponse.Equals(CardOrientation.VERTICAL.ToString()))
            {
                SendVerticalCardOptions();
            }
            else
            {
                SendHorizontalCardOptions();
            }
        }

        /// <summary>
        /// Sends the client the vertical rich card sizing options.
        /// </summary>
        public void SendVerticalCardOptions()
        {
            List<Suggestion> suggestions = new List<Suggestion>
            {

                // create sizing suggestions
                Constants.VERTICAL_HEIGHT_SHORT_OPTION.SuggestedReply(),
                Constants.VERTICAL_HEIGHT_MEDIUM_OPTION.SuggestedReply(),
                Constants.VERTICAL_HEIGHT_TALL_OPTION.SuggestedReply()
            };

            string messageText = "Choose the rich card image size:";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Sends the client the horizontal rich card alignment options.
        /// </summary>
        public void SendHorizontalCardOptions()
        {
            List<Suggestion> suggestions = new List<Suggestion>();

            // create alignment suggestions
            suggestions.Add(Constants.HORIZONTAL_LEFT_THUMBNAIL_OPTION.SuggestedReply());
            suggestions.Add(Constants.HORIZONTAL_RIGHT_THUMBNAIL_OPTION.SuggestedReply());

            string messageText = "Choose the thumbnail alignment:";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Sends the client a chip list of choices for the content payload of the rich card.
        /// </summary>
        /// <param name="richCardImageConfig">The previously selected image
        /// config for the rich card.</param>
        /// <param name="isRichCardHorizontalOptionResponse">True if the alignment
        /// was selected.</param>
        public void SendRichCardContentOptions(string richCardImageConfig,
                                               bool isRichCardHorizontalOptionResponse)
        {
            if (isRichCardHorizontalOptionResponse)
            {
                // save to the correct config key based on a horizontal rich card
                kitchenSinkConfigDb.SaveClientConfig(Constants.RICH_CARD_ALIGNNMENT,
                                                     richCardImageConfig,
                                                     msisdn);
            }
            else
            {
                // save to the correct config key based on a vertical rich card
                kitchenSinkConfigDb.SaveClientConfig(Constants.RICH_CARD_HEIGHT,
                                                     richCardImageConfig,
                                                     msisdn);
            }

            List<Suggestion> suggestions = new List<Suggestion>
            {
                // create suggestions for the content type to send
                Constants.RICH_CARD_WITH_IMAGE.SuggestedReply(),
                Constants.RICH_CARD_WITH_VIDEO.SuggestedReply(),
                Constants.RICH_CARD_WITH_IMAGE_THUMBNAIL.SuggestedReply(),
                Constants.RICH_CARD_WITH_VIDEO_THUMBNAIL.SuggestedReply()
            };

            string messageText = "Choose the content type for the rich card:";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Sends the client a rich card sample based on the options they have chosen.
        /// </summary>
        /// <param name="userResponse">The last response from the client.</param>
        public void SendRichCardExample(string userResponse)
        {
            string fileUrl = "";
            string thumbnailFileUrl = "";

            if (userResponse.Equals(Constants.RICH_CARD_WITH_IMAGE.PostbackData)
                    || userResponse.Equals(Constants.RICH_CARD_WITH_IMAGE_THUMBNAIL.PostbackData))
            {
                fileUrl = Constants.CUTE_DOG_CARD.ImageFileUrl;

                // add the thumbnail if that option was selected
                if (userResponse.Equals(Constants.RICH_CARD_WITH_IMAGE_THUMBNAIL.PostbackData))
                {
                    thumbnailFileUrl = Constants.CUTE_DOG_CARD.ImageFileUrl;
                }
            }
            else
            {
                fileUrl = Constants.SAMPLE_VIDEO_URL;

                // add the thumbnail if that option was selected
                if (userResponse.Equals(Constants.RICH_CARD_WITH_VIDEO_THUMBNAIL.PostbackData))
                {
                    thumbnailFileUrl = Constants.SAMPLE_VIDEO_THUMBNAIL_URL;
                }
            }

            Hashtable clientConfig = kitchenSinkConfigDb.GetExistingClientConfig(msisdn);

            // set defaults for richcard configuration
            ThumbnailImageAlignment thumbnailAlignment = ThumbnailImageAlignment.LEFT;
            MediaHeight height = MediaHeight.TALL;
            CardOrientation orientation = CardOrientation.VERTICAL;

            // set the rich card configuration options based on what the client has selected
            if (clientConfig != null)
            {
                orientation =
                    ParseEnum<CardOrientation>((string)clientConfig[Constants.RICH_CARD_ORIENTATION]);

                if (clientConfig[Constants.RICH_CARD_HEIGHT] != null)
                {
                    height = ParseEnum<MediaHeight>((string)clientConfig[Constants.RICH_CARD_HEIGHT]);
                }

                if (clientConfig[Constants.RICH_CARD_ALIGNNMENT] != null)
                {
                    thumbnailAlignment =
                        ParseEnum<ThumbnailImageAlignment>((string)clientConfig[Constants.RICH_CARD_ALIGNNMENT]);
                }
            }

            // the title for the rich card
            string title = "I am a rich card.";

            // the description for the rich card
            string description = "I am a description.";

            // create a standalone card
            StandaloneCard standaloneCard = rbmApiHelper.CreateStandaloneCard(
                    title,
                    description,
                    fileUrl,
                    height,
                    orientation,
                    null
            );

            if (thumbnailFileUrl.Length > 0)
            {
                // set the thumbnail details
                standaloneCard.CardContent.Media.ContentInfo.ThumbnailUrl = thumbnailFileUrl;
            }

            // Horizontal cards must have a thumbnail alignment
            if (orientation == CardOrientation.HORIZONTAL)
            {
                standaloneCard.ThumbnailImageAlignment = thumbnailAlignment.ToString();
            }

            rbmApiHelper.SendStandaloneCard(standaloneCard, msisdn);
        }

        /// <summary>
        /// Response handler for the different RBM features a user can explore.
        /// </summary>
        /// <param name="userResponse">The postback data from the user's chip selection.</param>
        public void SendRbmTest(string userResponse)
        {
            if (userResponse.Equals(Constants.CAROUSEL_OPTION.PostbackData))
            {
                // send carousel
                SendSampleCarousel();

                // send follow-up test options
                SendDefaultOptions(Constants.FOLLOW_UP_DEFAULT_OPTIONS);
            }
            else if (userResponse.Equals(Constants.ACTIONS_CHIP_LIST_OPTION.PostbackData))
            {
                // send actions chip list
                SendRbmActionsChipListTest();
            }
            else if (userResponse.Equals(Constants.TEXT_MESSAGE_OPTION.PostbackData))
            {
                // send text message
                SendRbmTextMessageTest();
            }
            else if (userResponse.Equals(Constants.TEXT_WITH_CHIP_LIST_OPTION.PostbackData))
            {
                // send text with chip list
                SendRbmTextMessageWithChipListTest();
            }
            else if (userResponse.Equals(Constants.FILE_WITH_CHIP_LIST_OPTION.PostbackData))
            {
                // send image with chip list
                SendFileWithChipList(Constants.SHEEP_CARD.ImageFileUrl, null);
            }
            else if (userResponse.Equals(Constants.RICH_CARD_OPTION.PostbackData))
            {
                // send rich card options (horizontal/vertical)
                SendRichCardOrientationOptions();
            }
            else if (userResponse.Equals(Constants.USER_GENERATED.PostbackData))
            {
                // send options where a use sends the bot information
                SendUserGeneratedOptions();
            }
        }

        /// <summary>
        /// Prompts the user to choose a type of content to send to the bot.
        /// </summary>
        public void SendUserGeneratedOptions()
        {
            List<Suggestion> suggestions = new List<Suggestion>
            {
                Constants.USER_SENT_IMAGE.SuggestedReply(),
                Constants.USER_SENT_TEXT.SuggestedReply()
            };

            string messageText = "What type of content do you want to send?";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Asks the client whether they want a vertical or horizontal rich card.
        /// </summary>
        public void SendRichCardOrientationOptions()
        {
            List<Suggestion> suggestions = new List<Suggestion>
            {
                Constants.VERTICAL_RICH_CARD_OPTION.SuggestedReply(),
                Constants.HORIZONTAL_RICH_CARD_OPTION.SuggestedReply()
            };

            string messageText = "Choose an orientation for the rich card:";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Sends the client an image in a rich card along with a chip list.
        /// </summary>
        /// <param name="fileUrl">The file to send the user.</param>
        /// <param name="messageText">The text for the message.</param>
        public void SendFileWithChipList(string fileUrl, string messageText)
        {
            // get default chip list to attach to standalone card
            List<Suggestion> suggestions = DefaultSuggestionList();

            // if there is a message, send image as a card
            if (!string.IsNullOrEmpty(messageText))
            {
                // create a standalone card
                StandaloneCard standaloneCard = rbmApiHelper.CreateStandaloneCard(
                        messageText,
                        null,
                        fileUrl,
                        MediaHeight.TALL,
                        CardOrientation.VERTICAL,
                        null
                );

                rbmApiHelper.SendStandaloneCard(standaloneCard, msisdn);

                SendDefaultOptions(Constants.FOLLOW_UP_DEFAULT_OPTIONS);
            }
            else
            {
                // no message, so send image as a regular message
                ContentInfo contentInfo = new ContentInfo
                {
                    FileUrl = fileUrl
                };

                AgentContentMessage agentContentMessage = new AgentContentMessage
                {
                    ContentInfo = contentInfo,
                    Suggestions = suggestions
                };

                // attach content to message
                AgentMessage agentMessage = new AgentMessage
                {
                    ContentMessage = agentContentMessage
                };

                rbmApiHelper.SendAgentMessage(agentMessage, msisdn);
            }
        }

        /// <summary>
        /// Sends the client a plaintext RBM message.
        /// </summary>
        public void SendRbmTextMessageTest()
        {
            string messageText = "This is a text message.";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn
            );
        }

        /// <summary>
        /// Sends the client an RBM message with a chip list.
        /// </summary>
        public void SendRbmTextMessageWithChipListTest()
        {
            List<Suggestion> suggestions = DefaultSuggestionList();

            string messageText = "This is a text message with a chip list.";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestions
            );
        }

        /// <summary>
        /// Sends the client an RBM message with all possible RBM suggested actions.
        /// </summary>
        public void SendRbmActionsChipListTest()
        {
            List<Suggestion> suggestedActions = new List<Suggestion>
            {

                // add all the RBM suggested actions
                GetCalendarAction(),
                GetDialAction(),
                GetViewLocationAction(),
                GetUrlAction(),
                GetShareLocationAction(),
                GetFunVideoAction()
            };

            string messageText = "This is a chip list of suggested actions.";

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn,
                    suggestedActions
            );
        }

        /// <summary>
        /// Sends a carousel card to the client with example images.
        /// </summary>
        public void SendSampleCarousel()
        {
            // list of card content for the carousel
            List<CardContent> cardContents = new List<CardContent>
            {

                // add items as card content
                Constants.ADVENTURE_CLIFF_CARD.GetCardContent(MediaHeight.SHORT),
                Constants.CUTE_DOG_CARD.GetCardContent(MediaHeight.SHORT),
                Constants.ELEPHANT_CARD.GetCardContent(MediaHeight.SHORT),
                Constants.GOLDEN_GATE_CARD.GetCardContent(MediaHeight.SHORT),
                Constants.SHEEP_CARD.GetCardContent(MediaHeight.SHORT)
            };

            // send the message to the user
            rbmApiHelper.SendCarouselCards(cardContents, CardWidth.MEDIUM, msisdn);
        }

        /**
         * Creates a calendar suggested action.
         * @return A suggestion object for a calendar action.
         */
        /// <summary>
        /// Creates a calendar suggested action.
        /// </summary>
        /// <returns>A suggestion object for a calendar action.</returns>
        private Suggestion GetCalendarAction()
        {
            // initialize a start date for this fake start date and time
            DateTime startDate = DateTime.Now;
            startDate.AddMonths(1);

            // initialize an end date for this fake arrival date and time
            DateTime endDate = DateTime.Now;

            // add travel time to the existing calendar object
            endDate.AddMonths(1);
            endDate.AddHours(14);
            endDate.AddMinutes(2);

            // create the calendar event action for the trip
            CreateCalendarEventAction calendarEventAction = new CreateCalendarEventAction
            {
                Title = "RBM Agent Explorer",
                Description = "Calendar event created by the RBM Kitchen Sink",
                StartTimeDateTimeOffset = startDate,
                EndTimeDateTimeOffset = startDate
            };

            // attach the calendar action to a suggested action
            SuggestedAction suggestedAction = new SuggestedAction
            {
                CreateCalendarEventAction = calendarEventAction,
                Text = Constants.CALENDAR_OPTION.Text,
                PostbackData = Constants.CALENDAR_OPTION.PostbackData
            };

            // attach the action to a suggestion object
            Suggestion suggestion = new Suggestion
            {
                Action = suggestedAction
            };

            return suggestion;
        }

        /// <summary>
        /// Creates a phone call suggested action.
        /// </summary>
        /// <returns> A suggestion object for a dial action..</returns>
        private Suggestion GetDialAction()
        {
            // creating a dial an agent suggested action
            DialAction dialAction = new DialAction
            {
                PhoneNumber = "+12223334444"
            };

            // creating a suggested action based on a dial action
            SuggestedAction suggestedAction = new SuggestedAction
            {
                Text = Constants.DIAL_OPTION.Text,
                PostbackData = Constants.DIAL_OPTION.PostbackData,
                DialAction = dialAction
            };

            // attaching action to a suggestion
            Suggestion suggestion = new Suggestion
            {
                Action = suggestedAction
            };

            return suggestion;
        }

        /// <summary>
        /// Creates a open url suggested action for a YouTube video.
        /// </summary>
        /// <returns>A suggestion object for an open URL action.</returns>
        private Suggestion GetFunVideoAction()
        {
            return GetUrlAction(Constants.FUN_VIDEO_OPTION, "https://www.youtube.com/embed/xSE9Qk9wkig");
        }

        /// <summary>
        /// Creates a view location suggested action.
        /// </summary>
        /// <returns>A suggestion object for a view location action.</returns>
        private Suggestion GetViewLocationAction()
        {
            // create an open url action
            ViewLocationAction viewLocationAction = new ViewLocationAction
            {
                Query = "Googleplex Mountain View, CA"
            };

            // attach the open url action to a suggested action
            SuggestedAction suggestedAction = new SuggestedAction
            {
                ViewLocationAction = viewLocationAction,
                Text = Constants.VIEW_LOCATION_OPTION.Text,
                PostbackData = Constants.VIEW_LOCATION_OPTION.PostbackData
            };

            // attach the action to a suggestion object
            Suggestion suggestion = new Suggestion
            {
                Action = suggestedAction
            };

            return suggestion;
        }

        /// <summary>
        /// Creates an open URL suggested action.
        /// </summary>
        /// <returns>A suggestion object for an open URL action.</returns>
        private Suggestion GetUrlAction()
        {
            return GetUrlAction(Constants.URL_OPTION, "https://www.google.com");
        }

        /// <summary>
        /// Creates a share location suggested action.
        /// </summary>
        /// <returns>A suggestion object for a share location action.</returns>
        private Suggestion GetShareLocationAction()
        {
            // create an open url action
            ShareLocationAction shareLocationAction = new ShareLocationAction();

            // attach the open url action to a suggested action
            SuggestedAction suggestedAction = new SuggestedAction
            {
                ShareLocationAction = shareLocationAction,
                Text = Constants.SHARE_LOCATION_OPTION.Text,
                PostbackData = Constants.SHARE_LOCATION_OPTION.PostbackData
            };

            // attach the action to a suggestion object
            Suggestion suggestion = new Suggestion
            {
                Action = suggestedAction
            };

            return suggestion;
        }

        /// <summary>
        /// Creates a generic open URL suggested action.
        /// </summary>
        /// <returns>A suggestion object for an open URL action.</returns>
        /// <param name="suggestionHelper">The suggestion text and postback data.</param>
        /// <param name="url">The URL to send to the user.</param>
        private Suggestion GetUrlAction(SuggestionHelper suggestionHelper, string url)
        {
            // create an open url action
            OpenUrlAction openUrlAction = new OpenUrlAction
            {
                Url = url
            };

            // attach the open url action to a suggested action
            SuggestedAction suggestedAction = new SuggestedAction
            {
                OpenUrlAction = openUrlAction,
                Text = suggestionHelper.Text,
                PostbackData = suggestionHelper.PostbackData
            };

            // attach the action to a suggestion object
            Suggestion suggestion = new Suggestion
            {
                Action = suggestedAction
            };

            return suggestion;
        }

        /// <summary>
        /// Prompts the user for a specific type of content to send.
        /// </summary>
        /// <param name="userResponse">The last response from the user.</param>
        public void SendContentPrompt(string userResponse)
        {
            kitchenSinkConfigDb.SaveClientConfig(Constants.USER_CONTENT_SELECTION,
                                                 userResponse,
                                                 msisdn);

            string messageText = "Type a message and send it to me.";

            if (userResponse.Equals(Constants.USER_SENT_IMAGE.PostbackData))
            {
                messageText = "Select an image and send it to me.";
            }

            rbmApiHelper.SendTextMessage(
                    messageText,
                    this.msisdn
            );
        }

        /// <summary>
        /// Echos the user's shared location back to their device.
        /// </summary>
        /// <param name="userResponse">The client's location as a JSON string.</param>
        public void SendLatLngFollowUp(string userResponse)
        {
            JObject jsonObject = JObject.Parse(userResponse);

            string lat = "";
            if (jsonObject["latitude"] != null)
            {
                lat = jsonObject["latitude"].ToString();
            }

            string lng = "";
            if (jsonObject["longitude"] != null)
            {
                lng = jsonObject["longitude"].ToString();
            }

            string messageText = "You shared the location: [" + lat + ", " + lng + "]\n\n" +
                    "Please select another feature to explore:";

            SendDefaultOptions(messageText);
        }

        /// <summary>
        /// Sends the client a message based on the content they sent the bot. If an image was sent
        /// the image is echoed back to the user as a rich card.If a message was sent, the message
        /// is echoed back to the user.
        /// </summary>
        /// <param name="userResponse">The last message received from the user.</param>
        public void SendContentResponse(string userResponse)
        {
            Hashtable clientConfig = kitchenSinkConfigDb.GetExistingClientConfig(msisdn);

            string contentType = (string)clientConfig[Constants.USER_CONTENT_SELECTION];

            // reset the content in the client config
            kitchenSinkConfigDb.SaveClientConfig(Constants.USER_CONTENT_SELECTION,
                                                 "",
                                                 msisdn);

            // check to see if the user sent an image file
            if (contentType.Equals(Constants.USER_SENT_IMAGE.PostbackData))
            {
                SendFileWithChipList(userResponse, "Here is the file you sent!");
            }
            else
            {
                string messageText = "You sent the message \"" + userResponse + "\"";

                SendDefaultOptions(messageText);
            }
        }

        /// <summary>
        /// Sends a user an invite to test this agent.
        /// </summary>
        public void SendTesterInvite()
        {
            rbmApiHelper.RegsisterTester(msisdn);
        }

        static void Main(string[] args)
        {
            // make sure we have command line arguments
            if (args.Length != 2 && args.Length != 3)
            {
                Console.WriteLine("Usage:  " +
                        "<SERVICE_ACCOUNT.json> <PHONE E.164> <MODE>");

                Environment.Exit(0);
            }

            // get the credentials file and msisdn
            string credentialsFileLocation = args[0];
            string msisdn = args[1];

            string mode = "chat";

            // check if a mode was passed in
            if (args.Length > 2)
            {
                mode = args[2];
            }

            // create a reference of the agent
            KitchenSinkBot kitchenSinkBot = new KitchenSinkBot(credentialsFileLocation,
                                                   msisdn);

            // execute the method corresponding with the mode
            if (mode.Equals("chat"))
            {
                kitchenSinkBot.SendGreeting();

                // create message handler for routing messages sent from the user
                MessageHandler messageHandler = new MessageHandler(credentialsFileLocation,
                                                       kitchenSinkBot);

                while (true)
                {
                    Thread.Sleep(int.MaxValue);
                }
            }
            else if (mode.Equals("invite"))
            {
                Console.WriteLine("sending tester invite");
                kitchenSinkBot.SendTesterInvite();
            }
            else {
                Console.WriteLine("Invalid mode. Must be one of chat or invite.");
            }
        }

        public static T ParseEnum<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}
