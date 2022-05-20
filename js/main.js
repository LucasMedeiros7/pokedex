const div = document.getElementById("list");
const btn = document.getElementById("botao");
const buscar = document.getElementById("buscar");
const modal = document.getElementById("div-modal")
const p = document.getElementById("p")

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
        
        criaCard(foto, nome, id);
      } else {
        p.innerText = 'Este pokémon não existe'
        modal.style.display = 'flex'
        buscar.value = '';
      }
    });
  } else buscar.style.border = "2px solid #F11828";
})

function criaCard(foto, nome, id) {

  div.innerHTML += `
  <div id="${nome.toLowerCase()}" class="card">
  <img src="${foto}" alt="">
  <div class="info">
    <span class="id-poke">#${id}</span>
    <span class="nome-poke">${nome.toUpperCase()}</span>
  </div>
   `;

  buscar.value = '';
}

