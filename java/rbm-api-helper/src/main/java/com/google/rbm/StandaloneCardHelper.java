/*
 * Copyright (C) 2023 Google Inc. All rights reserved.
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
package com.google.rbm;

// [START of the standalone card help wrapper class]
import com.google.api.services.rcsbusinessmessaging.v1.model.CardContent;
import com.google.api.services.rcsbusinessmessaging.v1.model.Suggestion;
import com.google.rbm.cards.MediaHeight;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for CardContent data.
 */
public class StandaloneCardHelper {
    private String title;
    private String description;
    private String imageFileUrl;
    private List<SuggestionHelper> suggestions;

    public StandaloneCardHelper(String title,
                                String description,
                                String imageFileUrl,
                                List<SuggestionHelper> suggestions) {
        this.title = title;
        this.description = description;
        this.imageFileUrl = imageFileUrl;
        this.suggestions = suggestions;
    }

    public StandaloneCardHelper(String title,
                                String description,
                                String imageFileUrl,
                                SuggestionHelper suggestion) {
        this(title, description, imageFileUrl, new ArrayList<SuggestionHelper>());

        // add single suggestion to list
        suggestions.add(suggestion);
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImageFileUrl() {
        return imageFileUrl;
    }

    public List<SuggestionHelper> getSuggestions() {
        return suggestions;
    }

    /**
     * Converts this helper object into an RBM card.
     * @return CardContent object.
     */
    public CardContent getCardContent() {
        return getCardContent(MediaHeight.MEDIUM);
    }

    /**
     * Converts this helper object into an RBM card.
     * @param height The height of the media element.
     * @return CardContent object.
     */
    public CardContent getCardContent(MediaHeight height) {
        RbmApiHelper rbmApiHelper = new RbmApiHelper();

        // convert the suggestion helpers into actual suggested replies
        List<Suggestion> suggestedReplies = new ArrayList<Suggestion>();
        for(SuggestionHelper suggestion: suggestions) {
            suggestedReplies.add(suggestion.getSuggestedReply());
        }

        // create the card content
        CardContent cardContent = rbmApiHelper.createCardContent(
                title,
                description,
                imageFileUrl,
                height,
                suggestedReplies
        );

        return cardContent;
    }
}
// [END of the standalone card help wrapper class]
