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
package com.hillert.botanic.model;

import javax.persistence.Embeddable;

/**
 * @author Gunnar Hillert
 */
@Embeddable
public class Address {

	private final String street;
	private final String zipCode;
	private final String city;
	private final Location location;

	protected Address() {
		this.street = null;
		this.zipCode = null;
		this.city = null;
		this.location = null;
	}

	public Address(String street, String zipCode, String city, Location location) {
		super();
		this.street = street;
		this.zipCode = zipCode;
		this.city = city;
		this.location = location;
	}

	/**
	 * @return the street
	 */
	public String getStreet() {
		return street;
	}

	/**
	 * @return the zipCode
	 */
	public String getZipCode() {
		return zipCode;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @return the location
	 */
	public Location getLocation() {
		return location;
	}
}
