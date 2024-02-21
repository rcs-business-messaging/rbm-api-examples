using System;
using System.Collections;

namespace KitchenSink
{
    /// <summary>
    /// Kitchen sink config database stored in a simple in-memory Hashttable
    /// </summary>
    public class KitchenSinkConfigDb
    {
        // simple Hashtable used for keeping track of user choices between selections
        private Hashtable db;

        // singleton reference to db
        private static KitchenSinkConfigDb instance;

        private KitchenSinkConfigDb()
        {
            this.db = new Hashtable();
        }

        /// <summary>
        /// Gets the singleton db instance.
        /// </summary>
        /// <returns>The datastore instance.</returns>
        public static KitchenSinkConfigDb GetInstance() {
            if (instance == null) {
                instance = new KitchenSinkConfigDb();
            }

            return instance;
        }

        /// <summary>
        /// Saves config information about the choices a user has made.
        /// </summary>
        /// <param name="key">The key associated with the config choice.</param>
        /// <param name="value">The value for the key.</param>
        /// <param name="msisdn">The user's phone number.</param>
        public void SaveClientConfig(string key, string value, string msisdn)
        {
            Hashtable currentConfig = GetExistingClientConfig(msisdn);

            // create a new config for the datastore if we do not have one already
            if (currentConfig == null)
            {
                currentConfig = new Hashtable()
                {
                    {"created_date", DateTime.UtcNow},
                };
                db[msisdn] = currentConfig;

            }

            // set the key/value that was passed in
            currentConfig[key] = value;
        }

        /// <summary>
        /// Checks the datastore for the current client decisions.
        /// </summary>
        /// <returns>A datastore entity if there exists one.</returns>
        /// <param name="msisdn">The user's phone number.</param>
        public Hashtable GetExistingClientConfig(string msisdn)
        {
            return (Hashtable)db[msisdn];
        }
    }
}
