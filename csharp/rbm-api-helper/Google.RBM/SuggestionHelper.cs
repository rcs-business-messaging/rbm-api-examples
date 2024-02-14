using System;

using Google.Apis.RCSBusinessMessaging.v1.Data;

namespace Google.RBM
{
    public class SuggestionHelper
    {
        private string text;
        private string postbackData;

        public SuggestionHelper(string text, string postbackData)
        {
            this.Text = text;
            this.PostbackData = postbackData;
        }

        public string Text { get => text; set => text = value; }
        public string PostbackData { get => postbackData; set => postbackData = value; }

        /// <summary>
        /// Converts this suggestion helper object into a RBM suggested reply.
        /// </summary>
        /// <returns>The Suggestion object as a suggested reply.</returns>
        public Suggestion SuggestedReply()
        {
            SuggestedReply reply = new SuggestedReply();
            reply.Text = this.Text;
            reply.PostbackData = this.PostbackData;

            Suggestion suggestion = new Suggestion();
            suggestion.Reply = reply;

            return suggestion;
        }
    }
}
