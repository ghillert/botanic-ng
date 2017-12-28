import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { PlantAddComponent } from './plant-add.component';
import { PlantDetailsComponent } from './plant-details.component';
import { PlantRoutingModule } from './plant-routing.module';
import { PlantComponent } from './plant.component';
import { PlantService } from './plant.service';

AgmCoreModule.forRoot({
  apiKey: 'AIzaSyA4LpKiKod5ATf-RtGybaMhZZ-0RW266RI',
  libraries: ['places']
});

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4LpKiKod5ATf-RtGybaMhZZ-0RW266RI',
      libraries: ['places']
  }) , PlantRoutingModule, SharedModule, FileUploadModule, HttpClientModule, AuthModule ],
  declarations: [ PlantComponent, PlantDetailsComponent, PlantAddComponent ],
  providers:    [ PlantService ]
})
export class PlantModule { }
