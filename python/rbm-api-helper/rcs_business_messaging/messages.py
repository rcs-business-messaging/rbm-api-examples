# Copyright 2023 Google Inc. All rights reserved.

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Defines classes for creating different types of RBM messages."""

import time
import uuid

from flask import Flask

from rcs_business_messaging import rbm_service

app = Flask(__name__)
app.config['DEBUG'] = True

CARD_ORIENTATION_HORIZONTAL = 'HORIZONTAL'
CARD_ORIENTATION_VERTICAL = 'VERTICAL'

THUMBNAIL_IMAGE_ALIGNMENT_LEFT = 'LEFT'
THUMBNAIL_IMAGE_ALIGNMENT_RIGHT = 'RIGHT'

MEDIA_HEIGHT_SHORT = 'SHORT'
MEDIA_HEIGHT_MEDIUM = 'MEDIUM'
MEDIA_HEIGHT_TALL = 'TALL'

class MessageCluster(object):
  """
  A class for creating a message cluster
  (e.g. text > rich card > file with suggestion chip list).
  """
  def __init__(self):
    """
    Constructor.
    """
    self._messages = []
    self._suggestions = []

  def append_message(self, message):
    """
    Appends a new message.

    Args:
      message (str): Message to append.

    Returns:
       A :class:`~rcs_business_messaging.messages.MessageCluster` instance.
    """
    self._messages.append(message)

    return self

  def append_suggestion_chip(self, suggestion):
    """
    Appends a suggestion chip.

    Args:
      suggestionChip (rcs_business_messaging.messages.SuggestionChip):
        suggestion chip to append.

    Returns:
       A :class:`~rcs_business_messaging.messages.MessageCluster` instance.
    """
    self._suggestions.append(suggestion)

    return self

  def send_to_msisdn(self, msisdn, timeToLive=None, expireTime=None):
    """
    Sends all the messages in the clsuter to the given MSISDN.

    Args:
      msisdn (str): MSISDN in E.164 format, e.g. '+14155555555'
      timeToLive (str): (optional) Time that an RBM message can live in
        seconds - if it is not delivered in this period then the
        developer will be notified. Format is Ns e.g. "5s". 
      expireTime (str): (optional) Time that the message should expire if 
        not delivered. Defined as a UTC timestamp i.e. "2014-10-02T15:01:23Z"
    """

    # Do nothing if there are no messages
    if not self._messages:
      return

    # Iterate through messages and prepare them to send
    for message in self._messages:
      message.prepare_to_send()

    # Iterate through messages and send them. On the last message,
    # include the suggested chip list.
    for i in range(0, len(self._messages)):
      time.sleep(.25)  # Wait .25 seconds between messages

      message = self._messages[i]

      # If it's not the last message, then just send it. Otherwise,
      # add the suggested chip list.
      if i < len(self._messages) - 1:
        resp = rbm_service.send_message_with_body(msisdn,
                                           message.get_agent_message(),
                                           str(uuid.uuid4().int) + "a",
                                           timeToLive, expireTime)
      else:
        app.logger.debug(message.get_agent_message())
        resp = rbm_service.send_message_with_body_and_suggestion_chip_list(
            msisdn,
            message.get_agent_message(),
            get_suggestion_chip_list(self._suggestions),
            str(uuid.uuid4().int) + "a",
            timeToLive, expireTime)
        return resp

class Message(object):
  """
  A class representing a message.
  """

  def get_agent_message(self):
    """
    Abstract method that returns the JSON that
    represents the message in the RBM API.

    Returns:
       A :dict: A dictionary that represents the AgentMessage
    """
    return None

  def prepare_to_send(self):
    """
    Performs any pre-preparation to send a message. For example,
    for media files, uploads the file and thumbnail to the RBM platform.

    Note: By default this method does nothing. Therefore, it
    does not need to be overridden by messages such as text messages.

    Note: This method is idempotent. There is no harm in
    calling it many times.

    Returns:
      A :class:`~rcs_business_messaging.messages.Message`
        instance that is now prepared to send.
    """
    return self

class TextMessage(Message):
  """
  A subclass of Message representing a text message.
  """

  def __init__(self, text, suggestions=None):
    """
    Constructor.

    Args:
      text (str): The text for the message.
      suggestions (list): A list of
        `~rcs_business_messaging.messages.SuggestionChip`
        objects to send along with the text in the message.
    """
    self._text = text
    self._suggestions = suggestions

  def get_agent_message(self):
    """
    Converts message into dictionary.

    Returns:
       A :dict:Dictionary representation of the message to be sent.
    """
    agent_content_message = {}
    agent_content_message['text'] = self._text

    agent_message = {}
    agent_message['contentMessage'] = agent_content_message

    if self._suggestions:
      suggestion_chips = []
      for suggestion_chip in self._suggestions:
        suggestion_chips.append(
            suggestion_chip.get_suggestion_chip_object())

      agent_message['contentMessage']['suggestions'] = suggestion_chips

    return agent_message

class FileMessage(Message):
    """
    A subclass of Message representing a file transfer message.
    """

    def __init__(self, url, thumbnail_url=None):
        """
        Constructor.

        Args:
            url (str): The publicly available URL of the file.
            thumbnail_url (Optional(str)): The publicly available
                URL of the thumbnail.
        """
        self._url = url
        self._thumbnail_url = thumbnail_url

    # Override
    def get_agent_message(self):
        """
        Converts message into dictionary representing a file message.

        Returns:
           A :dict:Dictionary representation of the message to be sent.
        """
        agent_content_message = {}
        agent_content_message['contentInfo'] = {}
        agent_content_message['contentInfo']['fileUrl'] = self._url
        agent_content_message['contentInfo']['thumbnailUrl'] = self._thumbnail_url

        agent_message = {}
        agent_message['contentMessage'] = agent_content_message

        return agent_message

class StandaloneCard(Message):
  """
  A subclass of Message representing a standalone card.
  """

  def __init__(self,
               card_orientation,
               title=None,
               description=None,
               suggestions=None,
               url=None,
               thumbnail_url=None,
               thumbnail_image_alignment=THUMBNAIL_IMAGE_ALIGNMENT_RIGHT,
               media_height=None,
               file_resource_id=None):
    """
    Constructor.

    Args:
      card_orientation (str): One of
        `~rcs_business_messaging.messages.CARD_ORIENTATION_*`
      title (Optional(str)): The title for the card.
      description (Optional(str)): The description for the card.
      suggestions (Optional(list)): List of
        `~rcs_business_messaging.messages.SuggestionChip`
      url (Optional(str)): The publicly available URL of the file.
      thumbnail_url (Optional(str)): The publicly available
        URL of the thumbnail.
      thumbnail_image_alignment (Optional(str)): Default is
        `~rcs_business_messaging.messages.THUMBNAIL_IMAGE_ALIGNMENT_RIGHT`,
        one of `~rcs_business_messaging.messages.THUMBNAIL_IMAGE_ALIGNMENT_*`
      mediaHeight (Optional(str)): One of
        `~rcs_business_messaging.messages.MEDIA_HEIGHT_*`
      file_resource_id (Optional(str)): The name of the file
        (of the form "files/<uuid>")
        if it has already been uploaded.
        If specified, url and thumbnailUrl are ignored.
    """
    self._card_orientation = card_orientation
    self._title = title
    self._description = description
    self._suggestions = suggestions
    self._url = url
    self._thumbnail_url = thumbnail_url
    self._thumbnail_image_alignment = thumbnail_image_alignment
    self._media_height = media_height
    self._file_resource_id = file_resource_id

  def get_agent_message(self):
    """
    Converts message into dictionary representing a standalone card.

    Returns:
       A :dict:Dictionary representation of the message to be sent.
    """
    card_content = {}
    if self._title:
      card_content['title'] = self._title
    if self._description:
      card_content['description'] = self._description
    if self._file_resource_id:
      media = {}
      media['fileName'] = self._file_resource_id
      media['height'] = self._media_height

      card_content['media'] = media
    if self._suggestions:
      suggestion_chips = []
      for suggestion_chip in self._suggestions:
        suggestion_chips.append(
            suggestion_chip.get_suggestion_chip_object())

      card_content['suggestions'] = suggestion_chips

    standalone_card = {}
    standalone_card['cardOrientation'] = self._card_orientation
    standalone_card['thumbnailImageAlignment'] = self._thumbnail_image_alignment
    standalone_card['cardContent'] = card_content

    rich_card = {}
    rich_card['standaloneCard'] = standalone_card

    agent_content_message = {}
    agent_content_message['richCard'] = rich_card

    agent_message = {}
    agent_message['contentMessage'] = agent_content_message

    return agent_message

  def prepare_to_send(self):
    """
    Performs the pre-preparation to send the standalone card.
    This involves uploading the file and its thumbnail to the RBM
    platform and saving the file resource identifier to be included
    in the AgentMessage JSON when sending.

    Note: This method is idempotent. There is no harm in
    calling it many times.

    Returns:
      A :class:`~rcs_business_messaging.messages.Message` that is
        now prepared to send.
    """
    if not self._file_resource_id and self._url:
      self._file_resource_id = rbm_service.upload_file(self._url, self._thumbnail_url)

    return self

class CarouselCard(Message):
  """
  A subclass of Message representing a carousel card.
  """

  def __init__(self, card_width, card_contents):
    """
    Constructor.

    Args:
      card_width (str): One of
        `~rcs_business_messaging.messages.MEDIA_HEIGHT_*`
      card_contents (list): List of
        `~rcs_business_messaging.messages.CardContent` objects.
    """
    self._card_width = card_width
    self._card_contents = card_contents

  def get_agent_message(self):
    """
    Converts message into dictionary representing a carousel card.

    Returns:
       A :dict:Dictionary representation of the message to be sent.
    """
    carousel_card = {}
    carousel_card['cardWidth'] = self._card_width

    if self._card_contents:
      card_contents_array = []
      for card_content in self._card_contents:
        card_contents_array.append(
            card_content.get_card_content_object())

      carousel_card['cardContents'] = card_contents_array

    rich_card = {}
    rich_card['carouselCard'] = carousel_card

    agent_content_message = {}
    agent_content_message['richCard'] = rich_card

    agent_message = {}
    agent_message['contentMessage'] = agent_content_message

    app.logger.info(agent_message)

    return agent_message

  def prepare_to_send(self):
    """
    Performs the pre-preparation to send the carousel card. This involves
    calling the prepare_to_send() method on each
    `~rcs_business_messaging.messages.CardContent` object.

    Note: This method is idempotent. There is no harm in
    calling it many times.

    Returns:
      A :class:`~rcs_business_messaging.messages.Message`
        that is now prepared to send.
    """
    for card_content in self._card_contents:
      card_content.prepare_to_send()

    return self

class CardContent(object):
  """
  A class representing the card content for an individual carousel element.
  """

  def __init__(self,
               title,
               description,
               image_url,
               image_height,
               suggestions):
    """
    Constructor.

    Args:
      title (str): The title of the card for the carousel item.
      description (str): The description of the card
        for the carousel item.
      image_url (str): The publicly available URL of the image file.
      image_height (str): One of
        `~rcs_business_messaging.messages.MEDIA_HEIGHT_*`
      suggestions (Optional(list)): List of
        `~rcs_business_messaging.messages.SuggestionChip`
    """
    self._title = title
    self._description = description
    self._image_url = image_url
    self._image_height = image_height
    self._suggestions = suggestions
    self._image_resource_id = None

  def get_card_content_object(self):
    """
    Converts this object into a dictionary
    representing a content card for a carousel.

    Returns:
       A :dict:Dictionary representation of the message to be sent.
    """
    card_content = {
        'title': self._title,
        'description': self._description
    }

    if self._suggestions:
      card_content['suggestions'] = get_suggestion_chip_list(self._suggestions)

    # app.logger.debug("self._image_url: " + self._image_url)

    if self._image_url:
      card_content['media'] = {
          'contentInfo': {
              'fileUrl': self._image_url,
              'forceRefresh': False
          },
          'height': self._image_height
    }

    return card_content

  def prepare_to_send(self):
    """
    Performs the pre-preparation to send the content card card.

    Note: This method is idempotent. There is no harm in
    calling it many times.

    Returns:
      A :class:`~rcs_business_messaging.messages.CardContent`
        that is now prepared to send.
    """

    return self

class SuggestionChip(object):
  """
  An abstract class representing a suggestion chip.
  """

  def get_suggestion_chip_object(self):
    """
    Returns the JSON representation of the SuggestionChip object

    Returns:
       A :dict: JSON representation of the SuggestionChip object.
    """
    return

class SuggestedReply(SuggestionChip):
  """
  A subclass of SuggestionChip representing a suggested reply.
  """

  def __init__(self, text, postback_data):
    """
    Constructor.

    Args:
      text (str): The label and what is sent back when
        the user taps the reply.
      postback_data (str): The postback data that is sent
        via callback when the user taps the reply.
    """
    self._text = text
    self._postback_data = postback_data

  @property
  def postback_data(self):
    """Property for postback data"""
    return self.postback_data

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#suggestedreply

    Returns:
       A :dict: JSON representation of the SuggestedReply object.
    """
    return {
        'reply': {
            'text': self._text,
            'postbackData': self._postback_data
        }
    }

