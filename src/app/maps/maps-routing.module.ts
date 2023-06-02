import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from "./layouts/maps-layout/maps-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MapsRoutingModule { }
