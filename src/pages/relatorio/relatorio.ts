import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GraficoProvider } from '../../providers/grafico/grafico';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage implements OnInit {

  relatorio;
  grafico;

  constructor(private navCtrl: NavController, private navParams: NavParams, private graficoProvider: GraficoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatorioPage');
  }

  ngOnInit() {
    this.relatorio = this.navParams.get('relatorio');
    this.graficoProvider.getLinha(this.relatorio.lucroLiquidoAnual.reverse());
  }

}
