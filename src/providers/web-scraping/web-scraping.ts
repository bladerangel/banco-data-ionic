import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import cheerio from 'cheerio';
import { Relatorio, Instituicao } from '../../models/pesquisa.model';

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

  getPesquisa(nomeInstituicao) {
    return this.http.get(this.url + 'busca/?i=' + nomeInstituicao, { responseType: 'text' })
      .map(html => {
        const pesquisa: Relatorio[] = [];
        const $ = cheerio.load(html);
        $('div[class="col-md-4"]').each((indice, elemento) => {
          const classificacao = $(elemento).find('h4').first().text();
          const descricao = $(elemento).find('p').text();
          const instituicoes: Instituicao[] = [];
          $(elemento).find('h4 a').each((indice, elemento) => {
            const nome = $(elemento).text().trim();
            const array = $(elemento).parent().next().text().trim().split('\n');
            const tipo = array[0].trim();
            const localizacao = array[1].trim();
            const url = $(elemento).attr('href');
            instituicoes.push(new Instituicao(tipo, nome, localizacao, url));
          })
          pesquisa.push(new Relatorio(classificacao, descricao, instituicoes));
        });
        return pesquisa;
      });
  }

}
