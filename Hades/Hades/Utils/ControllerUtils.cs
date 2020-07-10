using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Reflection;
using Microsoft.Extensions.Logging;
using System.Diagnostics.CodeAnalysis;

namespace Hades.Utils
{
    public class ControllerUtils
    {
        private ILogger<ControllerUtils> logger;
        public ControllerUtils(ILogger<ControllerUtils> logger)
        {
            this.logger = logger;
        }

        /// <summary>
        /// Unwraps data from JsonElement.
        /// </summary>
        /// <param name="propertyInfos">For each property in JsonElement: Key = name of the property, Value = Type of the property.</param>
        /// <param name="jsonRequest">JsonElement to unwrap.</param>
        /// <returns>Dictionary where: Key = name of the property, Value = value unwrapped from JsonElement</returns>
        public Dictionary<string, object> UnwrapJsonRequest(Dictionary<string, Type> propertyInfos, JsonElement jsonElement)
        {
            // Validate keys
            if (propertyInfos == null)
            {
                throw new ArgumentNullException("keys");
            }

            Dictionary<string, object> results = new Dictionary<string, object>();            
            // Repeat for every value in JSON
            foreach (KeyValuePair<string, Type> keyValuePair in propertyInfos)
            {
                JsonElement? singleJsonValue = null;
                // Unwrap into separate JSON
                try
                {
                    singleJsonValue = jsonElement.GetProperty(keyValuePair.Key);                    
                }
                catch (KeyNotFoundException ex)
                {
                    logger.LogError(
                        ex,
                        "Values in jsonElement do NOT correspond with keys.",
                        keyValuePair.Key.ToString(),
                        keyValuePair.Value.ToString()
                        );
                }
                catch (InvalidOperationException ex)
                {
                    logger.LogError(
                        ex,
                        "Values in jsonElement are of a wrong kind.",
                        keyValuePair.Key.ToString(),
                        keyValuePair.Value.ToString()
                        );
                }
                catch (ArgumentNullException ex)
                {
                    logger.LogError(
                        ex,
                        "keyValuePair.Key is null.",
                        keyValuePair.Key.ToString(),
                        keyValuePair.Value.ToString()
                        );
                }

                // If we fail to acquire value, stop everything
                if (singleJsonValue == null)
                {
                    return null;
                }

                // Prepare call to GetObject method
                MethodInfo method = GetType().GetMethod("GetObject", BindingFlags.NonPublic | BindingFlags.Instance);
                MethodInfo genericMethod = null;
                // Set generic parameter type for GetObject method
                try
                {
                    genericMethod = method.MakeGenericMethod(keyValuePair.Value);
                }
                catch (ArgumentNullException ex)
                {
                    logger.LogError(ex, "Type passed in Dictionary.Value is null.", keyValuePair.Key.ToString(), keyValuePair.Value.ToString());
                }
                catch (ArgumentException ex)
                {
                    logger.LogError(ex, "Type passed in Dictionary.Value is no correct.", keyValuePair.Key.ToString(), keyValuePair.Value.ToString());
                }

                // If we fail to set correct generic Type, stop everything
                if (genericMethod == null)
                {
                    return null;
                }

                object result = null;
                // Call the method
                try
                {
                    result = genericMethod.Invoke(this, new object[] { singleJsonValue });
                }
                catch (TargetInvocationException ex)
                {
                    logger.LogError(
                        ex,
                        "Unexpected exception occurred during JSON unwrapping.",
                        keyValuePair.Key.ToString(),
                        keyValuePair.Value.ToString());
                }

                // If we fail to unwrap JSON, stop everything
                if (result == null)
                {
                    return null;
                }

                // Add returned value to result with its corresponding key
                results.Add(keyValuePair.Key, result);
            }
            return results;
        }

        /// <summary>
        /// Gets value from JsonElement into specified object
        /// </summary>
        /// <typeparam name="T">Type of the object</typeparam>
        /// <param name="element">JsonElement to fill the object with.</param>
        /// <returns>Specified object filled with data from JsonElement</returns>
        [SuppressMessage(
            "CodeQuality",
            "IDE0051:Remove unused private members",
            Justification = "Reflection - Method is used in UnwrapJsonRequest()"
            )]
        private T GetObject<T>(JsonElement element)
        {
            string json = element.GetRawText();
            return JsonSerializer.Deserialize<T>(json);
        }
    }
}
