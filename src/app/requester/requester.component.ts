import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})
export class RequesterComponent implements OnInit {
  requested: boolean;
  @Output() responseEvent = new EventEmitter<boolean>();

  private options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
  private urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  form = new FormGroup({
    days: new FormControl(1,    [Validators.required, Validators.max(365), Validators.min(1)]),
    url : new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)])
  });

  restItems: any;
  apiURL = 'http://api.damianrodriguez.es/shrtnd/shorten.php';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

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

  extractData(res: HttpResponse<string>) {
    if (res['errors'].length === 0 && res['value'] !== '') {
      this.sendResponse(true);
    }
  }

  handleErrorPromise (error: HttpResponse<string> | any) {
    console.error(error);
    return Promise.reject(error);
  }

  sendResponse(requested: boolean) {
    this.responseEvent.emit(requested);
  }

}
