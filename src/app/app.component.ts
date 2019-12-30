import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikipediaService } from './core/wikipedia/wikipedia.service';
import { TimelineMax, TimelineLite } from 'gsap';
import SanctuaryList from './../assets/json/location.json';
import style from './../assets/json/map-style-3.json';

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
  ListItemAnimation = new TimelineLite();
  latitude: number;
  longitude: number;
  zoom: number;
  wikipediaAPIStatus: string;
  selectedSanctuary: {
    key: string;
    title: string;
    name: string;
    position: {
      lat: string;
      lng: string;
    };
  };

  public birdSanctuaryList: {
    key: string;
    title: string;
    name: string;
    position: {
      lat: string;
      lng: string;
    };
  } = SanctuaryList;

  public mapStyle: [] = style;

  apiData: any = {
    query: {
      pages: {}
    }
  };

  SanctuaryAPIData: any = [{}];

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
    console.log(marker);
    this.birdSanctuarySelection.setValue(marker.title);
    this.selectSanctuary(marker);
  }

  selectSanctuary(sanctuary) {
    this.latitude = sanctuary.position.lat;
    this.longitude = sanctuary.position.lng;
    this.zoom = 7;
    this.showInfoBox = true;
    this.selectedSanctuary = sanctuary;
    this.hideList();
    console.log(this.birdSanctuarySelection.value);
    this.wikipediaAPIStatus = 'Initiated';
    this.wikipediaService
      .getSanctuaryDetails(sanctuary.title)
      .subscribe(data => {
        this.apiData = data;
        this.SanctuaryAPIData = Object.values(this.apiData.query.pages);
        this.wikipediaAPIStatus = 'Success';
      });
  }

  ListDropdownAnimation() {
    this.animation.to(
      '#seactuaryUnorderedList',
      0.1,
      { x: '-100vw', opacity: 0, ease: 'Expo.easeInOut' },
      0
    );
  }

  collapseList() {
    this.ListDropdownAnimation();
    if (this.listState === true) {
      this.resetMap();
    }
    this.animation.reversed()
      ? this.animation.play()
      : this.animation.reverse();
    this.listState = !this.listState;
  }

  hideList() {
    // this.ListDropdownAnimation();
    this.animation.reversed()
      ? this.animation.play()
      : this.animation.reverse();
  }

  showList() {
    this.resetMap();
    this.listState = true;
    this.showInfoBox = false;
    this.animation.reversed()
      ? this.animation.play()
      : this.animation.reverse();
  }
}
