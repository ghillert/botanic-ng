import 'rxjs/add/operator/share';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Plant } from './model/plant.model';
import { PlantService } from './plant.service';

@Component({
  templateUrl: './plant.component.html',
})
export class PlantComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$: Subject<any> = new Subject();

  plants: Observable<any>;
  busy: Subscription;

  private subscription: any;

  constructor(private plantService: PlantService, private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    this.getPlants();
  }

  /**
   * Will cleanup any {@link Subscription}s to prevent
   * memory leaks.
   */
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getPlants(): void {
    this.plants = this.plantService.getPlants()
      .share()
      .pipe(takeUntil(this.ngUnsubscribe$));

    this.busy = this.plants.subscribe(
      data => {
        this.toastr.success('Plants loaded.');
      },
      error => {
        console.log(error);
        this.toastr.error(error);
      }
    );
  }

  deletePlant(plant: Plant) {
    console.log('Deleting plant with Id: ' + plant.id);
    this.busy = this.plantService.deletePlant(plant.id).subscribe(
      data => {
        this.toastr.success(`Plant ${plant.commonName} deleted`);
        this.getPlants();
      },
      error => {
        console.log(error);
        this.toastr.error(error);
      }
    );
  }

  viewPlantDetails(plant) {
    console.log(plant);
    this.router.navigate(['plants', plant.id]);
  }

  goToAddPlants() {
    this.router.navigate(['plants/add']);
  }
}
