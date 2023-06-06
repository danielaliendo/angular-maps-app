import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LngLat, Map, Marker} from "mapbox-gl";

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styles: [
    `
      #map {
        width: 100vw;
        height: 100vh;
      }

      button {
        position: fixed;
        bottom: 40px;
        right: 20px;
      }

      li {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
    `
  ]
})

export class MarkersPageComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapRef?: ElementRef

  public zoom: number = 10
  public center?: LngLat
  public map?: Map
  public markers: MarkerAndColor[] = []

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

    this.readFromLocalStorage()

  }

  createMarker() {
    if (!this.map) return

    const color = '#xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({color, draggable: true})
      .setLngLat(lngLat)
      .addTo(this.map)
      .on('dragend', () => this.saveToLocalStorage())

    this.markers.push({color, marker})
    this.saveToLocalStorage()


  }

  deleteMarker(index: number) {

    this.markers[index].marker.remove()
    this.markers.splice(index, 1)

  }

  flyTo(marker: Marker) {

    this.map?.flyTo({
      zoom: 18,
      center: marker.getLngLat()
    })

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => ({
      color,
      lngLat: marker.getLngLat().toArray()
    }))
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage() {
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('plainMarkers') ?? '[]')
    console.log(plainMarkers)

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color)
    })

  }

}
