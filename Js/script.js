let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

btnBuscarFilme.onclick = async ()=>{
    if(inputBuscarFilme.value.length > 0)
    {
        let filmes = new Array();
        fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2b38f89a&s="+inputBuscarFilme.value)
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
async function detalhesFilme(id) {
    fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2b38f89a&i=" + id)
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp);
            let filme = new Filme(
                resp.imdbID,
                resp.Title,
                resp.Year,
                resp.Genre.split(","),
                resp.Runtime,
                resp.Plot,
                resp.Poster,
                resp.Director,
                resp.Actors.split(","),
                resp.Awards,
                resp.imdbRating
            );
            console.log(filme);

            let listaFilmes = document.querySelector("#lista-filmes");
            listaFilmes.innerHTML = "";
            let detalheFilmes = document.querySelector("#mostrar-filme");
            detalheFilmes.innerHTML = "";

            detalheFilmes.appendChild(filme.getCardDetalhes());
            console.log(detalheFilmes);
        });

    return false;
}

let listarFilmes = async(filmes)=>{
    let listaFilmes = document.querySelector("#lista-filmes");
    listaFilmes.innerHTML="";
    let detalheFilmes = document.querySelector("#mostrar-filme");
    
    //console.log(listaFilmes);
    if(filmes.length>0){
        filmes.forEach(async(filme)=>{
            //console.log(filme);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
            }
        });
    }
    return false;
};