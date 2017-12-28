import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PlantImage } from '../plant/model/plant-image.model';
import { GardenService } from './garden.service';

@Component({
  templateUrl: './garden.component.html'
})
export class GardenComponent implements OnInit {

  public images: PlantImage[] = [];

  constructor(private gardenService: GardenService, private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    this.gardenService.getLatestPlantImage().forEach(image => {
      if (image) {
        this.images.push(image);
      }
    });
  }
}
