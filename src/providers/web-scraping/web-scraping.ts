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

  getPesquisa(instituicao) {
    return this.http.get(this.url + 'busca/?i=' + instituicao, { responseType: 'text' })
      .map(html => {
        const pesquisa = [];
        const $ = cheerio.load(html);
        $('div[class="col-md-4"]').each((indice, elemento) => {
          pesquisa.push($(elemento).find('h4').first().text());
          $(elemento).find('h4 a').each((indice, elemento) => {
            pesquisa.push($(elemento).text().trim());
            $(elemento).parent().next().text().trim().split('\n').forEach((elemento, indice, array) => {
              pesquisa.push(elemento.trim());
            });
            pesquisa.push($(elemento).attr('href'));
          })
        });
        return pesquisa;
      });
  }

}
