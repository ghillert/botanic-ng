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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import com.hillert.botanic.controller.dto.AuthenticationRequest;
import com.hillert.botanic.controller.dto.AuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller generates the {@link AuthenticationToken} that must be present
 * in subsequent REST invocations.
 *
 * @author Gunnar Hillert
 * @since 1.0
 *
 */
@RestController
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;
	private final UserDetailsService userDetailsService;

	@Autowired
	public AuthenticationController(AuthenticationManager am, UserDetailsService userDetailsService) {
		this.authenticationManager = am;
		this.userDetailsService = userDetailsService;
	}

	@RequestMapping(value = "/authenticate", method = { RequestMethod.POST })
	public AuthenticationToken authorize(
			@RequestBody AuthenticationRequest authenticationRequest,
			HttpServletRequest request) {

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUsername(), authenticationRequest.getPassword());
		Authentication authentication = this.authenticationManager.authenticate(token);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		HttpSession session = request.getSession(true);
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

		UserDetails details = this.userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final Map<String, Boolean> roles = new HashMap<String, Boolean>();

		for (GrantedAuthority authority : details.getAuthorities()) {
			roles.put(authority.toString(), Boolean.TRUE);
		}

		return new AuthenticationToken(details.getUsername(), roles, session.getId());
	}
}
