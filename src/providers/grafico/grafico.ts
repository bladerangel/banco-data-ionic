import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Chart from 'chart.js';

@Injectable()
export class GraficoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GraficoProvider Provider');
  }


  criarGrafico(tipo, dados, opcoes) {
    return new Chart('canvas', {
      type: tipo,
      data: dados,
      options: opcoes
    });
  }

  getLinha(dados) {
    const data = {
      labels: dados.map((numero) => numero.ano),
      datasets: [{
        label: '(R$ - Milhões)',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 255)',
        data: dados.map((numero) => numero.valor),
        fill: false
      }]
    };


    const opcoes = {
      responsive: true,
      title: {
        display: true,
        text: 'Histórico do Lucro Líquido'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    };

    return this.criarGrafico('line', data, opcoes);
  }
}
