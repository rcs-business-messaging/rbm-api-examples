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
"""Service for sending RBM messages."""

import uuid
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

import constants


class RbmMessageService:
  """Service to handle sending RBM messages."""

  def __init__(self):
    """Initializes the RBM API client."""
    scopes = [
        'https://www.googleapis.com/auth/rcsbusinessmessaging'
    ]
    self.credentials = service_account.Credentials.from_service_account_file(
        'resources/rbm-service-account.json', scopes=scopes
    )
    self.session = AuthorizedSession(self.credentials)

  def send_wallet_demo_card(self, phone_number: str, base_url: str) -> None:
    """Sends a rich card to the user with a wallet routing URL.

    Args:
        phone_number: The MSISDN to send the message to (e.g., '+1234567890').
        base_url: The base URL of the application.
    """
    import urllib.parse
    encoded_phone = urllib.parse.quote(phone_number)
    url = (
        'https://us-rcsbusinessmessaging.googleapis.com/v1/'
        f'phones/{encoded_phone}/agentMessages'
    )
    
    wallet_url = f"{base_url}/add-to-wallet"
    
    payload = {
        'contentMessage': {
            'richCard': {
                'standaloneCard': {
                    'cardOrientation': 'VERTICAL',
                    'cardContent': {
                        'title': 'Awesome Event: VIP Entrance',
                        'description': 'Your VIP - Tier 1 access pass.',
                        'suggestions': [
                            {
                                'action': {
                                    'text': 'Save to Wallet',
                                    'postbackData': 'save_to_wallet',
                                    'openUrlAction': {
                                        'url': wallet_url
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
    
    params = {
        'messageId': str(uuid.uuid4()),
        'agentId': constants.AGENT_ID
    }
    
    response = self.session.post(url, json=payload, params=params)
    
    if not response.ok:
      raise Exception(f'API Error {response.status_code}: {response.text}')
