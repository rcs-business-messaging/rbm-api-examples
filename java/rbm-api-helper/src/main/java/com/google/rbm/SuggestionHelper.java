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

// [START of the suggestion help wrapper class]

import com.google.api.services.rcsbusinessmessaging.v1.model.SuggestedReply;
import com.google.api.services.rcsbusinessmessaging.v1.model.Suggestion;

/**
 * Utility class for Suggestion postbackData and text.
 */
public class SuggestionHelper {
    private String text;
    private String postbackData;

    public SuggestionHelper(String text, String postbackData) {
        this.text = text;
        this.postbackData = postbackData;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPostbackData() {
        return postbackData;
    }

    public void setPostbackData(String postbackData) {
        this.postbackData = postbackData;
    }

    /**
     * Converts this suggestion helper object into a RBM suggested reply.
     * @return The Suggestion object as a suggested reply.
     */
    public Suggestion getSuggestedReply() {
        SuggestedReply reply = new SuggestedReply();
        reply.setText(this.text);
        reply.setPostbackData(this.postbackData);

        Suggestion suggestion = new Suggestion();
        suggestion.setReply(reply);

        return suggestion;
    }
}
// [END of the suggestion help wrapper class]
