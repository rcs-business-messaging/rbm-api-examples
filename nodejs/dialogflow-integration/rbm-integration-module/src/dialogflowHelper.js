/**
 * Copyright 2023 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function parseStruct(s) {
	const res = go(s);

	return res;
}

function go(s) {
	const res = {};

	for (const p in s) {
		if (p == 'structValue') {
			return go(s.structValue);
		}
		if (p == 'fields') {
			return go(s.fields);
		}
		if (p == 'listValue') {
			return go(s.listValue);
		}
		if (p == 'stringValue') {
			return s.stringValue;
		}
		if (p == 'kind') {
			return null;
		}
		if (p == 'values') {
			const ar = [];

			for (const el of s.values) {
				ar.push(go(el));
			}
			return ar;
		}
		if (typeof s[p] != 'object') {
			res[p] = s[p];
		} else {
			res[p] = go(s[p]);
		}
	}

	return res;
}

module.exports.parseStruct = parseStruct;
