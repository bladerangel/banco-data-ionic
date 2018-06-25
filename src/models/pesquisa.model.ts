export interface Relatorio {
    classificacao: string;
    descricao: string;
    instituicoes: Instituicao[];
}

export interface Instituicao {
    tipo: string;
    nome: string;
    localizacao: string;
    url: string;
}