/*
 * Copyright 2015 the original author or authors.
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

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.MapPropertySource;
import org.springframework.util.SocketUtils;

/**
 *
 * @author Gunnar Hillert
 *
 */
public class IntegrationTestApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

	@Override
	public void initialize(ConfigurableApplicationContext applicationContext) {

		final Map<String, Object> props = new HashMap<String, Object>();
		props.put("redisPort", SocketUtils.findAvailableTcpPort());

		final SpringApplication app = new SpringApplication(MainApp.class);
		app.setDefaultProperties(props);

		final MapPropertySource propertySource = new MapPropertySource("ports", props);
		applicationContext.getEnvironment().getPropertySources().addFirst(propertySource);

	}

}
