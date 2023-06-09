import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGFuaWVsYWxpZW5kbyIsImEiOiJjbGlld3dpYmcwbDd2M2ZxanlpczAxNG1sIn0.J6VHMDHxyXXxWOyYOoSj4g';


import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MiniMapComponent } from "./components/mini-map/mini-map.component";

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})

export class MapsModule { }
