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

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
/**
 * Explicit controller for uploading Plant images.
 *
 * @author Gunnar Hillert
 * @since 1.0
 *
 */
@ControllerAdvice
public class BotanicControllerAdvice {

	@ExceptionHandler(value = Exception.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorMessage errorResponse(Exception e) {
		return new ErrorMessage(new Date(), HttpStatus.BAD_REQUEST.value(), e.getClass().getName(), e.getMessage());
	}

	@ExceptionHandler(value = AuthenticationException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public ErrorMessage handleAuthenticationException(Exception e) {
		return new ErrorMessage(new Date(), HttpStatus.FORBIDDEN.value(), e.getClass().getName(), e.getMessage());
	}
}
