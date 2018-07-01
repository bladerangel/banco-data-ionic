import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';

import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage implements OnInit {

  instituicao: string = 'modal';
  informacoes;

  constructor(private navCtrl: NavController, private webScrapingProvider: WebScrapingProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.webScrapingProvider.getInformacoesIniciais().subscribe(resultado => {
      this.informacoes = resultado;
    });

  }

  pesquisar() {
    const carregamento = this.loadingCtrl.create({
      content: "Pesquisando...",
      dismissOnPageChange: true
    });
    carregamento.present();
    this.webScrapingProvider.getPesquisa(this.instituicao)
      .subscribe(resultado => this.navCtrl.push('PesquisaPage', { resultado }),
        erro => {
          this.toastCtrl.create({
            message: 'Instituição não foi encontrada',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
          carregamento.dismiss();
        });
  }
}
