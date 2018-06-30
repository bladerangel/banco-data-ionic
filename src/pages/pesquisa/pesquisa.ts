import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

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
  constructor(private navParams: NavParams, private webScrapingProvider: WebScrapingProvider, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.relatorios = this.navParams.get('resultado');
    this.relatorioAtual = this.relatorios[0];
  }

  exibirRelatorio(url) {
    this.webScrapingProvider.getRelatorio(url)
      .subscribe(relatorio => this.modalCtrl.create('RelatorioPage', { relatorio }).present());
  }

}
