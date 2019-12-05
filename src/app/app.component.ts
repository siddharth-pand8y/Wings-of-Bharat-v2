import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wings-of-bharat';

  birdSanctuarySelection = new FormControl('');
  selectSanctuary() {
    console.log(this.birdSanctuarySelection);
  }
}
