class Filme{
    constructor(id, titulo, direcao, atores, sino, ano, classi, genero, duracao, cartaz, ranking)
    {
        this.id=id;
        this.titulo = titulo;
        this.direcao = direcao;
        this.atores = atores;
        this.sino = sino;
        this.ano = ano;
        this.classi = classi;
        this.genero = genero;
        this.duracao = duracao;
        this.cartaz = cartaz;
        this.ranking = ranking;
    }
}

getCard = async() =>{
    let card = document.createElement("div");
    card.setAttribute("class","card");
    let imgCartaz = document.createElement("img");
    imgCartaz.setAttribute("class","card-img-topz");
    imgCartaz.setAttribute("src",this.cartaz);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    let hCardTitle=document.createElement("h5");
    hCardTitle.setAttribute("class","card-title");
    let divDetalhes = document.createElement("div");
    divDetalhes.setAttribute("style","display:flex; justify-content:space-aroud;");
    let divGenero=document.createElement("div");
    divGenero.setAttribute("style","flex-grow:1;");
    let divAnoProducao=document.createElement("div");
    divAnoProducao.setAttribute("style","flex-grow:1;");
    let divClassificacao=document.createElement("div");
    divClassificacao.setAttribute("style","flex-grow:1;");
    hCardTitle.appendChild(document.createTextNode(this.titulo));
    divGenero.appendChild(document.createTextNode(this.genero));
    divAnoProducao.appendChild(document.createTextNode(this.ano));
    divClassificacao.appendChild(document.createTextNode(this.classi));
    divDetalhes.appendChild(divGenero);
    divDetalhes.appendChild(divAnoProducao);
    divDetalhes.appendChild(divClassificacao);
    card.appendChild(imgCartaz);
    card.appendChild(cardBody);
    cardBody.appendChild(hCardTitle);
    cardBody.appendChild(divDetalhes);
    return card;
}

// Criar uma instância da classe Filme
let meuFilme = new Filme("id_do_filme", "Título do Filme", "Direção do Filme", "Atores do Filme", "Sino do Filme", "Ano do Filme", "Classificação do Filme", "Gênero do Filme", "Duração do Filme", "URL do Cartaz do Filme", "Ranking do Filme");

// Chamar o método getCard para obter um elemento HTML para exibir o filme
let meuCard = await meuFilme.getCard();

// Adicionar o elemento HTML à página ou a outro elemento da página
let minhaListaDeFilmes = document.querySelector("#lista-de-filmes");
minhaListaDeFilmes.appendChild(meuCard);