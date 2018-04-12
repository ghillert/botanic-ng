/*
 * Copyright 2014-2018 the original author or authors.
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

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.hillert.botanic.model.Garden;
import com.hillert.botanic.model.Image;
import com.hillert.botanic.model.Plant;
import com.hillert.botanic.service.SeedDataService;
import com.hillert.botanic.support.ISO8601DateFormatWithMilliSeconds;

/**
 *
 *
 * @author Gunnar  Hillert
 * @since 1.0
 */
@SpringBootApplication
public class MainApp {

	public static final String GZIP_COMPRESSION_MIME_TYPES =
		MediaType.APPLICATION_JSON_VALUE + "," + "application/javascript" + "," + "text/css";

	@Bean
	public RepositoryRestConfigurer repositoryRestConfigurer() {
		return new RepositoryRestConfigurerAdapter() {
			@Override
			public void configureRepositoryRestConfiguration(
								RepositoryRestConfiguration config) {
				config.exposeIdsFor(Plant.class, Image.class, Garden.class);
				config.setBasePath("/api");
			}
		};
	}

	/**
	 * Main class initializes the Spring Application Context and populates seed
	 * data using {@link SeedDataService}.
	 *
	 * @param args Not used.
	 */
	public static void main(String[] args) {
		final ConfigurableApplicationContext context = SpringApplication.run(MainApp.class, args);
		final SeedDataService seedDataService = context.getBean(SeedDataService.class);
		seedDataService.populateSeedData();
	}

	@Bean
	public Jackson2ObjectMapperBuilderCustomizer addCustomBigDecimalDeserialization() {
		return new Jackson2ObjectMapperBuilderCustomizer() {

			@Override
			public void customize(Jackson2ObjectMapperBuilder jacksonObjectMapperBuilder) {
				jacksonObjectMapperBuilder.dateFormat(new ISO8601DateFormatWithMilliSeconds());
			}

		};
	}

}
