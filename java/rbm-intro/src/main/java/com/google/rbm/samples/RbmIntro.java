/*
Copyright 2024 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.google.rbm.samples;


import com.google.rbm.RbmApiHelper;

import java.io.IOException;
import java.util.logging.Logger;


public class RbmIntro {
    // Provide your agent id (the part before @rbm.goog).
    private static final String AGENTID = "<SET YOUR AGENT ID HERE>";

    private static final Logger logger = Logger.getLogger(RbmIntro.class.getName());

    private RbmApiHelper rbmApiHelper;

    public RbmIntro() {
        // Initialize the API helper - with option to specify regional endpoint
        // if required.
        this.rbmApiHelper = new RbmApiHelper();
        // this.rbmApiHelper = new RbmApiHelper(RbmApiHelper.REGION_APAC);
        // this.rbmApiHelper = new RbmApiHelper(RbmApiHelper.REGION_US);
        // this.rbmApiHelper = new RbmApiHelper(RbmApiHelper.REGION_EU);

        this.rbmApiHelper.setAgentId(this.AGENTID);
    }

    public void sendMessage(String msisdn) {
        try {
            this.rbmApiHelper.sendTextMessage("What is your favorite color?", msisdn);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        RbmIntro intro = new RbmIntro();

        String msisdn = "<TEST MSISDN>";

        intro.sendMessage(msisdn);
    }
}