let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

btnBuscarFilme.onclick = async ()=>{
    if(inputBuscarFilme.value.length > 0)
    {
        console.log(1)
        let filmes = new Array();
        fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2b38f89a&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp)=> resp.json())
        .then((resp)=> {
            resp.Search.forEach((item)=>{
                console.log(item);
                let filme=new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    null,
                    null,
                    null,
                    item.Poster,
                    null,
                    null,
                    null,
                    null
                );
                filmes.push(filme);

            });
            listarFilmes(filmes);
        });

    }
    return false;
};

let listarFilmes = async(filmes)=>{
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML="";

    if(filmes.length>0){
        filmes.forEach(async(filme)=>{  
          console.log(filmes);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick= ()=> {
                detalhesFilme(filme.id);
            }
        });
    }

    return false;
};

let detalhesFilme= async (id) => {
    fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2b38f89a&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        //Instanciar objetivo da Classe Filme;

        console.log(resp);
        let filme = new Filme(
        resp.imdbID,
        resp.Title,
        resp.Year,
        resp.Genre.split(","),
        resp.Runtime,
        resp.Poster,
        resp.plot,
        resp.Director,
        resp.Actor.split(","),
        resp.Awards,
        resp.imdbRating
        )
        console.log(filme);
        //Chamar método para gerar card com detalhes do filme.

        //Ocultar div#lista-filmes
    });

}
