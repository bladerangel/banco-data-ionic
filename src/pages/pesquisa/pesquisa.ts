import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ModalController, ToastController } from 'ionic-angular';

import { Relatorio } from '../../models/pesquisa.model';
import { WebScrapingProvider } from '../../providers/web-scraping/web-scraping';

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage implements OnInit {

  relatorioAtual: Relatorio;
  relatorios: Relatorio[] = [];
  
  constructor(private navParams: NavParams, private webScrapingProvider: WebScrapingProvider, private modalCtrl: ModalController, private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.relatorios = this.navParams.get('resultado');
    this.relatorioAtual = this.relatorios[0];
  }

  exibirRelatorio(url) {
    this.webScrapingProvider.getRelatorio(url)
      .subscribe(relatorio => this.modalCtrl.create('RelatorioPage', { relatorio }).present(),
        erro => this.toastCtrl.create({
          message: 'Relatório indisponível',
          showCloseButton: true,
          closeButtonText: 'Ok'
        }).present());
  }

}
