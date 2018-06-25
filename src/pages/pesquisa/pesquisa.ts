import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Relatorio } from '../../models/pesquisa.model';

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage implements OnInit {

  relatorioAtual: Relatorio;
  relatorios: Relatorio[] = [];
  constructor(private navCtrl: NavController, private navParams: NavParams) {

  }

  ngOnInit() {
    this.relatorios = this.navParams.get('resultado');
    this.relatorioAtual = this.relatorios[0];
  }

}
