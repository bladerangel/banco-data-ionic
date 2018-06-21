export class Relatorio {
    constructor(
        public tipo: string,
        public descricao: string,
        public instituicao: Instituicao[]) { }
}

export class Instituicao {
    constructor(
        public tipo: string,
        public nome: string,
        public localizacao: string,
        public url: string) { }
}