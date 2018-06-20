import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private webScrapingProvider: WebScrapingProvider) {
    webScrapingProvider.getInformacoesIniciais()
      .subscribe(resultado => {
        console.log(resultado);
      });
  }

}
