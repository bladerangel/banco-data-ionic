import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  instituicao: string = 'modal';

  constructor(private navCtrl: NavController, private webScrapingProvider: WebScrapingProvider, private loadingCtrl: LoadingController) {
  }
  
  pesquisar() {
    this.loadingCtrl.create({
      content: "Pesquisando...",
      dismissOnPageChange: true
    }).present();
    this.webScrapingProvider.getPesquisa(this.instituicao)
      .subscribe(resultado => {
        this.navCtrl.push('PesquisaPage', { resultado });
      });
  }
}