class ViewLocationAction(SuggestionChip):
  """
  A subclass of SuggestionChip representing a ViewlocationAction
  """

  def __init__(self,
               text,
               postback_data,
               lat=None,
               lon=None,
               label=None,
               query=None,
               fallback_url=None):
    """
    Constructor.

    Either lat and lon (and optionally label) or query should be
    specified, but if query is specified then lat and lon
    and label should not be.

    Args:
      text (str): The label and what is sent back
        when the user taps the reply.
      postback_data (str): The postback data that is sent
        via callback when the user taps the reply.
      lat (Optional(str)): The latitude for the map.
      lon (Optional(str)): The longitude for the map.
      label (Optional(str)): The label for pin.
      query (Optional(str)): The search query.
      fallback_url (Optional(str)): An option URL to be used if
        this action is not supported on the client.
    """
    self._text = text
    self._postback_data = postback_data
    self._lat = lat
    self._lon = lon
    self._label = label
    self._query = query
    self._fallback_url = fallback_url

    assert (self._lat and self._lon) or self._query

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#viewlocationaction

    Returns:
       A :dict: JSON representation of the ViewLocationAction object.
    """
    view_location_action = {}
    if self._lat:
      lat_long = {}
      lat_long['latitude'] = self._lat
      lat_long['longitude'] = self._lon
      view_location_action['latLong'] = lat_long

      if self._label:
        view_location_action['label'] = self._label
    else:
      view_location_action['query'] = self._query

    return {
        'action': {
            'text': self._text,
            'postbackData': self._postback_data,
            'fallbackUrl': self._fallback_url,
            'viewLocationAction': view_location_action
        }
    }

class DialAction(SuggestionChip):
  """
  A subclass of SuggestionChip representing a DialAction
  """

  def __init__(self, text, postback_data, phone_number, fallback_url=None):
    """
    Constructor.

    Args:
      text (str): The label and what is sent back
        when the user taps the reply.
      postbackData (str): The postback data that is
        sent via callback when the user taps the reply.
      phoneNumber (str): The MSISDN in E.164 format, e.g. +12223334444.
      fallback_url (Optional(str)): An option URL to be used if
        this action is not supported on the client.
    """
    self._text = text
    self._postback_data = postback_data
    self._phone_number = phone_number
    self._fallback_url = fallback_url

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#dialaction

    Returns:
       A :dict: JSON representation of the DialAction object.
    """
    return {
        'action': {
            'text': self._text,
            'postbackData': self._postback_data,
            'fallbackUrl': self._fallback_url,
            'dialAction': {
                'phoneNumber': self._phone_number
            }
        }
    }

