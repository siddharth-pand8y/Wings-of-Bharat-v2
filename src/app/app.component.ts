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
    const data = from(fetch(environment.wikipeadiaAPI + this.birdSanctuarySelection.value, {
      method: 'GET',
      mode: 'cors'
    }));
    data.subscribe({
      next(response) { 
        console.log(response);
        response.json().then((prayer)=> {
          console.log(Object.values(prayer.query.pages)[0])
        })
      },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });

  }
}
