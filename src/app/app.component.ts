import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wings-of-bharat';

  birdSanctuarySelection = new FormControl('');
  showInfoBox: boolean;

  selectSanctuary() {

    console.log(this.birdSanctuarySelection.value);
    this.showInfoBox = true;


  }
}
