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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.session.ExpiringSession;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

/**
 * Contains Spring Session related configuration.
 *
 * @author Gunnar Hillert
 * @since 1.0
 *
 */
@Configuration
//@EnableRedisHttpSession(maxInactiveIntervalInSeconds=9000)
class HttpSessionConfig {

//	@Autowired
//	Environment environment;
//
//	@Bean
//	public HeaderHttpSessionStrategy headerHttpSessionStrategy() {
//		return new HeaderHttpSessionStrategy();
//	}

//	@Bean
//	public JedisConnectionFactory connectionFactory() {
//		JedisConnectionFactory connectionFactory = new JedisConnectionFactory();
//		connectionFactory.setPort(environment.getProperty("redisPort", Integer.class));
//		return new JedisConnectionFactory();
//	}

	@Bean
	public RedisTemplate<String, ExpiringSession> redisTemplate(RedisConnectionFactory connectionFactory) {
		RedisTemplate<String, ExpiringSession> template = new RedisTemplate<String, ExpiringSession>();
		template.setKeySerializer(new StringRedisSerializer());
		template.setHashKeySerializer(new StringRedisSerializer());
		template.setConnectionFactory(connectionFactory);
		return template;
	}

	/**
	 * Create an instance of the {@link RedisOperationsSessionRepository}. Set
	 * {@link RedisOperationsSessionRepository#setDefaultMaxInactiveInterval(int)} to
	 * {@link 9000 seconds}.
	 *
	 * @param redisTemplate
	 * @return A RedisOperationsSessionRepository instance
	 */
	@Bean
	public RedisOperationsSessionRepository sessionRepository(RedisTemplate<String, ExpiringSession> redisTemplate) {
		RedisOperationsSessionRepository redisOperationsSessionRepository = new RedisOperationsSessionRepository(redisTemplate);
		redisOperationsSessionRepository.setDefaultMaxInactiveInterval(9000);
		return redisOperationsSessionRepository;
	}
}
