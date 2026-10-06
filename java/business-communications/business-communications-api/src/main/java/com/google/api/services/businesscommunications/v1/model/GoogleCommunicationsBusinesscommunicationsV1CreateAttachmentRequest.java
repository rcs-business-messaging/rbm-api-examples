package com.google.api.services.businesscommunications.v1.model;

/**
 * Request for creating an attachment.
 */
@SuppressWarnings("javadoc")
public final class GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest extends com.google.api.client.json.GenericJson {

  /**
   * Required. The source that triggered the attachment upload.
   */
  @com.google.api.client.util.Key
  private java.lang.String attachmentOperationSource;

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
  public GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest setAttachmentOperationSource(java.lang.String attachmentOperationSource) {
    this.attachmentOperationSource = attachmentOperationSource;
    return this;
  }

  @Override
  public GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest set(String fieldName, Object value) {
    return (GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest) super.set(fieldName, value);
  }

  @Override
  public GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest clone() {
    return (GoogleCommunicationsBusinesscommunicationsV1CreateAttachmentRequest) super.clone();
  }

}
