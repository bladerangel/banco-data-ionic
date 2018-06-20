import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs';
import cheerio from 'cheerio';

@Injectable()
export class WebScrapingProvider {

  url = 'https://bancodata.com.br/';
  constructor(private http: HttpClient) {
    console.log('Hello WebScrapingProvider Provider');
  }

  getInformacoesIniciais() {
    return this.http.get(this.url, { responseType: 'text' })
      .map(html => {
        const informacoes = [];
        const $ = cheerio.load(html);
        $('div[class="text-center"]').each((indice, elemento) => {
          informacoes.push($(elemento).find('span').text() + ' ' + $(elemento).find('small').text());
        });
        return informacoes;
      });
  }

}
