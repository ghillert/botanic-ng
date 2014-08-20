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

import java.net.URI;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.hillert.botanic.dao.GardenRepository;
import com.hillert.botanic.dao.ImageRepository;
import com.hillert.botanic.dao.PlantRepository;
import com.hillert.botanic.model.Address;
import com.hillert.botanic.model.Garden;
import com.hillert.botanic.model.Image;
import com.hillert.botanic.model.Location;
import com.hillert.botanic.model.Plant;

/**
 * @author Gunnar  Hillert
 */
@EnableAutoConfiguration
@ComponentScan
@EnableScheduling
public class MainApp extends RepositoryRestMvcConfiguration {

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
	 * Main class initializes the Spring Application Context amd populates seed
	 * data.
	 * 
	 * @param args Not used.
	 */
	public static void main(String[] args) {
		final ConfigurableApplicationContext context = SpringApplication.run(MainApp.class, args);
		
		final PlantRepository plantRepository = context.getBean(PlantRepository.class);
		final ImageRepository imageRepository = context.getBean(ImageRepository.class);
		final GardenRepository gardenRepository = context.getBean(GardenRepository.class);
		
		final Garden garden = new Garden();
		garden.setName("My Home");
		garden.setAddress(new Address("Somewhere", "30341", "Atlanta", new Location(33.909744d, -84.315390d)));
		final Garden savedGarden = gardenRepository.save(garden);
		
		final Plant plant1 = new Plant("T. fortunei", "Trachycarpus", "Chinese Windmill Palm",           new Location(33.909722d, -84.315570d), savedGarden);
		final Plant plant2 = new Plant("M. basjoo",   "Musa", "Japanese Fibre Banana",                   new Location(33.909731d, -84.315508d), savedGarden);
		final Plant plant3 = new Plant("S. minor",    "Sabal", "Dwarf Palmetto",                         new Location(33.909812d, -84.315500d), savedGarden);
		final Plant plant4 = new Plant("L. camara",   "Lantana", "Lantana",                              new Location(33.909791d, -84.315482d), savedGarden);
		final Plant plant5 = new Plant("C. esculenta var. 'Mojito'", "Colocasia", "Mojito Elephant Ear", new Location(33.909784d, -84.315438d), savedGarden);
		final Plant plant6 = new Plant("M. grahamii", "Manihot", "Hardy Tapioca",                        new Location(33.909605d, -84.315479d), savedGarden);
		final Plant plant7 = new Plant("F. carica",   "Ficus", "common fig",                             new Location(33.909428d, -84.315387d), savedGarden);
		final Plant plant8 = new Plant("P. nigra",    "Phyllostachys", "black bamboo",                   new Location(33.909295d, -84.315325d), savedGarden);
		final Plant plant9 = new Plant("R. hystrix",  "Rhapidophyllum", "Needle Palm",                   new Location(33.909246d, -84.315417d), savedGarden);
		
		final Plant savedPlant1 = plantRepository.save(plant1);
		final Plant savedPlant2 = plantRepository.save(plant2);
		final Plant savedPlant3 = plantRepository.save(plant3);
		final Plant savedPlant4 = plantRepository.save(plant4);
		final Plant savedPlant5 = plantRepository.save(plant5);
		final Plant savedPlant6 = plantRepository.save(plant6);
		final Plant savedPlant7 = plantRepository.save(plant7);
		final Plant savedPlant8 = plantRepository.save(plant8);
		final Plant savedPlant9 = plantRepository.save(plant9);
		
		imageRepository.save(new Image("Manihot grahamii.jpg", context.getResource("classpath:/demo_images/Manihot grahamii.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-2.jpg", context.getResource("classpath:/demo_images/Manihot grahamii-2.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-3.jpg", context.getResource("classpath:/demo_images/Manihot grahamii-3.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-4.jpg", context.getResource("classpath:/demo_images/Manihot grahamii-4.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-5.jpg", context.getResource("classpath:/demo_images/Manihot grahamii-5.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-6.jpg", context.getResource("classpath:/demo_images/Manihot grahamii-6.jpg"), savedPlant6));

	}

	/**
	 * Configure the {@link MultipartConfigFactory#setMaxFileSize(String)} and
	 * {@link MultipartConfigFactory#setMaxRequestSize(String)} using a value of
	 * {@code 8192KB}.
	 * 
	 * @return The created {@link MultipartConfigElement} instance
	 */
	@Bean
	MultipartConfigElement multipartConfigElement() {
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize("8192KB");
		factory.setMaxRequestSize("8192KB");
		return factory.createMultipartConfig();
	}
}
