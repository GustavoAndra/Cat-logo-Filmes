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
let detalhesFilme = async (id)=>{
    fetch("https://www.omdbapi.com/?apikey=2b38f89a&i="+id)
    .then((resp)=>resp.json())
    .then((resp)=>{
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
        )
        document.querySelector("#lista-filme").style.display="none";
        document.querySelector("#mostrar-filme").style.display="flex";
        console.log(filme.getCardDetalhes());
        document.querySelector("#mostrar-filme").appendChild(filme.getCardDetalhes());
    })
    return false;
}
let listarFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filme");
    listaFilmes.style.dispay="flex";
    listaFilmes.innerHTML="";
        document.querySelector("#lista-filme").innerHTML="";
        document.querySelector("#mostrar-filme").style.display="none";
       

    if (filmes.length > 0) {
      filmes.forEach(async (filme) => {
        listaFilmes.appendChild(await filme.getCard());
        filme.getBtnDetalhes().onclick=()=>{
         detalhesFilme(filme.id);
        }
      });
    }
  }