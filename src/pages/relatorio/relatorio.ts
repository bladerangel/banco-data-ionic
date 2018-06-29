import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { GraficoProvider } from '../../providers/grafico/grafico';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage implements OnInit {

  relatorio;
  informacoes;

  constructor(private navParams: NavParams, private graficoProvider: GraficoProvider) {
  }

  ngOnInit() {
    this.relatorio = this.navParams.get('relatorio');
    this.informacoes = Object.keys(this.relatorio.sobre.informacoes);
    this.graficoProvider.getLinha('lucroLiquidoAnual', this.relatorio.lucroLiquidoAnual.valores.reverse());
  }

}
