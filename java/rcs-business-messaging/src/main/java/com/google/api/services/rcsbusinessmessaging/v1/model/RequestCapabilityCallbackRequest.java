/*
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
/*
 * This code was generated by https://github.com/googleapis/google-api-java-client-services/
 * Modify at your own risk.
 */

package com.google.api.services.rcsbusinessmessaging.v1.model;

/**
 * Request message for RBMService.RequestCapabilityCallback method. DEPRECATED: Please use
 * GetCapabilitiesRequest instead.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the RCS Business Messaging API. For a detailed
 * explanation see:
 * <a href="https://developers.google.com/api-client-library/java/google-http-java-client/json">https://developers.google.com/api-client-library/java/google-http-java-client/json</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class RequestCapabilityCallbackRequest extends com.google.api.client.json.GenericJson {

  /**
   * The ID of the request, assigned by the agent. This must be a UUID, as defined in
   * https://tools.ietf.org/html/rfc4122. This request ID is included in the capability callback,
   * which returns asynchronously.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String requestId;

  /**
   * The ID of the request, assigned by the agent. This must be a UUID, as defined in
   * https://tools.ietf.org/html/rfc4122. This request ID is included in the capability callback,
   * which returns asynchronously.
   * @return value or {@code null} for none
   */
  public java.lang.String getRequestId() {
    return requestId;
  }

  /**
   * The ID of the request, assigned by the agent. This must be a UUID, as defined in
   * https://tools.ietf.org/html/rfc4122. This request ID is included in the capability callback,
   * which returns asynchronously.
   * @param requestId requestId or {@code null} for none
   */
  public RequestCapabilityCallbackRequest setRequestId(java.lang.String requestId) {
    this.requestId = requestId;
    return this;
  }

  @Override
  public RequestCapabilityCallbackRequest set(String fieldName, Object value) {
    return (RequestCapabilityCallbackRequest) super.set(fieldName, value);
  }

  @Override
  public RequestCapabilityCallbackRequest clone() {
    return (RequestCapabilityCallbackRequest) super.clone();
  }

}
