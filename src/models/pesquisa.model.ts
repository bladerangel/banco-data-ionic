export class Relatorio {
    constructor(
        public classificacao: string,
        public descricao: string,
        public instituicoes: Instituicao[]) { }
}

export class Instituicao {
    constructor(
        public tipo: string,
        public nome: string,
        public localizacao: string,
        public url: string) { }
}