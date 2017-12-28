import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { PlantImage } from '../plant/model/plant-image.model';
import { ErrorHandler } from '../shared/model/error-handler';

@Injectable()
export class GardenService {

  private aboutUrl = '/api/garden';

  public latestPlantImage$ = new BehaviorSubject<PlantImage>(undefined);

  getLatestPlantImage(): Observable<PlantImage> {
    return this.latestPlantImage$.asObservable();
  }

  constructor(private http: HttpClient, private errorHandler: ErrorHandler,
    private stompService: StompService) {

      const stomp_subscription = this.stompService.subscribe('/queue/pictures');

      stomp_subscription.map((message: Message) => {
        const pictureJson = JSON.parse(message.body);
        this.latestPlantImage$.next(pictureJson);
        return pictureJson;
      }).subscribe(pictureJson => {
        console.log(`Received image: ${pictureJson.name}`);
      });
    }
}
