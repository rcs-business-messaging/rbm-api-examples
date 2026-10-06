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
"""CLI tool to register a phone number as a test device for the RBM Agent."""

import argparse
import logging
import sys

import constants
from rbmservice import invite

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


def main() -> None:
  """Main function to parse arguments and register the test device."""
  parser = argparse.ArgumentParser(
      description='Register a phone number as a test device for RBM.'
  )
  parser.add_argument(
      'phone_number',
      help='The phone number to register (e.g., +1234567890).'
  )
  args = parser.parse_args()

  logger.info(
      'Sending tester invite to %s for agent %s...',
      args.phone_number,
      constants.AGENT_ID
  )

  try:
    service = invite.RbmInviteService()
    service.invite_tester(args.phone_number)

    logger.info('Tester invite sent successfully. Please check your device.')
  except Exception as e:  # pylint: disable=broad-exception-caught
    logger.exception('Failed to register tester: %s', e)
    sys.exit(1)


if __name__ == '__main__':
  main()
