import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styles: [`
    div {
      width: 100vw;
      height: 100vh;
    }
  `]
})

export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') mapRef?: ElementRef

  constructor() {
  }

  ngAfterViewInit(): void {

    if (!this.mapRef?.nativeElement) return
    const map = new Map({
      container: this.mapRef?.nativeElement, // container ID
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=isuv7z5lVm7U4p8srIAd', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}

