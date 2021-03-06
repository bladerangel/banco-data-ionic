import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Chart from 'chart.js';
import 'Chart.Bands.js/Chart.Bands.js';

@Injectable()
export class GraficoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GraficoProvider Provider');
  }


  criarGrafico(id, tipo, dados, opcoes) {
    return new Chart(id, {
      type: tipo,
      data: dados,
      options: opcoes
    });
  }

  getLinha(id, dados) {
    const cores = dados.map((numero) => numero.valor > 0 ? '#009688' : '#f44336');
    const data = {
      labels: dados.map((numero) => numero.ano),
      datasets: [{
        label: '(R$ - Milhões)',
        lineTension: 0,
        borderColor: '#8BC34A',
        backgroundColor: '#8BC34A',
        pointBorderColor: cores,
        pointBackgroundColor: cores,
        pointRadius: 5,
        pointHoverRadius: 10,
        data: dados.map((numero) => numero.valor),
        fill: false
      }]
    };

    const opcoes = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '(R$ - Milhões)'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      },
      bands: {
        yValue: 0,
        belowThresholdColour: ['#FF5722']
      }
    };

    return this.criarGrafico(id, 'line', data, opcoes);
  }
}
