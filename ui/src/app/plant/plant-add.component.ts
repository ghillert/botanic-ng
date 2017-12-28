import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Plant } from './model/plant.model';
import { PlantService } from './plant.service';

@Component({
  templateUrl: './plant-add.component.html',
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
})
export class PlantAddComponent implements OnInit {

  plantForm: FormGroup;

  private subscription: any;
  private plant: Plant;

  constructor(
    private fb: FormBuilder,
    private plantService: PlantService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
      this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.plantForm = this.fb.group({
      genus: ['', Validators.required],
      species: '',
      commonName: '',
      location: this.fb.group({
        latitude: '',
        longitude: ''
      })
    });
  }

  submitPlant() {
    const plantToSave = this.prepareSavePlant();
    const busy = this.plantService.addPlant(plantToSave).subscribe(

    );
  }

  prepareSavePlant(): Plant {
    const formModel = this.plantForm.value;
    const savePlant: Plant = new Plant();

    savePlant.genus = formModel.genus as string;
    savePlant.species = formModel.species as string;
    savePlant.commonName = formModel.commonName as string;
    savePlant.location = formModel.location;
    return savePlant;
  }

  goBack() {
    console.log('Back to plant page ...');
    this.router.navigate(['plants']);
  }

  getMyLocation() {
    console.log('Get my location...');
    const localThis = this;
    navigator.geolocation.getCurrentPosition(data => {
      console.log('Location data retrieved', data);
      const coordinates = data.coords;
      localThis.plantForm.get('location').setValue({
        latitude: coordinates.latitude.toString(),
        longitude: coordinates.longitude.toString()
      });
    });
  }
}
