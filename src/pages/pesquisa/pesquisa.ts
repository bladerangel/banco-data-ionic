import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  constructor(private navCtrl: NavController, private navParams: NavParams, private webScrapingProvider: WebScrapingProvider, private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.relatorios = this.navParams.get('resultado');
    this.relatorioAtual = this.relatorios[0];
  }

  exibirRelatorio(url) {
    this.loadingCtrl.create({
      content: "Carregando Relatório...",
      dismissOnPageChange: true
    }).present();
    this.webScrapingProvider.getRelatorio(url)
      .subscribe(relatorio => this.navCtrl.push('RelatorioPage', { relatorio }));
  }

}
