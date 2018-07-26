import { Component, OnInit, Input } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-responser',
  templateUrl: './responser.component.html',
  styleUrls: ['./responser.component.css']
})
export class ResponserComponent implements OnInit {
  @Input() linkURL: string;

  constructor() { }

  ngOnInit() {
    this.linkURL = 'shrtnd.damianrodriguez.es/' + this.linkURL;
  }

  copyToClipboard(element) {
      element.select();
      document.execCommand('copy');
      element.setSelectionRange(0, 0);
  }
}
