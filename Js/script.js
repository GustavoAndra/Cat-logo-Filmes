let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let navfavoritos = document.querySelector("#nav-favoritos");

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

        document.querySelector("#btnFechar").onclick=()=>{
            document.querySelector("#lista-filmes").style.display="flex";
            document.querySelector("#mostrar-filme").innerHTML="";
            document.querySelector("#mostrar-filme").innerHTML="";
        }

        document.querySelector("#btnSalvar").onclick=()=>{

            let filmeString = localStorage.getItem('Favoritos');
            let filmes = [];
          
            if (filmeString) {
              filmes = JSON.parse(filmeString);
            }
            
            filmes.push(filme);

            localStorage.setItem('Favoritos', JSON.stringify(filmes));
        }

    });

        return false;  
    }
  

let listarFilmes = async (filmes) => {
    let listaFilmes =  document.querySelector("#lista-filme");
    listaFilmes.style.display="flex";
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

  
function listarFavoritos() {
    
    const favoritos = JSON.parse(localStorage.getItem('Favoritos'));
    const filmesFavoritos = [];

    favoritos.forEach((item) => {
      const filme = new Filme(
      item.id,
      item.titulo,
      item.ano,  
      item.genero,
      null,
      null,
      item.cartaz,
      null,
      null,
      item.classi,
      null
  );
      favoritos.push(filme);
  });

  listarFilmes(favoritos);
}


navfavoritos.onclick = () => {
listarFavoritos()
}
