import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(private navCtrl: NavController, private navParams: NavParams, private webScrapingProvider: WebScrapingProvider) {

  }

  ngOnInit() {
    this.relatorios = this.navParams.get('resultado');
    this.relatorioAtual = this.relatorios[0];
  }

  exibirRelatorio(url) {
    this.webScrapingProvider.getRelatorio(url)
      .subscribe(relatorio => this.navCtrl.push('RelatorioPage', { relatorio }));
  }

}
