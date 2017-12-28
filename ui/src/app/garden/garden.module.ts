import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GardenRoutingModule } from './garden-routing.module';
import { GardenComponent } from './garden.component';
import { GardenService } from './garden.service';

@NgModule({
  imports:      [ GardenRoutingModule, SharedModule ],
  declarations: [ GardenComponent ],
  providers:    [ GardenService ]
})
export class GardenModule { }
