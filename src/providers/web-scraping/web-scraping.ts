import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import cheerio from 'cheerio';

@Injectable()
export class WebScrapingProvider {

  url = 'https://bancodata.com.br';

  constructor(private http: HttpClient) {
    console.log('Hello WebScrapingProvider Provider');
  }

  getCheerio(parametros?) {
    console.log(this.url + parametros);
    return this.http.get(this.url + parametros, { responseType: 'text' })
      .map(html => cheerio.load(html));
  }

  getInformacoesIniciais() {
    return this.getCheerio('')
      .map($ => {
        return {
          numeros: $('div[class="text-center"]')
            .map((indice, elemento) => {
              return {
                quantidade: $(elemento).find('span').text(),
                tipo: $(elemento).find('small').text()
              }
            }).get(),
          sobre:
            $('footer div[class="col-sm-5 footer-col"]').map((indice, elemento) => {
              return {
                titulo: $(elemento).find('h4').text().trim(),
                descricao: $(elemento).find('p').text().trim(),
              }
            }).get().reduce((elementoAnterior, elemento, indice, array) => elemento, {})
        }
      })


  }

  getPesquisa(nomeInstituicao) {
    return this.getCheerio('/busca/?i=' + nomeInstituicao)
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

  getRelatorio(url) {
    return this.getCheerio(url)
      .map($ => {
        return {
          sobre: $('i[class="fa fa-info-circle"]').parent().map((indice, elemento) => {
            return {
              titulo: $(elemento).text().trim(),
              logotipo: $(elemento).next().find('img').attr('src'),
              informacoes: $(elemento).parent().find('tbody').find('tr').map((indice, elemento) => {
                return { [$(elemento).find('th').text().trim()]: $(elemento).find('td').text().trim() };
              }).get().reduce((elementoAnterior, elemento, indice, array) => { return Object.assign({}, ...array) }, {})
            }
          }).get().reduce((elementoAnterior, elemento, indice, array) => elemento, {}),
          lucroLiquidoAnual: $('div[id="graficoLucroLiquidoAnual"]').parent()
            .map((indice, elemento) => {
              return {
                titulo: $(elemento).parent().prev().text().trim(),
                descricao: $(elemento).prev().text().trim().split('\n').map((elemento) => elemento.trim()).join(' '),
                valores: $(elemento).next().find('tbody').find('tr')
                  .map((indice, elemento) => {
                    const el = $(elemento).find('td');
                    return {
                      ano: el.eq(0).text().trim().split('(')[0].trim(),
                      situacao: el.eq(1).text().trim(),
                      valor: el.eq(2).text().trim().split(' ')[0].replace(',', '.')
                    }
                  }).get()
              }
            }).get().reduce((elementoAnterior, elemento, indice, array) => elemento, {})
        }
      })
  }

  getSobre(url) {
    return this.getCheerio(url)
      .map($ => $('div[class="page-content"] div[class="col-md-8"]').html());
  }
}
