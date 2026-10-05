# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Service for sending RBM tester invites."""

from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

import constants


class RbmInviteService:
  """Service to handle RBM tester invitations."""

  def __init__(self):
    """Initializes the RBM API client."""
    scopes = [
        'https://www.googleapis.com/auth/businesscommunications',
        'https://www.googleapis.com/auth/rcsbusinessmessaging'
    ]
    self.credentials = service_account.Credentials.from_service_account_file(
        'resources/rbm-service-account.json', scopes=scopes
    )
    self.session = AuthorizedSession(self.credentials)

  def invite_tester(self, phone_number: str) -> None:
    """Invites a phone number to be a tester for the agent.

    Args:
        phone_number: The MSISDN to invite (e.g., '+1234567890').
    """
    url = 'https://businesscommunications.googleapis.com/v1/testers'
    
    payload = {
        'phoneNumber': phone_number,
        'agentId': constants.AGENT_ID
    }
    
    response = self.session.post(url, json=payload)
    
    if not response.ok:
      raise Exception(f'API Error {response.status_code}: {response.text}')

  def create_tester(self, phone_number: str) -> None:
    """Alias for invite_tester to maintain compatibility."""
    self.invite_tester(phone_number)
