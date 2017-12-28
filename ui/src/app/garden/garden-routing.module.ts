import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GardenComponent } from './garden.component';

const gardenRoutes: Routes = [
  {
    path: 'garden',
    children: [
      { path: '', component: GardenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gardenRoutes)],
  exports: [RouterModule]
})
export class GardenRoutingModule {}
