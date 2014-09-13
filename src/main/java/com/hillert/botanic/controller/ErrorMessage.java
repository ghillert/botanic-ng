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

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
public class ErrorMessage {

	private final Date timestamp;
	private final int status;
	private final String exception;
	private final String message;

	public ErrorMessage(Date timestamp, int status, String exception,
			String message) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.exception = exception;
		this.message = message;
	}

	/**
	 * @return the timestamp
	 */
	public Date getTimestamp() {
		return timestamp;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @return the exception
	 */
	public String getException() {
		return exception;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

}
