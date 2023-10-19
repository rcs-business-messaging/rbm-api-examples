package com.google.rbm.samples.lib;

import com.google.api.services.businesscommunications.v1.model.Agent;
import com.google.api.services.businesscommunications.v1.model.AgentVerificationContact;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingLaunchQuestionnaireContact;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentEmailEntry;
import com.google.api.services.businesscommunications.v1.model.Phone;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentBillingConfig;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentPhoneEntry;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingLaunchQuestionnaire;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgent;
import com.google.api.services.businesscommunications.v1.model.RcsBusinessMessagingAgentWebEntry;
import java.time.Instant;
import java.util.Collections;

public final class AgentFactory {

  public static final String YOUTUBE_VIDEO = "https://www.youtube.com/watch?v=NN75im_us4k";
  public static final String IMAGE1 =
      "https://www.gstatic.com/rbmconsole/images/google_logo_background_white_color_1440x720px.png";
  public static final String IMAGE2 = "https://www.gstatic.com/rbmconsole/images/default_logo.png";
  public static final String IMAGE3 =
      "https://www.gstatic.com/rbmconsole/images/default_logo_1024.png";
  public static final String IMAGE4 =
      "https://www.gstatic.com/rbmconsole/images/google_logo_background_white_color_1440x720px.png";


  public static RcsBusinessMessagingAgent createRbmAgent(String suffix) {
    String logo = suffix.hashCode() % 2 == 0 ? IMAGE1 : IMAGE2;
    String hero = suffix.hashCode() % 3 < 2 ? IMAGE3 : IMAGE4;

    RcsBusinessMessagingAgent agent = new RcsBusinessMessagingAgent();
    agent.setDescription("Description 00" + suffix);
    agent.setColor("#CC000" + suffix.hashCode() % 10);
    agent.setLogoUri(logo);
    agent.setHeroUri(hero);
    agent.setTermsConditions(
        new RcsBusinessMessagingAgentWebEntry().setLabel("TOS").setUri("https://rbm.google.com/tos-00" + suffix));
    agent.setPrivacy(
        new RcsBusinessMessagingAgentWebEntry().setLabel("Privacy").setUri("https://rbm.google.com/privacy-00" + suffix));
    agent.setEmails(Collections.singletonList(
        new RcsBusinessMessagingAgentEmailEntry().setLabel("me").setAddress("user@domain.com" + suffix)));
    agent.setWebsites(Collections.singletonList(
        new RcsBusinessMessagingAgentWebEntry().setLabel("me").setUri("https://rbm.google.com/web-00" + suffix)));
    agent.setPhoneNumbers(Collections.singletonList(
        new RcsBusinessMessagingAgentPhoneEntry().setLabel("MSISDN")
            .setPhoneNumber(new Phone().setNumber("+1650996943" + suffix.hashCode() % 10))));
    agent.setBillingConfig(
        new RcsBusinessMessagingAgentBillingConfig().setBillingCategory("BASIC_MESSAGE"));
    agent.setAgentUseCase("PROMOTIONAL");
    agent.setHostingRegion("ASIA_PACIFIC");
    return agent;
  }

  public static RcsBusinessMessagingLaunchQuestionnaire createRbmQuestionnaire() {
    String suffix = Instant.now().toString();
    return new RcsBusinessMessagingLaunchQuestionnaire()
        .setContacts(
            Collections.singletonList(new RcsBusinessMessagingLaunchQuestionnaireContact()
                .setTitle("Contact manager " + suffix)
                .setName("Contact person " + suffix)
                .setEmail("user@domain.com")))
        .setVideoUris(Collections.singletonList(YOUTUBE_VIDEO))
        .setScreenshotUris(Collections.singletonList(YOUTUBE_VIDEO))
        .setTriggerDescription("Trigger description " + suffix)
        .setAgentAccessInstructions("Agent instructions " + suffix)
        .setInteractionsDescription("Agent instructions " + suffix)
        .setOptinDescription("Opt-in description " + suffix)
        .setOptoutDescription("Opt-out description " + suffix);
  }

  public static AgentVerificationContact createRbmAgentVerification() {
    String suffix = Instant.now().toString();
    return new AgentVerificationContact()
        .setBrandContactEmailAddress("brand-email@domain.com")
        .setBrandContactName("Contact name 00" + suffix)
        .setBrandWebsiteUrl("https://rbm.some.com/abc-" + suffix)
        .setPartnerName("Partner name 00" + suffix)
        .setPartnerEmailAddress("partner-email@domain.com");
  }

  private AgentFactory() {
  }
}
