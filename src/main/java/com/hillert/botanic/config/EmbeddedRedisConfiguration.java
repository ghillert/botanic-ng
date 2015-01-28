/*
 * Copyright 2014-2015 the original author or authors.
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
package com.hillert.botanic.config;

import java.io.File;

import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import redis.embedded.RedisServer;
import redis.embedded.util.JarUtil;

/**
 * Runs an embedded Redis instance. Taken from the Spring Session samples.
 *
 * @author Rob Winch
 * @author Gunnar Hillert
 */
//@Configuration
public class EmbeddedRedisConfiguration {

	public static final Logger LOGGER = LoggerFactory.getLogger(EmbeddedRedisConfiguration.class);

	@Autowired
	private Environment environment;

	@Bean
	public RedisServerBean redisServer() {
		return new RedisServerBean();
	}

	/**
	 * Implements BeanDefinitionRegistryPostProcessor to ensure this Bean
	 * is initialized before any other Beans. Specifically, we want to ensure
	 * that the Redis Server is started before RedisHttpSessionConfiguration
	 * attempts to enable Keyspace notifications.
	 */
	public static class RedisServerBean implements InitializingBean, DisposableBean, BeanDefinitionRegistryPostProcessor, ApplicationContextAware {
		private RedisServer redisServer;
		private Integer port;

		public RedisServerBean() {
		}

		public void afterPropertiesSet() throws Exception {

			final File serverFile;

			if (SystemUtils.IS_OS_WINDOWS) {
				serverFile = JarUtil.extractExecutableFromJar("redis-2.8.17/redis-server.exe");
			}
			else {
				serverFile = JarUtil.extractExecutableFromJar("redis-2.8.17/redis-server");
			}
			LOGGER.info("Using redis server at: {} with port {}", serverFile.getAbsolutePath(), port);
			redisServer = new RedisServer(serverFile, port); //Protocol.DEFAULT_PORT
			redisServer.start();
		}

		public void destroy() throws Exception {
			if(redisServer != null) {
				redisServer.stop();
			}
		}

		@Override
		public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {}

		@Override
		public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {}

		@Override
		public void setApplicationContext(ApplicationContext ctx) {
				this.port = ctx.getEnvironment().getRequiredProperty("redisPort", Integer.class);
		}
	}
}
