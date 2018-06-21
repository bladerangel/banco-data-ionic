import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  instituicao: string = 'modal';

  constructor(public navCtrl: NavController, public navParams: NavParams, private webScrapingProvider: WebScrapingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  pesquisar() {
    this.webScrapingProvider.getPesquisa(this.instituicao)
      .subscribe(resultado => {
          console.log(resultado);
      });
  }
}
