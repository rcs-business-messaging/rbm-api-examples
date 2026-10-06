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
"""Main Flask application for RBM Wallet Integration."""

import json
import os
import urllib.parse

from flask import Flask, redirect, render_template, request, send_file
from google.auth import jwt
from google.auth.crypt import RSASigner

from rbmservice.message import RbmMessageService

app = Flask(__name__)

# Constants
BASE_DIR = os.path.dirname(__file__)
SA_FILE = os.path.join(BASE_DIR, 'resources', 'rbm-service-account.json')
PKPASS_FILE = os.path.join(BASE_DIR, 'resources', 'event_entrance.pkpass')


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    """Kicks off the RBM flow by sending a demo rich card."""
    success_msg = None
    error_msg = None
    
    if request.method == 'POST':
        phone_number = request.form.get('phone_number')
        if phone_number:
            try:
                service = RbmMessageService()
                service.send_wallet_demo_card(
                    phone_number, request.host_url.rstrip('/')
                )
                success_msg = f"Demo card sent successfully to {phone_number}!"
            except Exception as e:
                error_msg = f"Error sending message: {e}"
        else:
            error_msg = "Phone number is required"

    return render_template(
        'index.html',
        success_msg=success_msg,
        error_msg=error_msg
    )


@app.route('/add-to-wallet', methods=['GET'])
def add_to_wallet():
    """Routes the user to Google Wallet or Apple Wallet based on device."""
    user_agent = request.headers.get('User-Agent', '').lower()
    
    # Check for forced bypass (useful for testing on desktop)
    force = request.args.get('force', '')

    if force == 'android' or 'android' in user_agent:
        # Route 1: Android -> Google Wallet JWT
        from constants import DEFAULT_WALLET_LINK_ANDROID
        wallet_link_android = os.environ.get('WALLET_LINK_ANDROID', DEFAULT_WALLET_LINK_ANDROID)
        if not wallet_link_android:
            raise ValueError(
                "The WALLET_LINK_ANDROID env variable was not set and no default exists!"
            )
        return redirect(wallet_link_android, code=302)

    elif force == 'apple' or any(os_kw in user_agent for os_kw in ['iphone', 'ipad', 'macintosh']):
        # Route 2: iOS/Mac -> Apple Wallet .pkpass
        if os.path.exists(PKPASS_FILE):
            return send_file(
                PKPASS_FILE,
                mimetype='application/vnd.apple.pkpass',
                as_attachment=True,
                download_name='pass.pkpass'
            )
        else:
            return "Apple Pass file not found on server.", 404

    else:
        # Route 3: Fallback for Desktop / Unknown
        return render_template('fallback.html')
