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

import javax.servlet.MultipartConfigElement;
import java.net.URI;
import java.text.DateFormat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.hillert.botanic.model.Garden;
import com.hillert.botanic.model.Image;
import com.hillert.botanic.model.Plant;
import com.hillert.botanic.service.SeedDataService;
import com.hillert.botanic.support.ISO8601DateFormatWithMilliSeconds;
import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.http.MediaType;

/**
 * @author Gunnar  Hillert
 * @author Thomas Darimont
 * @since 1.0
 */
@SpringBootApplication
public class MainApp extends RepositoryRestMvcConfiguration {

	public static final String MAXIMUM_FILE_SIZE = "8192KB";
	public static final String GZIP_COMPRESSION_MIME_TYPES =
		MediaType.APPLICATION_JSON_VALUE + "," + "application/javascript" + "," + "text/css";

	/**
	 * Sets the base URL for the REST API. Also ensure that the primary IDs of
	 * the domain classes are serialized as part of the JSON response.
	 */
	@Override
	protected void configureRepositoryRestConfiguration( RepositoryRestConfiguration config) {
		config.exposeIdsFor(Plant.class, Image.class, Garden.class);
		config.setBaseUri(URI.create("/api"));
	}

	/**
	 * Main class initializes the Spring Application Context and populates seed
	 * data using {@link SeedDataService}.
	 *
	 * @param args Not used.
	 */
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(MainApp.class, args);
		SeedDataService seedDataService = context.getBean(SeedDataService.class);
		seedDataService.populateSeedData();
	}

	/**
	 * Configure the {@link MultipartConfigFactory#setMaxFileSize(String)} and
	 * {@link MultipartConfigFactory#setMaxRequestSize(String)} using a value of
	 * {@link MainApp#MAXIMUM_FILE_SIZE}.
	 *
	 * @return The created {@link MultipartConfigElement} instance
	 */
	@Bean
	MultipartConfigElement multipartConfigElement() {
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize(MAXIMUM_FILE_SIZE);
		factory.setMaxRequestSize(MAXIMUM_FILE_SIZE);
		return factory.createMultipartConfig();
	}

	/**
	 * Configure the Jackson {@link ObjectMapper}. Use the {@link ISO8601DateFormatWithMilliSeconds}
	 * to set a custom {@link DateFormat} ensuring that JSON Data are serialized
	 * using the {@code ISO8601} format.
	 */
	@Bean
	@Primary
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = super.objectMapper();
		objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		objectMapper.setDateFormat(new ISO8601DateFormatWithMilliSeconds());
		return objectMapper;
	}

	@Bean
	public org.springframework.http.converter.json.MappingJackson2HttpMessageConverter MappingJackson2HttpMessageConverter() {
		org.springframework.http.converter.json.MappingJackson2HttpMessageConverter converter = new org.springframework.http.converter.json.MappingJackson2HttpMessageConverter();
		converter.setObjectMapper(objectMapper());
		return converter;
	}

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
							@SuppressWarnings("rawtypes")
							AbstractHttp11Protocol httpProtocol = (AbstractHttp11Protocol) connector.getProtocolHandler();
							httpProtocol.setCompression("on");
							httpProtocol.setCompressionMinSize(256);
							String mimeTypes = httpProtocol.getCompressableMimeTypes();
							String mimeTypesWithJson = mimeTypes + "," + GZIP_COMPRESSION_MIME_TYPES;
							httpProtocol.setCompressableMimeTypes(mimeTypesWithJson);
						}
					}
				);
			}
		};
	}
}
