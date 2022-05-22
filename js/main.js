const div = document.getElementById("list");
const btn = document.getElementById("botao");
const buscar = document.getElementById("buscar");
const modal = document.getElementById("div-modal")
const p = document.getElementById("p")
const animar = document.getElementById('modal')

modal.onclick = () => {
  modal.style.display = "none"
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let valor = buscar.value.toLowerCase()
  let idPoke = document.getElementById(valor)

  if (idPoke) {
    if (valor == idPoke.id) {
      p.innerText = `O ${valor.toLowerCase()} já está na sua pokédex`
      p.style.color = '#2A74BA'
      modal.style.display = 'flex'
      return
    }
  }

  if (buscar.value != "") {
    buscar.style.border = "";

    let pedido = new XMLHttpRequest();
    pedido.open("GET", `https://pokeapi.co/api/v2/pokemon/${valor}`);
    pedido.send();
    pedido.addEventListener("load", () => {
      if (pedido.status == 200) {
        let pokemon = JSON.parse(pedido.responseText);

        let nome = pokemon.name;
        let foto = pokemon.sprites.other.dream_world.front_default;
        let id = pokemon.id;
        let altura = pokemon.height;
        let tipo = pokemon.types[0].type.name;
        let peso = pokemon.weight;
        let habilidade = pokemon.abilities[0].ability.name;

        criaCard(nome, foto, id, altura, tipo, peso, habilidade);
      } else {
        p.innerText = 'Este pokémon não existe'
        p.style.color = 'red'
        modal.style.display = 'flex'
        buscar.value = '';
      }
    });
  } else buscar.style.border = "2px solid #F11828";
})

//Pegando elementos do modal de detalhes



function criaCard(nome, foto, id, altura, tipo, peso, habilidade) {

  console.log('foifoifoif')

  if (foto) {
    div.innerHTML += `
  <div onclick="criaCard('${nome}')" id="${nome.toLowerCase()}" class="card">
  <img src="${foto}" alt="">
  <div class="info">
    <span class="id-poke">#${id}</span>
    <span class="nome-poke">${nome.toUpperCase()}</span>
  </div>
   `;

    modalPokeDetails.innerHTML += `
   <div  class="modal-${nome} modal-details" >
   <section id="pokemon-details" class="animar2">
     <div class="pokemon-name">
       <p id="name">${nome.toUpperCase()}</p>
     </div>

     <figure class="pokemon-figure">
       <img class="pokemon-img" src="${foto}" alt="Imagem do Pokémon" />
     </figure>

     <div id="details">
       <div class="height-details">
         <h2>Altura</h2>
         <p id="altura">${altura}</p>
       </div>
       <div class="type-details">
         <h2>Tipo</h2>
         <p id="tipo">${tipo}</p>
       </div>
       <div class="weight-details">
         <h2>Peso</h2>
         <p id="peso">${peso}</p>
       </div>
       <div class="hability-details">
         <h2>Habilidade</h2>
         <p id="habilidade">${habilidade}</p>
       </div>
     </div>
   </section>
 </div> 
   `
    buscar.value = '';
  }

  else {
    let cartinha = document.querySelector(`.modal-${nome}`)

    modalPokeDetails.style.display = 'flex'
    cartinha.style.display = 'flex';

    return
  }
}

const modalPokeDetails = document.getElementById('modal-poke-details')


modalPokeDetails.addEventListener('click', () => {
  modalPokeDetails.style.display = "none";

})


