package com.google.api.services.businesscommunications.v1.model;

/**
 * An attachment resource with a unique name that an agent can use to identify the attachment.
 */
@SuppressWarnings("javadoc")
public final class GoogleCommunicationsBusinesscommunicationsV1Attachment extends com.google.api.client.json.GenericJson {

  /**
   * Output only. The unique identifier of the attachment.
   */
  @com.google.api.client.util.Key
  private java.lang.String name;

  /**
   * Optional. Display name of the attachment.
   */
  @com.google.api.client.util.Key
  private java.lang.String displayName;

  /**
   * Optional. Text description of the attachment's content.
   */
  @com.google.api.client.util.Key
  private java.lang.String description;

  /**
   * Output only. The time when the attachment was uploaded.
   */
  @com.google.api.client.util.Key
  private java.lang.String createTime;

  /**
   * Output only. The GCS URL of the attachment.
   */
  @com.google.api.client.util.Key
  private java.lang.String gcsUrl;

  /**
   * Optional. The content type of the attachment.
   */
  @com.google.api.client.util.Key
  private java.lang.String contentType;

  /**
   * Output only. Size in bytes of the attachment.
   */
  @com.google.api.client.util.Key
  @com.google.api.client.json.JsonString
  private java.lang.Long sizeBytes;

  /**
   * Required. The source that triggered the attachment upload.
   */
  @com.google.api.client.util.Key
  private java.lang.String attachmentOperationSource;

  /**
   * Output only. Error result, if any, that occurred during the attachment upload.
   */
  @com.google.api.client.util.Key
  private Status uploadError;

  /**
   * Output only. The unique identifier of the attachment.
   * @return value or {@code null} for none
   */
  public java.lang.String getName() {
    return name;
  }

  /**
   * Output only. The unique identifier of the attachment.
   * @param name name or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setName(java.lang.String name) {
    this.name = name;
    return this;
  }

  /**
   * Optional. Display name of the attachment.
   * @return value or {@code null} for none
   */
  public java.lang.String getDisplayName() {
    return displayName;
  }

  /**
   * Optional. Display name of the attachment.
   * @param displayName displayName or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setDisplayName(java.lang.String displayName) {
    this.displayName = displayName;
    return this;
  }

  /**
   * Optional. Text description of the attachment's content.
   * @return value or {@code null} for none
   */
  public java.lang.String getDescription() {
    return description;
  }

  /**
   * Optional. Text description of the attachment's content.
   * @param description description or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setDescription(java.lang.String description) {
    this.description = description;
    return this;
  }

  /**
   * Output only. The time when the attachment was uploaded.
   * @return value or {@code null} for none
   */
  public java.lang.String getCreateTime() {
    return createTime;
  }

  /**
   * Output only. The time when the attachment was uploaded.
   * @param createTime createTime or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setCreateTime(java.lang.String createTime) {
    this.createTime = createTime;
    return this;
  }

  /**
   * Output only. The GCS URL of the attachment.
   * @return value or {@code null} for none
   */
  public java.lang.String getGcsUrl() {
    return gcsUrl;
  }

  /**
   * Output only. The GCS URL of the attachment.
   * @param gcsUrl gcsUrl or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setGcsUrl(java.lang.String gcsUrl) {
    this.gcsUrl = gcsUrl;
    return this;
  }

  /**
   * Optional. The content type of the attachment.
   * @return value or {@code null} for none
   */
  public java.lang.String getContentType() {
    return contentType;
  }

  /**
   * Optional. The content type of the attachment.
   * @param contentType contentType or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setContentType(java.lang.String contentType) {
    this.contentType = contentType;
    return this;
  }

  /**
   * Output only. Size in bytes of the attachment.
   * @return value or {@code null} for none
   */
  public java.lang.Long getSizeBytes() {
    return sizeBytes;
  }

  /**
   * Output only. Size in bytes of the attachment.
   * @param sizeBytes sizeBytes or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setSizeBytes(java.lang.Long sizeBytes) {
    this.sizeBytes = sizeBytes;
    return this;
  }

  /**
   * Required. The source that triggered the attachment upload.
   * @return value or {@code null} for none
   */
  public java.lang.String getAttachmentOperationSource() {
    return attachmentOperationSource;
  }

  /**
   * Required. The source that triggered the attachment upload.
   * @param attachmentOperationSource attachmentOperationSource or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setAttachmentOperationSource(java.lang.String attachmentOperationSource) {
    this.attachmentOperationSource = attachmentOperationSource;
    return this;
  }

  /**
   * Output only. Error result, if any, that occurred during the attachment upload.
   * @return value or {@code null} for none
   */
  public Status getUploadError() {
    return uploadError;
  }

  /**
   * Output only. Error result, if any, that occurred during the attachment upload.
   * @param uploadError uploadError or {@code null} for none
   */
  @com.google.errorprone.annotations.CanIgnoreReturnValue
  public GoogleCommunicationsBusinesscommunicationsV1Attachment setUploadError(Status uploadError) {
    this.uploadError = uploadError;
    return this;
  }

  @Override
  public GoogleCommunicationsBusinesscommunicationsV1Attachment set(String fieldName, Object value) {
    return (GoogleCommunicationsBusinesscommunicationsV1Attachment) super.set(fieldName, value);
  }

  @Override
  public GoogleCommunicationsBusinesscommunicationsV1Attachment clone() {
    return (GoogleCommunicationsBusinesscommunicationsV1Attachment) super.clone();
  }

}
