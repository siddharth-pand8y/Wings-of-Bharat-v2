import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikipediaService } from './core/wikipedia/wikipedia.service';
import { TimelineMax } from 'gsap';
import SanctuaryList from './../assets/json/location.json';
import style from './../assets/json/map-style.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wings-of-bharat';
  birdSanctuarySelection = new FormControl('');
  showInfoBox: boolean;
  listState: boolean;
  sactuaryDetail = {};
  animation = new TimelineMax({ paused: true, reversed: true });
  latitude: number;
  longitude: number;
  zoom: number;

  public birdSanctuaryList: {
    key: string,
    title: string,
    name: string,
    position: {
      lat: string,
      lng: string
    }
  } = SanctuaryList;

  public mapStyle: [] = style;

  constructor(private wikipediaService: WikipediaService) {}

  ngOnInit() {
    this.listState = true;
    this.ListDropdownAnimation();
    this.resetMap();
  }

  resetMap() {
    this.latitude = 20.593684;
    this.longitude = 78.96288;
    this.zoom = 4;
  }

  clickMarker(marker) {
    this.birdSanctuarySelection.setValue(marker.title);
    this.selectSanctuary(marker);
  }

  selectSanctuary(sanctuary) {
    this.latitude = sanctuary.position.lat;
    this.longitude = sanctuary.position.lng;
    this.zoom = 7;
    this.showInfoBox = true;
    this.wikipediaService
      .getSanctuaryDetails(this.birdSanctuarySelection.value)
      .subscribe(data => {
        console.log(data);
      });
  }


  ListDropdownAnimation() {
    this.animation.to(
      '.sactuary-list-item',
      0.5,
      { x: '-100vw', ease: 'Expo.easeInOut' },
      0
    );
  }

  collapseList() {
    this.resetMap();
    this.animation.reversed()
      ? this.animation.play()
      : this.animation.reverse();
    this.listState = !this.listState;
  }
}
