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
package com.hillert.botanic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hillert.botanic.dao.ImageRepository;
import com.hillert.botanic.model.Image;

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
@Service
public class DefaultPictureService implements PictureService {

	private static final Logger LOGGER = LoggerFactory.getLogger(DefaultPictureService.class);

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	@Autowired
	private ImageRepository imageRepository;

	public DefaultPictureService() {
		super();
	}

	@Scheduled(fixedRate=10000)
	@Override
	public void sendRandomPicture() {

		Image image = imageRepository.findRandomImage();

		if(image == null){
			LOGGER.info("No image.");
			return;
		}

		Image imageToSend = new Image();
		imageToSend.setImage(image.getImage());
		imageToSend.setName(image.getName());
		imageToSend.setId(image.getId());
		messagingTemplate.convertAndSend("/queue/pictures", imageToSend);
	}
}
