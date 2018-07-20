import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})
export class RequesterComponent implements OnInit {
  @Output() requested = new EventEmitter<string>();

  private options = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}) };
  private urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  form = new FormGroup({
    days: new FormControl(1,    [Validators.required, Validators.max(365), Validators.min(1)]),
    url : new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)])
  });

  private apiURL = 'http://api.damianrodriguez.es/shrtnd/shorten.php';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.apiURL);

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .append('url', this.form.get('url').value)
      .append('days', this.form.get('days').value);

    this.http.post(this.apiURL, params, this.options).toPromise()
           .then((result: string) => this.requested.emit(result['message']))
           .catch(this.handleErrorPromise);
  }

  handleErrorPromise (error: HttpResponse<string> | any) {
    console.error(error);
    return Promise.reject(error);
  }

}
