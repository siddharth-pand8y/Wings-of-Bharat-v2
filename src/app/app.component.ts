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

  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.listState = true;
    this.dropdownStatus = false;
    this.ListDropdownAnimation();
  }

  selectSanctuary() {
    this.showInfoBox = true;
    this.wikipediaService.getSanctuaryDetails(this.birdSanctuarySelection.value).subscribe((data) => {
      console.log(data);
    });
  }

  ListDropdownAnimation() {
    this.animation.to('.sactuary-list-item', .5, { x: '-100vw', ease: 'Expo.easeInOut' }, 0);
  }

  collapseList() {
    this.animation.reversed() ? this.animation.play() : this.animation.reverse();
    this.listState = !this.listState;
    this.dropdownStatus = !this.dropdownStatus;
  }
}