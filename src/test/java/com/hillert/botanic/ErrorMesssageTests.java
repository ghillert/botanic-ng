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
package com.hillert.botanic;

import java.util.Date;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hillert.botanic.controller.ErrorMessage;

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
public class ErrorMesssageTests {

	@Test
	public void testErrorMessageSerialization() throws JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();

		ErrorMessage errorMessage = new ErrorMessage(new Date(), 404, "NotFoundException", "We did not find it.");
		String json = objectMapper.writeValueAsString(errorMessage);
		System.out.print(json);
	}

}
