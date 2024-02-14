using Google.Apis.RCSBusinessMessaging.v1.Data;
using Google.RBM;
using Newtonsoft.Json.Linq;

namespace rbm_csharp_client_v1
{
    /// <summary>
    /// RCS Business Messaging sample first agent.
    ///
    /// Sends the following message to a user: "What is your favorite color?"
    /// Does not wait for a response - the RBM Partner Model does not support PubSub 
    /// - you must now use webhooks.
    /// </summary>
    class FirstAgent
    {
        // the phone number, in E.164 format, to start a conversation with
        private string msisdn;

        // RBM api helper, makes SDK easier to use
        private RbmApiHelper rbmApiHelper;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:rbm_csharp_client_v1.FirstAgent"/> class.
        /// </summary>
        /// <param name="credentialsFileLocation">The service credentials file location.</param>
        /// <param name="msisdn">The client msisdn in E.164 format.</param>
        public FirstAgent(string credentialsFileLocation,
                          string msisdn)
        {
            // If using a legacy RBM account you should use this
            // The agentId is optional but you can provide it if it makes things easier
            // this.rbmApiHelper = new RbmApiHelper(credentialsFileLocation);

            // If you are using the Partner Model you should supply the agent id
            this.rbmApiHelper = new RbmApiHelper(credentialsFileLocation, "MY AGENT ID");
        
            this.msisdn = msisdn;
        }

        /// <summary>
        /// Sends the initial greeting of "What is your favorite color?" to the user.
        /// </summary>
        public void SendGreeting()
        {
            string messageText = "What is your favorite color?";

            Console.WriteLine("Sending greeting to " + msisdn);

            rbmApiHelper.SendTextMessage(messageText, msisdn);
        }

        /// <summary>
        /// Sends a user an invite to test this agent.
        /// </summary>
        public void SendTesterInvite()
        {
            rbmApiHelper.RegsisterTester(msisdn);
        }

        /// <summary>
        /// Sends the client device a capability check.
        /// </summary>
        public void SendCapabilityCheck()
        {
            Capabilities capabilities = rbmApiHelper.GetCapability(msisdn);
            if (capabilities != null)
            {
                foreach (string feature in capabilities.Features)
                {
                    Console.WriteLine(feature);
                }
            }
        }

        static void Main(string[] args)
        {
            // make sure we have command line arguments
            if (args.Length != 2 && args.Length != 3)
            {
                Console.WriteLine("Usage:  " +
                        "<SERVICE_ACCOUNT.json> <PHONE E.164> <MODE>");

                Environment.Exit(0);
            }

            // get the credentials file and msisdn
            string credentialsFileLocation = args[0];
            string msisdn = args[1];

            string mode = "chat";

            // check if a mode was passed in
            if (args.Length > 2)
            {
                mode = args[2];
            }

            // create a reference of the agent
            FirstAgent firstAgent = new FirstAgent(credentialsFileLocation,
                                                   msisdn);

            // execute the method corresponding with the mode
            if (mode.Equals("chat"))
            {
                firstAgent.SendGreeting();
            }
            else if (mode.Equals("capcheck"))
            {
                Console.WriteLine("sending capability check");
                firstAgent.SendCapabilityCheck();
            }
            else if (mode.Equals("invite"))
            {
                Console.WriteLine("sending tester invite");
                firstAgent.SendTesterInvite();
            }
            else
            {
                Console.WriteLine("Invalid mode. Must be one of chat, capcheck, or invite.");
            }
        }
    }
}
