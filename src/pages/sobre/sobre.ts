import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage implements OnInit {

  sobre;
  constructor(private webScrapingProvider: WebScrapingProvider) {
  }

  ngOnInit() {
    this.webScrapingProvider.getSobre('/sobre').subscribe(resultado => {
      this.sobre = resultado;
    });
  }

}
