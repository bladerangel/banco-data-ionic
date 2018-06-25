import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import cheerio from 'cheerio';

@Injectable()
export class WebScrapingProvider {

  url = 'https://bancodata.com.br/';

  constructor(private http: HttpClient) {
    console.log('Hello WebScrapingProvider Provider');
  }

  getInformacoesIniciais() {
    return this.http.get(this.url, { responseType: 'text' })
      .map(html => cheerio.load(html))
      .map($ => {
        return $('div[class="text-center"]')
          .map((indice, elemento) => $(elemento).find('span').text() + ' ' + $(elemento).find('small').text())
          .get();
      });
  }

  getPesquisa(nomeInstituicao) {
    return this.http.get(this.url + 'busca/?i=' + nomeInstituicao, { responseType: 'text' })
      .map(html => cheerio.load(html))
      .map($ => {
        return $('div[class="col-md-4"]').map((indice, elemento) => {
          return {
            classificacao: $(elemento).find('h4').first().text(),
            descricao: $(elemento).find('p').text(),
            instituicoes: $(elemento).find('h4 a')
              .map((indice, elemento) => {
                return {
                  nome: $(elemento).text().trim(),
                  ...$(elemento).parent().next().text().trim().split('\n')
                    .reduce((elementoAnterior, elemento, indice, array) => {
                      return {
                        tipo: array[0].trim(),
                        localizacao: array[1].trim()
                      };
                    }, {}),
                  url: $(elemento).attr('href')
                };
              }).get()
          };
        }).get();
      });
  }
}
