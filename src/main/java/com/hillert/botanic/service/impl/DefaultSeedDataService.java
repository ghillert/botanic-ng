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
package com.hillert.botanic.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hillert.botanic.dao.GardenRepository;
import com.hillert.botanic.dao.ImageRepository;
import com.hillert.botanic.dao.PlantRepository;
import com.hillert.botanic.model.Address;
import com.hillert.botanic.model.Garden;
import com.hillert.botanic.model.Image;
import com.hillert.botanic.model.Location;
import com.hillert.botanic.model.Plant;
import com.hillert.botanic.service.SeedDataService;

/**
*
* @author Gunnar Hillert
* @since 1.0
*
*/
@Service
public class DefaultSeedDataService implements SeedDataService {

	@Autowired
	private PlantRepository plantRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private GardenRepository gardenRepository;

	@Autowired
	private ApplicationContext applicationContext;

	@Override
	@Transactional
	public void populateSeedData() {
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

		imageRepository.save(new Image("Manihot grahamii.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-2.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii-2.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-3.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii-3.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-4.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii-4.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-5.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii-5.jpg"), savedPlant6));
		imageRepository.save(new Image("Manihot grahamii-6.jpg", applicationContext.getResource("classpath:/demo_images/Manihot grahamii-6.jpg"), savedPlant6));
	}

}
