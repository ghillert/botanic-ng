/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hillert.botanic.controller.dto;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
public class AuthenticationToken {

	private String username;
	private Map<String, Boolean> roles;
	private String token;

	public AuthenticationToken() {
		super();
	}

	public AuthenticationToken(String username, Map<String, Boolean> roles, String token) {

		Map<String, Boolean> mapOfRoles = new ConcurrentHashMap<String, Boolean>();
		for (String k : roles.keySet()) {
			mapOfRoles.put(k, roles.get(k));
		}

		this.roles = mapOfRoles;
		this.token = token;
		this.username = username;
	}

	public Map<String, Boolean> getRoles() {
		return this.roles;
	}

	public String getToken() {
		return this.token;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

}