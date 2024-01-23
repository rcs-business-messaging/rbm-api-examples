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
 * Opens the user's default map app and selects the agent-specified location or searches around the
 * user's location given an agent-specified query.
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
public final class ViewLocationAction extends com.google.api.client.json.GenericJson {

  /**
   * (Optional) The label of the pin dropped at lat_long.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String label;

  /**
   * (Optional) The latitude and longitude of the specified location.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private LatLng latLong;

  /**
   * (Optional, only supported on Android Messages clients) Rather than specify a lat_long (and
   * optionally, a label), the agent can instead specify a query string. For default map apps that
   * support search functionality (including Google Maps), tapping this suggested action results in
   * a location search centered around the user's current location. If the query is sufficiently
   * specific, then agents can use it to select any location in the world. For instance, setting the
   * query string to "Growing Tree Bank" will show all Growing Tree Bank locations in the user's
   * vicinity. Setting the query string to "1600 Amphitheater Parkway, Mountain View, CA 94043" will
   * select that specific address, regardless of the user's location.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String query;

  /**
   * (Optional) The label of the pin dropped at lat_long.
   * @return value or {@code null} for none
   */
  public java.lang.String getLabel() {
    return label;
  }

  /**
   * (Optional) The label of the pin dropped at lat_long.
   * @param label label or {@code null} for none
   */
  public ViewLocationAction setLabel(java.lang.String label) {
    this.label = label;
    return this;
  }

  /**
   * (Optional) The latitude and longitude of the specified location.
   * @return value or {@code null} for none
   */
  public LatLng getLatLong() {
    return latLong;
  }

  /**
   * (Optional) The latitude and longitude of the specified location.
   * @param latLong latLong or {@code null} for none
   */
  public ViewLocationAction setLatLong(LatLng latLong) {
    this.latLong = latLong;
    return this;
  }

  /**
   * (Optional, only supported on Android Messages clients) Rather than specify a lat_long (and
   * optionally, a label), the agent can instead specify a query string. For default map apps that
   * support search functionality (including Google Maps), tapping this suggested action results in
   * a location search centered around the user's current location. If the query is sufficiently
   * specific, then agents can use it to select any location in the world. For instance, setting the
   * query string to "Growing Tree Bank" will show all Growing Tree Bank locations in the user's
   * vicinity. Setting the query string to "1600 Amphitheater Parkway, Mountain View, CA 94043" will
   * select that specific address, regardless of the user's location.
   * @return value or {@code null} for none
   */
  public java.lang.String getQuery() {
    return query;
  }

  /**
   * (Optional, only supported on Android Messages clients) Rather than specify a lat_long (and
   * optionally, a label), the agent can instead specify a query string. For default map apps that
   * support search functionality (including Google Maps), tapping this suggested action results in
   * a location search centered around the user's current location. If the query is sufficiently
   * specific, then agents can use it to select any location in the world. For instance, setting the
   * query string to "Growing Tree Bank" will show all Growing Tree Bank locations in the user's
   * vicinity. Setting the query string to "1600 Amphitheater Parkway, Mountain View, CA 94043" will
   * select that specific address, regardless of the user's location.
   * @param query query or {@code null} for none
   */
  public ViewLocationAction setQuery(java.lang.String query) {
    this.query = query;
    return this;
  }

  @Override
  public ViewLocationAction set(String fieldName, Object value) {
    return (ViewLocationAction) super.set(fieldName, value);
  }

  @Override
  public ViewLocationAction clone() {
    return (ViewLocationAction) super.clone();
  }

}
