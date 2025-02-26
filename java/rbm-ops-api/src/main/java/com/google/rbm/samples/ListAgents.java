/*
Copyright 2022 Google Inc. All rights reserved.

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

import com.google.api.services.businesscommunications.v1.BusinessCommunications;
import com.google.api.services.businesscommunications.v1.model.ListAgentsResponse;
import java.io.IOException;
import java.util.Collections;


public class ListAgents extends BusinessCommsSample {

  public ListAgents() {  }

  public void listAgents() throws IOException {
    BusinessCommunications.Brands.Agents.List listRequest = bcBuilder.build().brands().agents()
      .list("brands/-");

    // Set a page size for the first request
    listRequest.setPageSize(50);
    
    ListAgentsResponse response = listRequest.execute();

    logger.info("Agents retrieved: " + response.getAgents().size());

    // Iterate over any subsequent pages
    while (response.getNextPageToken() != null) {
      listRequest.setPageToken(response.getNextPageToken());
      response = listRequest.execute();
      logger.info("Agents retrieved: " + response.getAgents().size());
    }

  }

  public static void main(String[] args) throws IOException {
    new ListAgents().listAgents();
  }

}