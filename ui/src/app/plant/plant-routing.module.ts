import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/support/auth.guard';
import { PlantAddComponent } from './plant-add.component';
import { PlantDetailsComponent } from './plant-details.component';
import { PlantComponent } from './plant.component';

const plantRoutes: Routes = [
  {
    path: 'plants',
    children: [
      { path: '', component: PlantComponent },
      {
        path: 'add', component: PlantAddComponent,
        canActivate: [AuthGuard],
        data: {
          authenticate: true
        }
      },
      { path: ':plantId', component: PlantDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(plantRoutes)],
  exports: [RouterModule]
})
export class PlantRoutingModule {}
