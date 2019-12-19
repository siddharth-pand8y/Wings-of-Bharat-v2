import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikipediaService } from './core/wikipedia/wikipedia.service';
import { TimelineMax } from 'gsap';

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
  dropdownStatus: boolean;

  locations = [
    {
      key: 'Rajasthan',
      title: 'Keoladeo National Park',
      name: 'Keoladeo National Park',
      position: {
        lat: 27.203411,
        lng: 77.506924
      }
    },
    {
      key: 'Haryana',
      title: 'Sultanpur National Park',
      name: 'Sultanpur National Park',
      position: {
        lat: 28.468077,
        lng: 76.891794
      }
    },

    {
      key: 'Goa',
      title: 'Salim Ali Bird Sanctuary',
      name: 'Salim Ali Bird Sanctuary',
      position: {
        lat: 15.513047,
        lng: 73.870415
      }
    },

    {
      key: 'Kerela',
      title: 'Kumarakom Bird Sanctuary',
      name: 'Kumarakom Bird Sanctuary',
      position: {
        lat: 9.631233,
        lng: 76.419472
      }
    },

    {
      key: 'Tamil Nadu',
      title: 'Vedanthangal Bird Sanctuary',
      name: 'Vedanthangal Bird Sanctuary',
      position: {
        lat: 12.54546,
        lng: 79.856069
      }
    },

    {
      key: 'Orissa',
      title: 'Chilika Lake',
      name: 'Chilika Lake Bird Sanctuary',
      position: {
        lat: 19.690443,
        lng: 85.293933
      }
    },

    {
      key: 'West Bengal',
      title: 'Chintamoni Kar Bird Sanctuary',
      name: 'Chintamoni Kar Bird Sanctuary',
      position: {
        lat: 22.429317,
        lng: 88.400685
      }
    },

    {
      key: 'Gujrat',
      title: 'Kutch Bustard Sanctuary',
      name: 'Kutch Bustard Sanctuary',
      position: {
        lat: 23.183306,
        lng: 68.732907
      }
    }
  ];

  constructor(private wikipediaService: WikipediaService) {}

  ngOnInit() {
    this.listState = true;
    this.dropdownStatus = false;
    this.ListDropdownAnimation();
  }

  selectSanctuary() {
    this.showInfoBox = true;
    this.wikipediaService
      .getSanctuaryDetails(this.birdSanctuarySelection.value)
      .subscribe(data => {
        console.log(data);
      });
  }

  clickMarker(sanctuary) {
    this.birdSanctuarySelection.setValue(sanctuary);
    this.selectSanctuary();
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
    this.animation.reversed()
      ? this.animation.play()
      : this.animation.reverse();
    this.listState = !this.listState;
    this.dropdownStatus = !this.dropdownStatus;
  }
}
