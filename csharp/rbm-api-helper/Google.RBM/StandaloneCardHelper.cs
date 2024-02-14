using System;

using System.Collections.Generic;
using Google.Apis.RCSBusinessMessaging.v1.Data;

using Google.RBM.Cards;

namespace Google.RBM
{
    public class StandaloneCardHelper
    {
        private string title;
        private string description;
        private string imageFileUrl;
        private List<SuggestionHelper> suggestions;

        public StandaloneCardHelper(string title,
                                    string description,
                                    string imageFileUrl,
                                    List<SuggestionHelper> suggestions)
        {
            Initialize(title, description, imageFileUrl, suggestions);
        }

        public StandaloneCardHelper(string title,
                                    string description,
                                    string imageFileUrl,
                                    SuggestionHelper suggestion)
        {
            Initialize(title, description, imageFileUrl, new List<SuggestionHelper>());

            // add single suggestion to list
            suggestions.Add(suggestion);
        }

        private void Initialize(string title,
                                    string description,
                                    string imageFileUrl,
                                    List<SuggestionHelper> suggestions)
        {
            this.Title = title;
            this.Description = description;
            this.ImageFileUrl = imageFileUrl;
            this.Suggestions = suggestions;
        }

        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public string ImageFileUrl { get => imageFileUrl; set => imageFileUrl = value; }
        public List<SuggestionHelper> Suggestions { get => suggestions; set => suggestions = value; }

        /// <summary>
        /// Converts this helper object into an RBM card with medium height.
        /// </summary>
        /// <returns>The card content.</returns>
        public CardContent GetCardContent()
        {
            return GetCardContent(MediaHeight.MEDIUM);
        }

        /// <summary>
        /// Converts this helper object into an RBM card.
        /// </summary>
        /// <returns>The card content.</returns>
        /// <param name="height">Converts this helper object into an RBM card..</param>
        public CardContent GetCardContent(MediaHeight height)
        {
            // convert the suggestion helpers into actual suggested replies
            List<Suggestion> suggestedReplies = new List<Suggestion>();
            foreach (SuggestionHelper suggestion in suggestions)
            {
                suggestedReplies.Add(suggestion.SuggestedReply());
            }

            // create the card content
            CardContent cardContent = RbmApiHelper.CreateCardContent(
                    title,
                    description,
                    imageFileUrl,
                    height,
                    suggestedReplies
            );

            return cardContent;
        }
    }
}
