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
package com.hillert.botanic.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
@DirtiesContext
public class AuthenticationControllerTests extends BaseControllerTests {

	@Test
	public void testAuthenticateSuccessfully() throws Exception {
		mockMvc.perform(post("/authenticate")
			.content("{ \"username\": \"admin\", \"password\": \"admin\" }".getBytes())
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.username", Matchers.is("admin")))
			.andExpect(jsonPath("$.roles['ROLE_USER']", Matchers.is(true)))
			.andExpect(jsonPath("$.roles['ROLE_ADMIN']", Matchers.is(true)))
			.andExpect(jsonPath("$.token", Matchers.not(Matchers.isEmptyOrNullString())));
	}

	@Test
	public void testAuthenticateUnSuccessfully() throws Exception {
		mockMvc.perform(post("/authenticate")
			.content("{ \"username\": \"wrong\", \"password\": \"password\" }".getBytes())
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isForbidden())
			.andExpect(jsonPath("$.status", Matchers.is(HttpStatus.FORBIDDEN.value())));
	}

}
