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

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hillert.botanic.dao.ImageRepository;
import com.hillert.botanic.dao.PlantRepository;
import com.hillert.botanic.model.Image;
import com.hillert.botanic.model.Plant;

/**
 * Explicit controller for uploading Plant images.
 *
 * @author Gunnar Hillert
 * @since 1.0
 *
 */
@Controller
@RequestMapping("/upload/plants/{plantId}")
public class UploadController {

	@Autowired
	private PlantRepository plantRepository;

	@Autowired
	private ImageRepository imageRepository;

	@RequestMapping(method=RequestMethod.GET)
	public @ResponseBody String provideUploadInfo(@PathVariable("plantId") Long plantId, HttpServletRequest request) {
		System.out.println(request.getSession().getId());
		return String.format("You can upload a file for plant with id '%s' by posting to this same URL.", plantId);
	}

	/**
	 * Handles image file uplods. Images are persistence to the database using
	 * {@link ImageRepository}.
	 *
	 * @param file Must not be null
	 * @param plantId Must not be null
	 * @return The saved {@link Image} or {@code NULL} in case of a problem.
	 */
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public Image handleFileUpload(
			@RequestParam("file") MultipartFile file, @PathVariable("plantId") Long plantId){

		if (!file.isEmpty()) {
			byte[] bytes;

			try {
				bytes = file.getBytes();
			}
			catch (IOException e) {
				throw new IllegalStateException("Error uploading file.", e);
			}

			final Plant plant = plantRepository.findOne(plantId);

			if (plant == null) {
				throw new IllegalStateException(String.format("Plant with id '%s' not found.", plantId));
			}

			final Image image = new Image();
			image.setImage(bytes);
			image.setPlant(plant);
			image.setName(file.getOriginalFilename());
			final Image savedImage = imageRepository.save(image);

			final Image imageToReturn = new Image();
			imageToReturn.setId(savedImage.getId());
			imageToReturn.setImage(savedImage.getImage());
			imageToReturn.setName(savedImage.getName());

			return imageToReturn;
		}
		else {
			return null;
		}
	}
}
