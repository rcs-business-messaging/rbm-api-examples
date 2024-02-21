using System;
using System.Collections.Generic;
using Google.RBM;

namespace KitchenSink
{
    /// <summary>
    /// Constants for KitchenSinkBot and the MessageHandler.
    /// </summary>
    public static class Constants
    {
        // string that user can type to restart the bot experience
        public static readonly string START_AGENT = "start";

        // constant for the URL to a sample video for the rich card example
        public static readonly string SAMPLE_VIDEO_URL =
            "https://storage.googleapis.com/kitchen-sink-sample-images/sample-video.mp4";

        public static readonly string SAMPLE_VIDEO_THUMBNAIL_URL =
            "https://storage.googleapis.com/kitchen-sink-sample-images/sample-video-thumbnail.jpg";

        public static readonly SuggestionHelper CAROUSEL_OPTION
            = new SuggestionHelper("Carousel", "carousel");

        public static readonly SuggestionHelper ACTIONS_CHIP_LIST_OPTION
            = new SuggestionHelper("Actions Chip List", "actions_chip_list");

        public static readonly SuggestionHelper TEXT_MESSAGE_OPTION
            = new SuggestionHelper("Text Message", "text_message");

        public static readonly SuggestionHelper TEXT_WITH_CHIP_LIST_OPTION
            = new SuggestionHelper("Text Message w/ Chip List", "text_with_chip_list");

        public static readonly SuggestionHelper FILE_WITH_CHIP_LIST_OPTION
            = new SuggestionHelper("File w/ Chip List", "file_with_chip_list");

        public static readonly SuggestionHelper RICH_CARD_OPTION
            = new SuggestionHelper("Rich Card", "rich_card");

        public static readonly SuggestionHelper USER_GENERATED
            = new SuggestionHelper("User Generated", "user_generated");

        public static readonly SuggestionHelper USER_SENT_IMAGE
            = new SuggestionHelper("Image", "user_image");

        public static readonly SuggestionHelper USER_SENT_TEXT
            = new SuggestionHelper("Text", "user_text");

        public static readonly SuggestionHelper VERTICAL_RICH_CARD_OPTION
            = new SuggestionHelper("Vertical Rich Card", "VERTICAL");

        public static readonly SuggestionHelper HORIZONTAL_RICH_CARD_OPTION
            = new SuggestionHelper("Horizontal Rich Card", "HORIZONTAL");

        public static readonly SuggestionHelper HORIZONTAL_LEFT_THUMBNAIL_OPTION
            = new SuggestionHelper("Left", "LEFT");

        public static readonly SuggestionHelper HORIZONTAL_RIGHT_THUMBNAIL_OPTION
            = new SuggestionHelper("Right", "RIGHT");

        public static readonly SuggestionHelper VERTICAL_HEIGHT_SHORT_OPTION
            = new SuggestionHelper("Short", "SHORT");

        public static readonly SuggestionHelper VERTICAL_HEIGHT_MEDIUM_OPTION
            = new SuggestionHelper("Medium", "MEDIUM");

        public static readonly SuggestionHelper VERTICAL_HEIGHT_TALL_OPTION
            = new SuggestionHelper("Tall", "TALL");

        public static readonly SuggestionHelper RICH_CARD_WITH_IMAGE
            = new SuggestionHelper("Image", "image_rich_card");

        public static readonly SuggestionHelper RICH_CARD_WITH_VIDEO
            = new SuggestionHelper("Video", "video_rich_card");

        public static readonly SuggestionHelper RICH_CARD_WITH_IMAGE_THUMBNAIL
            = new SuggestionHelper("Image w/ Thumbnail", "image_thumbnail_rich_card");

        public static readonly SuggestionHelper RICH_CARD_WITH_VIDEO_THUMBNAIL
            = new SuggestionHelper("Video w/ Thumbnail", "video_thumbnail_rich_card");

        // static readonlyant for suggestion to view your location
        public static readonly SuggestionHelper VIEW_LOCATION_OPTION
            = new SuggestionHelper("View Location", "map");

        // static readonlyant for suggestion of a calendar event
        public static readonly SuggestionHelper CALENDAR_OPTION
            = new SuggestionHelper("Create Calendar Event", "calendar");

        public static readonly SuggestionHelper DIAL_OPTION
            = new SuggestionHelper("Dial", "dial");

        public static readonly SuggestionHelper URL_OPTION
            = new SuggestionHelper("Open Url", "url");

        public static readonly SuggestionHelper SHARE_LOCATION_OPTION
            = new SuggestionHelper("Share Location", "share_location");

        public static readonly SuggestionHelper FUN_VIDEO_OPTION
            = new SuggestionHelper("Fun Video", "fun_video");

        // static readonlyant for liking an image
        public static readonly SuggestionHelper LIKE_ITEM
            = new SuggestionHelper("\uD83D\uDC4D Like", "like-item");

        // static readonlyant for disliking an image
        public static readonly SuggestionHelper DISLIKE_ITEM
            = new SuggestionHelper("\uD83D\uDC4E Dislike", "dislike-item");

        // constant for carousel suggestion items
        public static readonly List<SuggestionHelper> CAROUSEL_SUGGESTION_ITEMS
            = new List<SuggestionHelper>()
            {
                LIKE_ITEM, DISLIKE_ITEM
            };

        // constant for carousel sample
        public static readonly StandaloneCardHelper ADVENTURE_CLIFF_CARD =
            new StandaloneCardHelper(
                    "Snowy cliff",
                    "What do you think?",
                    "https://storage.googleapis.com/kitchen-sink-sample-images/adventure-cliff.jpg",
                    CAROUSEL_SUGGESTION_ITEMS);

        // constant for carousel sample
        public static readonly StandaloneCardHelper CUTE_DOG_CARD =
            new StandaloneCardHelper(
                    "Cute dog",
                    "What do you think?",
                    "https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg",
                    CAROUSEL_SUGGESTION_ITEMS);

        // constant for carousel sample
        public static readonly StandaloneCardHelper ELEPHANT_CARD =
            new StandaloneCardHelper(
                    "Elephant in the woods",
                    "What do you think?",
                    "https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg",
                    CAROUSEL_SUGGESTION_ITEMS);

        // constant for carousel sample
        public static readonly StandaloneCardHelper GOLDEN_GATE_CARD =
            new StandaloneCardHelper(
                    "Golden Gate Bridge",
                    "What do you think?",
                    "https://storage.googleapis.com/kitchen-sink-sample-images/golden-gate-bridge.jpg",
                    CAROUSEL_SUGGESTION_ITEMS);

        // constant for carousel sample
        public static readonly StandaloneCardHelper SHEEP_CARD =
            new StandaloneCardHelper(
                    "Cute sheep",
                    "What do you think?",
                    "https://storage.googleapis.com/kitchen-sink-sample-images/sheep.jpg",
                    CAROUSEL_SUGGESTION_ITEMS);

        // key values for storing user selections when generating rich cards
        public static readonly string RICH_CARD_HEIGHT = "rich_card_height";
        public static readonly string RICH_CARD_ALIGNNMENT = "thumbnail_alignment";
        public static readonly string RICH_CARD_ORIENTATION = "card_orientation";

        // key value for storing user selections when sending content to the bot
        public static readonly string USER_CONTENT_SELECTION = "user_content_selection";

        public static readonly string FOLLOW_UP_DEFAULT_OPTIONS = "Pick another feature to explore:";
    }
}
