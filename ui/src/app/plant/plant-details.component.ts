import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PlantImage } from './model/plant-image.model';
import { Plant } from './model/plant.model';
import { PlantService } from './plant.service';

@Component({
  templateUrl: './plant-details.component.html',
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
})
export class PlantDetailsComponent implements OnInit {

  title = 'My first AGM project';
  public lat = 51.678418;
  public lng = 7.809007;

  private URL = '/upload/plants';
  public uploader: FileUploader;

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = true;

  dataflowVersionInfo;
  busy:  Subscription;
  websocketData;

  private subscription: any;
  public plant: Observable<Plant>;
  public images: Observable<PlantImage[]>;

  constructor(
    private plantService: PlantService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const plantId: number = params['plantId'];
      this.uploader = new FileUploader({url: this.URL + '/' + plantId});
      this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        console.log('ImageUpload:uploaded:', response);
        this.plantService.addPlantImage(new PlantImage().deserialize(response));
      };
      console.log(`Retrieving plant details for id '${plantId}'.`);
      this.plant = this.plantService.getPlantDetails(plantId).share();
      this.images = this.plantService.loadImagesForplant(plantId).share().map(plantImage => {
        return plantImage;
      });
      this.busy = this.plant.subscribe(plant => plant,
      error => {
        console.error(error);
        this.toastr.error(error);
      });
    });
  }

  goBack() {
    console.log('Back to plant page ...');
    this.router.navigate(['plants']);
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
