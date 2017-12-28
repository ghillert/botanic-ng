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

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hillert.botanic.controller.dto.AuthenticationRequest;
import com.hillert.botanic.controller.dto.AuthenticationToken;

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

	@RequestMapping("/api/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void logout(HttpSession session) {
		session.invalidate();
	}

	@RequestMapping(value = "/api/info", method = { RequestMethod.GET })
	public AuthenticationToken info() {

		final String username = SecurityContextHolder.getContext().getAuthentication().getName();
		final UserDetails details = this.userDetailsService.loadUserByUsername(username);

		final List<String> roles = new ArrayList<>();

		for (GrantedAuthority authority : details.getAuthorities()) {
			roles.add(authority.toString());
		}

		return new AuthenticationToken(details.getUsername(), roles);
	}

	@RequestMapping(value = "/api/authenticate", method = { RequestMethod.POST })
	public AuthenticationToken authorize(
			@RequestBody AuthenticationRequest authenticationRequest,
			HttpServletRequest request) {

		final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUsername(), authenticationRequest.getPassword());
		final Authentication authentication = this.authenticationManager.authenticate(token);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final HttpSession session = request.getSession(true);
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

		final UserDetails details = this.userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final List<String> roles = new ArrayList<>();

		for (GrantedAuthority authority : details.getAuthorities()) {
			roles.add(authority.toString());
		}

		return new AuthenticationToken(details.getUsername(), roles);
	}
}
