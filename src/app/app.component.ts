import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
  private urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  form = new FormGroup({
    days: new FormControl(1, [Validators.required, Validators.max(365), Validators.min(1)]),
    url: new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)])
  });

  restItems: any;
  apiURL = 'http://api.damianrodriguez.es/shrtnd/shorten.php';

  constructor(private http: HttpClient) { }

  onSubmit() {
    console.log(this.apiURL);

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {
      url: this.form.get('url').value,
      days: this.form.get('days').value
    };

    this.http.post(this.apiURL, params, this.options).toPromise()
           .then(this.extractData)
           .catch(this.handleErrorPromise);
  }

  private extractData(res: HttpResponse<string>) {
      console.log(res);
  }

  private handleErrorPromise (error: HttpResponse<string> | any) {
    console.error(error);
    return Promise.reject(error);
  }
}
