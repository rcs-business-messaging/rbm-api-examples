# RCS Business messaging: Management and Messaging APIs

These code samples demonstrate how to use the RBM Management API Java SDK to
manage agents, agent launches, brands and tester devices; send a message to an RCS-enabled device.

## Prerequisites

You must have the following software installed on your development machine:

-  JDK 1.8 or greater
-  [Apache Maven](http://maven.apache.org) 3.5.2 or greater

## Setup: Obtaining your Service Account Key

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/)
   with your RBM Platform Google account and proceed to Partner settings.

2. Choose an RBM-enabled Partner Account in the top dropdown (pre-registered or created
   via self-registration).

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key
   for your RBM Partner account. You need this key to make RBM Messaging and Management API
   calls as your agent(s).

5. Add the service account key JSON to `src/main/resourcesrbm-agent-service-account-credentials.json`.

## Running the code samples

1. In a terminal, navigate to this sample's root directory.

2. Compile the samples:

```
   mvn compile
```

3. Choose one of the following commands below, depending on what is needed.

If you need to get underlying JSON payloads in REST API calls, pass additional
parameter to enable verbose logging:

```
mvn exec:java -Dexec.args="parameter_example=value_example enable_verbose_logging=true
```

### Listing regions for RBM agent launches

```
mvn exec:java -Dexec.args="list_regions=true"
```

### Listing brands

```
mvn exec:java -Dexec.args="list_brands=true"
```

### Creating a brand

```
mvn exec:java -Dexec.args="create_brand=true brand_name=NewBrandName"
```

### Reading a brand

```
   mvn exec:java -Dexec.args="brand_id=brands/actual-brand-id"
```

### Removing a brand

```
mvn exec:java -Dexec.args="remove_brand=true brand_id=brands/actual-brand-id"
```

### Listing agents
This requires a brand id from a previously created brand.

```
mvn exec:java -Dexec.args="list_agents=true brand_id=brands/actual-brand-id"
```

### Creating an agent
This requires a brand id from a previously created brand.

```
mvn exec:java -Dexec.args="create_agent=true brand_id=brands/actual-brand-id agent_name=RbmAgentName enable_verbose_logging=true"
```

### Updating an agent
This requires a brand id from a previously created brand.

```
mvn exec:java -Dexec.args="create_agent=true agent_id=brands/actual-brand-id/agents/actual-agent-id agent_name=RbmAgentName enable_verbose_logging=true"
```

### Retrieving agent definition

```
   mvn exec:java -Dexec.args="agent_id=brands/actual-brand-id/agents/actual-agent-id agent_name=RbmAgentName enable_verbose_logging=true"
```

### Deleting an agent

```
mvn exec:java -Dexec.args="remove_agent=true agent_id=brands/actual-brand-id/agents/actual-agent-id"
```

### Retrieve agent launches

```
mvn exec:java -Dexec.args="get_agent_launch=true agent_id=brands/actual-brand-id/agents/actual-agent-id"
```

### Requesting an agent launch

```
mvn exec:java -Dexec.args="launch_agent=true agent_id=brands/actual-brand-id/agents/actual-agent-id region=/v1/regions/dogfood-prod-us enable_verbose_logging=true"
```

### Cancelling an agent launch

```
mvn exec:java -Dexec.args="unlaunch_agent=true agent_id=brands/actual-brand-id/agents/actual-agent-id region=/v1/regions/dogfood-prod-us enable_verbose_logging=true"
```

### Retrieving verification state

```
mvn exec:java -Dexec.args="get_agent_verification=true agent_id=brands/actual-brand-id/agents/actual-agent-id"
```

### Requesting agent verification

```
mvn exec:java -Dexec.args="request_verification=true agent_id=brands/actual-brand-id/agents/actual-agent-id"
```

### Cancel a verification request

```
mvn exec:java -Dexec.args="unverify_agent=true agent_id=brands/actual-brand-id/agents/actual-agent-id"
```