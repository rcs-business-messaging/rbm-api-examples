using System;
using System.IO;
using Google.Apis.RCSBusinessMessaging.v1.Data;

using System.Linq;
using System.Text;
using System.Threading;
using System.Collections.Generic;

using Newtonsoft.Json.Linq;

using System.Collections;

namespace KitchenSink
{
    /// <summary>
    /// Sets up a Pub/Sub listener for the pull subscription and routes messages sent back
    /// from the client to the appropriate follow up response.
    /// </summary>
    public class MessageHandler
    {
        // reference to the bot
        private KitchenSinkBot kitchenSinkBot;

        // cloud datastore db used for keeping track of user choices between selections
        private KitchenSinkConfigDb kitchenSinkConfigDb;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:rbm_csharp_kitchen_sink.MessageHandler"/> class.
        /// </summary>
        /// <param name="credentialsFileLocation">The service credentials file location.</param>
        /// <param name="kitchenSinkBot">Reference to the kitchen sink bot.</param>
        public MessageHandler(string credentialsFileLocation,
                              KitchenSinkBot kitchenSinkBot)
        {
            this.kitchenSinkBot = kitchenSinkBot;
            this.kitchenSinkConfigDb = KitchenSinkConfigDb.GetInstance();
        }


        /// <summary>
        /// Parses the textual response from the client.
        /// </summary>
        /// <returns>The response text.</returns>
        /// <param name="jsonObject">The JSON payload sent back from the user.</param>
        private string GetResponseText(JObject jsonObject)
        {
            if (jsonObject["text"] != null)
            {
                return (string)jsonObject["text"];
            }
            else if (jsonObject["suggestionResponse"] != null)
            {
                JObject innerJson = (JObject)jsonObject["suggestionResponse"];

                return (string)innerJson.GetValue("postbackData");
            }
            else if (jsonObject["userFile"] != null)
            {
                JObject innerJson = (JObject)jsonObject["userFile"];
                innerJson = (JObject)innerJson["payload"];

                return (string)innerJson.GetValue("fileUri");
            }
            else if (jsonObject.ContainsKey("location"))
            {

                return jsonObject["location"].ToString();
            }

            return "";
        }

        /// <summary>
        /// Sends the client a message stating that we like their color too.
        /// </summary>
        /// <param name="userResponse">The color choice by the user.</param>
        /// <param name="msisdn">The phone number, in E.164 format, to 
        /// send the message to.</param>
        public void HandleUserResponse(string userResponse, string msisdn)
        {
            if (userResponse.ToLower().Equals("stop"))
            {
                // Any real agent must support this command
                // TODO: Client typed stop, agent should no longer send messages to this msisdn
                Console.WriteLine(msisdn + " asked to stop agent messaging");
            }
            else
            {
                Console.WriteLine("Sending response to " + msisdn);

                // send typing indicator
                kitchenSinkBot.SendIsTypingMessage(msisdn);

                string cleanResponse = userResponse.ToLower();

                // check to see if we need to resend the bot greeting
                if (cleanResponse.Equals(Constants.START_AGENT))
                {
                    kitchenSinkBot.SendGreeting();
                }
                else if (IsImageResponse(userResponse))
                {
                    // handles like/dislike of an image
                    kitchenSinkBot.SendImageResponseNotification(userResponse);
                }
                else if (IsRichCardChoiceResponse(userResponse))
                {
                    // asks the user to select rich card height or alignment
                    kitchenSinkBot.SendRichCardMediaOptions(userResponse);
                }
                else if (IsRichCardOptionResponse(userResponse))
                {
                    // asks the user to select image or video for content
                    kitchenSinkBot.SendRichCardContentOptions(userResponse,
                                                              IsRichCardHorizontalOptionResponse(userResponse));
                }
                else if (IsRichCardContentResponse(userResponse))
                {
                    // sends the rich card based on what the user has selected for options
                    kitchenSinkBot.SendRichCardExample(userResponse);

                    kitchenSinkBot.SendDefaultOptions(Constants.FOLLOW_UP_DEFAULT_OPTIONS);
                }
                else if (IsRbmTestFunctionality(userResponse))
                {
                    // sends the next message for the test based on the user's response
                    kitchenSinkBot.SendRbmTest(userResponse);
                }
                else if (IsUserContentSelection(userResponse))
                {
                    // sends a message prompting the user to send content matching their selection
                    kitchenSinkBot.SendContentPrompt(userResponse);
                }
                else if (IsLatLng(userResponse))
                {
                    kitchenSinkBot.SendLatLngFollowUp(userResponse);
                }
                else if (IsUserSentContent(msisdn))
                {
                    // check to see if this response is due to prompting for user-generated content
                    kitchenSinkBot.SendContentResponse(userResponse);
                }
                else if (!IsIgnoredResponse(userResponse))
                {
                    kitchenSinkBot.SendDefaultOptions(Constants.FOLLOW_UP_DEFAULT_OPTIONS);
                }
                else {
                  //  kitchenSinkBot.SendGreeting();
                }
            }
        }

        /// <summary>
        /// Checks to see if we should ignore the user's response.
        /// </summary>
        /// <returns><c>true</c>, if we should ignore.</returns>
        /// <param name="userResponse">The last response from the client.</param>
        private bool IsIgnoredResponse(string userResponse)
        {
            return userResponse.Equals("share_location");
        }

