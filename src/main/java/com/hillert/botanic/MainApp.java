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

import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
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
@EnableAutoConfiguration
@ComponentScan
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

//	@Bean
//	public org.springframework.http.converter.json.MappingJackson2HttpMessageConverter MappingJackson2HttpMessageConverter() {
//		org.springframework.http.converter.json.MappingJackson2HttpMessageConverter converter = new org.springframework.http.converter.json.MappingJackson2HttpMessageConverter();
//		converter.setObjectMapper(objectMapper());
//		return converter;
//	}

	/**
	 * Customize the embedded Tomcat container to enable GZIP compression for the
	 * mime-types defined in {@link #GZIP_COMPRESSION_MIME_TYPES}.
	 *
	 * @return EmbeddedServletContainerCustomizer instance
	 */
	@Bean
	public EmbeddedServletContainerCustomizer servletContainerCustomizer() {
		return new EmbeddedServletContainerCustomizer() {
			@Override
			public void customize(ConfigurableEmbeddedServletContainer servletContainer) {
				((TomcatEmbeddedServletContainerFactory) servletContainer).addConnectorCustomizers(
					new TomcatConnectorCustomizer() {
						@Override
						public void customize(Connector connector) {
//							@SuppressWarnings("rawtypes")
//							AbstractHttp11Protocol httpProtocol = (AbstractHttp11Protocol) connector.getProtocolHandler();
//							httpProtocol.setCompression("on");
//							httpProtocol.setCompressionMinSize(256);
//							String mimeTypes = httpProtocol.getCompressableMimeTypes();
//							String mimeTypesWithJson = mimeTypes + "," + GZIP_COMPRESSION_MIME_TYPES;
//							httpProtocol.setCompressableMimeTypes(mimeTypesWithJson);
						}
					}
				);
			}
		};
	}
}
