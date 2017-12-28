import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { ErrorHandler } from '../shared/model/error-handler';
import { BusyService } from '../shared/services/busy.service';
import { PlantImage } from './model/plant-image.model';
import { Plant } from './model/plant.model';

@Injectable()
export class PlantService {

  private plantUrl = '/api/plants';
  public plantImages$ = new BehaviorSubject<PlantImage[]>(undefined);

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandler,
    private busyService: BusyService) {}

  getPlants(): Observable<any[]> {
    const plants$ = this.http.get(this.plantUrl).pipe(
      map(response => {
        const plants: Plant[] = [];
        for (const plantJson of (response as any)._embedded.plants) {
          plants.push(new Plant().deserialize(plantJson));
        }
        return plants;
      }),
      catchError(this.errorHandler.handleError)
    );
    this.busyService.addObservable(plants$);
    return plants$;
  }

  getPlantDetails(plantId: number): Observable<Plant> {
    return this.http.get(this.plantUrl + `/${plantId}`, ).pipe(
                    map(response => {
                      return new Plant().deserialize(response);
                    }),
                    catchError(this.errorHandler.handleError)
                  );
  }

  resetPlantImages(): void {
    return this.plantImages$.next(undefined);
  }

  getPlantImages(): Observable<PlantImage[]> {
    return this.plantImages$.asObservable();
  }

  addPlantImage(image: PlantImage) {
    const images = this.plantImages$.getValue();
    images.push(image);
    this.plantImages$.next(images);
  }

  loadImagesForplant(plantId: number): Observable<PlantImage[]> {
    this.http.get(this.plantUrl + `/${plantId}` + '/images', ).pipe(
      map(response => {
        const images: PlantImage[] = [];
        response['_embedded'].images.forEach(element => {
          images.push(new PlantImage().deserialize(element));
        });
        this.plantImages$.next(images);
        return images;
      }),
      catchError(this.errorHandler.handleError)
    ).subscribe();
    return this.plantImages$.asObservable();
  }

  deletePlant(plantId: number): Observable<void> {
    return this.http.delete(this.plantUrl + `/${plantId}`, ).pipe(
                    catchError(this.errorHandler.handleError)
                  );
  }

  addPlant(plant: Plant): Observable<void> {
    return this.http.post(this.plantUrl, plant).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
