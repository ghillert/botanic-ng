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
package com.hillert.botanic.dao;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hillert.botanic.IntegrationTestApplicationContextInitializer;
import com.hillert.botanic.MainApp;
import com.hillert.botanic.model.Location;
import com.hillert.botanic.model.Plant;

/**
 * @author Gunnar Hillert
 * @since 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(
	initializers=IntegrationTestApplicationContextInitializer.class,
	classes = MainApp.class)
@WebIntegrationTest
public class PlantRepositoryIntegrationTest {

	@Autowired PlantRepository repository;

	@Test
	public void testThatPlantIsPersisted() {

		Plant plant = new Plant();
		plant.setCommonName("");
		plant.setGenus("Trachycarpus");
		plant.setSpecies("T. fortunei");
		plant.setLocation(new Location(55.349451, -131.673817));

		Plant savedPlant = repository.save(plant);

		assertThat(repository.findOne(savedPlant.getId()).getId(), is(plant.getId()));
	}
}