        /// <summary>
        /// Checks to see if the response contains location information for lat, lon.
        /// </summary>
        /// <returns><c>true</c>, if lat lng was used.</returns>
        /// <param name="userResponse">The last response from the client.</param>
        private bool IsLatLng(string userResponse)
        {
            return userResponse.IndexOf("latitude", StringComparison.CurrentCulture) >= 0;
        }

        /// <summary>
        /// Checks to see if the response the bot is receiving happened after a user content event.
        /// </summary>
        /// <returns><c>true</c>, if the response now is due to user generated content.</returns>
        /// <param name="msisdn">The user's phone number.</param>
        private bool IsUserSentContent(string msisdn)
        {
            Hashtable clientConfig = kitchenSinkConfigDb.GetExistingClientConfig(msisdn);

            return clientConfig != null
                && clientConfig[Constants.USER_CONTENT_SELECTION] != null
                && ((string)clientConfig[Constants.USER_CONTENT_SELECTION]).Length > 0;
        }

        /// <summary>
        /// Checks to see if the response is the client selecting to send the bot an image or text.
        /// </summary>
        /// <returns><c>true</c>, if the last user response is for sending an
        /// image or text to the bot.</returns>
        /// <param name="userResponse">The last response from the user.</param>
        private bool IsUserContentSelection(string userResponse)
        {
            return userResponse.Equals(Constants.USER_SENT_IMAGE.PostbackData)
                               || userResponse.Equals(Constants.USER_SENT_TEXT.PostbackData);
        }

        /// <summary>
        /// Checks the user response to see if they selected one of the RBM features.
        /// </summary>
        /// <returns><c>true</c>, if the user selected an RBM feature to explore.</returns>
        /// <param name="userResponse">The postback data from the user.</param>
        private bool IsRbmTestFunctionality(string userResponse)
        {
            List<Suggestion> suggestions = kitchenSinkBot.DefaultSuggestionList();

            foreach (Suggestion suggestion in suggestions)
            {
                if (suggestion.Reply.PostbackData.Equals(userResponse))
                {
                    return true;
                }
            } 

            return false;
        }

        /// <summary>
        /// Checks to see if the user has selected rich card height or alignment option.
        /// </summary>
        /// <returns><c>true</c>, if the user made a rich card height or alignment choice.</returns>
        /// <param name="userResponse">The last response from the user.</param>
        private bool IsRichCardOptionResponse(string userResponse)
        {
            return IsRichCardHorizontalOptionResponse(userResponse)
                    || IsRichCardVerticalOptionResponse(userResponse);
        }

        /// <summary>
        /// Checks to see if the user made an alignment choice for their rich card.
        /// </summary>
        /// <returns><c>true</c>, if the user chose an alignment.</returns>
        /// <param name="userResponse">The last response from the user.</param>
        private bool IsRichCardHorizontalOptionResponse(string userResponse)
        {
            return userResponse.Equals(Constants.HORIZONTAL_LEFT_THUMBNAIL_OPTION.PostbackData)
                    || userResponse.Equals(Constants.HORIZONTAL_RIGHT_THUMBNAIL_OPTION.PostbackData);
        }

        /**
         * Checks to see if the user made a height choice for their rich card.
         * @param userResponse The last response from the user.
         * @return True if the user chose a height.
         */
        private bool IsRichCardVerticalOptionResponse(string userResponse)
        {
            return userResponse.Equals(Constants.VERTICAL_HEIGHT_SHORT_OPTION.PostbackData)
                    || userResponse.Equals(Constants.VERTICAL_HEIGHT_MEDIUM_OPTION.PostbackData)
                    || userResponse.Equals(Constants.VERTICAL_HEIGHT_TALL_OPTION.PostbackData);
        }

        /// <summary>
        /// Checks the user response to see if they responded like/dislike
        /// on an image that was sent.
        /// </summary>
        /// <returns><c>true</c>, if the user reacted to an image.</returns>
        /// <param name="userResponse">The postback data from the user.</param>
        private bool IsImageResponse(string userResponse)
        {
            return userResponse.Equals(Constants.LIKE_ITEM.PostbackData)
                    || userResponse.Equals(Constants.DISLIKE_ITEM.PostbackData);
        }

        /// <summary>
        /// Checks the user response to see if they selected a rich card orientation.
        /// </summary>
        /// <returns><c>true</c>, if the user chose a rich card orientation.</returns>
        /// <param name="userResponse">The postback data from the user.</param>
        private bool IsRichCardChoiceResponse(string userResponse)
        {
            return userResponse.Equals(Constants.VERTICAL_RICH_CARD_OPTION.PostbackData)
                    || userResponse.Equals(Constants.HORIZONTAL_RICH_CARD_OPTION.PostbackData);
        }

        /// <summary>
        /// Checks the user response to see if they selected a rich card content type.
        /// </summary>
        /// <returns><c>true</c>, if the user chose a rich card content type.</returns>
        /// <param name="userResponse">The postback data from the user.</param>
        private bool IsRichCardContentResponse(string userResponse)
        {
            return userResponse.Equals(Constants.RICH_CARD_WITH_IMAGE.PostbackData)
                    || userResponse.Equals(Constants.RICH_CARD_WITH_VIDEO.PostbackData)
                    || userResponse.Equals(Constants.RICH_CARD_WITH_IMAGE_THUMBNAIL.PostbackData)
                    || userResponse.Equals(Constants.RICH_CARD_WITH_VIDEO_THUMBNAIL.PostbackData);
        }
    }
}
