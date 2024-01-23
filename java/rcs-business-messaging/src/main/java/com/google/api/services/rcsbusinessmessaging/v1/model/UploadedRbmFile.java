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
 * Message containing file and thumbnail information
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
public final class UploadedRbmFile extends com.google.api.client.json.GenericJson {

  /**
   * The name of the file, returned by the RBM platform when the file was uploaded.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String fileName;

  /**
   * The name of the thumbnail, returned by the RBM platform when the thumbnail was uploaded.
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String thumbnailName;

  /**
   * The name of the file, returned by the RBM platform when the file was uploaded.
   * @return value or {@code null} for none
   */
  public java.lang.String getFileName() {
    return fileName;
  }

  /**
   * The name of the file, returned by the RBM platform when the file was uploaded.
   * @param fileName fileName or {@code null} for none
   */
  public UploadedRbmFile setFileName(java.lang.String fileName) {
    this.fileName = fileName;
    return this;
  }

  /**
   * The name of the thumbnail, returned by the RBM platform when the thumbnail was uploaded.
   * @return value or {@code null} for none
   */
  public java.lang.String getThumbnailName() {
    return thumbnailName;
  }

  /**
   * The name of the thumbnail, returned by the RBM platform when the thumbnail was uploaded.
   * @param thumbnailName thumbnailName or {@code null} for none
   */
  public UploadedRbmFile setThumbnailName(java.lang.String thumbnailName) {
    this.thumbnailName = thumbnailName;
    return this;
  }

  @Override
  public UploadedRbmFile set(String fieldName, Object value) {
    return (UploadedRbmFile) super.set(fieldName, value);
  }

  @Override
  public UploadedRbmFile clone() {
    return (UploadedRbmFile) super.clone();
  }

}