class CreateCalendarEventAction(SuggestionChip):
  """
  A subclass of SuggestionChip representing a CreateCalendarEventAction
  """

  def __init__(self,
               text,
               postback_data,
               start_time,
               end_time,
               title=None,
               description=None,
               fallback_url=None):
    """
    Constructor.

    Args:
      text (str): The label and what is sent back
        when the user taps the reply.
      postback_data (str): The postback data that is sent
        via callback when the user taps the reply.
      start_time (str): The start time of the event
        in RFC3339 UTC "Zulu" format, accurate
        to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z".
      end_time (str): The end time of the event
        in RFC3339 UTC "Zulu" format, accurate
        to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z".
      title (Optiona(str)): The title of the event
      description (str): The description of the event.
      fallback_url (Optional(str)): An option URL to be used if
        this action is not supported on the client.
    """
    self._text = text
    self._postback_data = postback_data
    self._start_time = start_time
    self._end_time = end_time
    self._title = title
    self._description = description
    self._fallback_url = fallback_url

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#createcalendareventaction

    Returns:
       A :dict: JSON representation of the CreateCalendarEventAction object.
    """
    create_calendar_event_action = {
        'startTime': self._start_time,
        'endTime': self._end_time
    }

    if self._title:
      create_calendar_event_action['title'] = self._title

    if self._description:
      create_calendar_event_action['description'] = self._description

    return {
        'action': {
            'text': self._text,
            'postbackData': self._postback_data,
            'fallbackUrl': self._fallback_url,
            'createCalendarEventAction': create_calendar_event_action
        }
    }

class OpenUrlAction(SuggestionChip):
  """
  A subclass of SuggestionChip representing an OpenUrlAction.
  """

  def __init__(self, text, postback_data, url):
    """
    Constructor.

    Args:
      text (str): The label and what is sent back
        when the user taps the reply.
      postback_data (str): The postback data that is
        sent via callback when the user taps the reply.
      url (str): The URL to send the user.
    """
    self._text = text
    self._postback_data = postback_data
    self._url = url

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#openurlaction

    Returns:
       A :dict: JSON representation of the OpenUrlAction object.
    """
    return {
        'action': {
            'text': self._text,
            'postbackData': self._postback_data,
            'openUrlAction': {
                'url': self._url
            }
        }
    }

