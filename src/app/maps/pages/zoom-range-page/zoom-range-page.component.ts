import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LngLat, Map} from "mapbox-gl";

@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: [
    `
      #map {
        width: 100vw;
        height: 100vh;
      }

      .floating-range {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: inherit;
        width: 50%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      }

      .floating-content {
        display: flex;
        align-items: center;
      }
    `
  ]
})

export class ZoomRangePageComponent implements  OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapRef?: ElementRef

  public zoom: number = 10
  public center?: LngLat
  public map?: Map

  constructor() {
  }

  ngOnInit(): void {

    const localZoom = JSON.parse(localStorage.getItem('zoom') ?? 'null')

    if (localZoom) {
      this.zoom = localZoom
    }

    const localCenter = JSON.parse(localStorage.getItem('center') ?? 'null')

    this.center = localCenter ? localCenter : new LngLat(-74.5, 40)

  }

  ngAfterViewInit(): void {

    if (!this.mapRef?.nativeElement) return

    this.map = new Map({
      container: this.mapRef?.nativeElement, // ref element
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=isuv7z5lVm7U4p8srIAd', // style URL
      center: this.center,
      zoom: this.zoom,
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListeners() {
    if (!this.map) throw Error('map is not initialized')

    this.map.on('zoom', () => {

      const currentZoom = this.map!.getZoom()

      if (!currentZoom) return

      this.zoom = currentZoom
      localStorage.setItem('zoom', JSON.stringify(currentZoom))
    })

    this.map.on('zoomend', () => {

      const currentZoom = this.map!.getZoom()

      if (currentZoom < 18) return

      this.map!.zoomTo(18)

    })

    this.map.on('move', () => {
      this.center = this.map!.getCenter()
      localStorage.setItem('center', JSON.stringify(this.center))
    })

  }

  zoomIn() {
    this.map?.zoomIn()
  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string): void {

    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom)

  }

}