class ShareLocationAction(SuggestionChip):
  """
  A subclass of SuggestionChip representing a ShareLocationAction
  """

  def __init__(self, text, postback_data, fallback_url=None):
    """
    Constructor.

    Args:
      text (str): The label and what is sent back
        when the user taps the reply.
      postback_data (str): The postback data that is
        sent via callback when the user taps the reply.
      fallback_url (Optional(str)): An option URL to be used if
        this action is not supported on the client.
    """
    self._text = text
    self._postback_data = postback_data
    self._fallback_url = fallback_url

  def get_suggestion_chip_object(self):
    """
    Overrides parent function to convert this
    object into a dictionary representation of
    https://developers.google.com/rcs-business-messaging/rest/v1/phones.agentMessages#sharelocationaction

    Returns:
       A :dict: JSON representation of the ShareLocationAction object.
    """
    return {
        'action': {
            'text': self._text,
            'postback_data': self._postback_data,
            'fallback_url': self._fallback_url,
            'shareLocationAction': {}
        }
    }

def get_suggestion_chip_list(suggestions):
  """
  Utility function to return a list of Suggestion JSONs
  (https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones.agentMessages#Suggestion)
  that corresponds to the given Suggestion objects.

  Args:
    suggestions (rcs_business_messaging.messages.SuggestionChip):
      suggestion chip to append.

  Return:
    A :list: Suggestion objects representing a suggestion chip list
      (https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones.agentMessages#Suggestion)
  """
  suggestion_json_list = []

  for suggestion in suggestions:
    suggestion_json_list.append(suggestion.get_suggestion_chip_object())

  return suggestion_json_list
