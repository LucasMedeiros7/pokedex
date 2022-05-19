const div = document.getElementById("list");
const btn = document.getElementById("botao");
const buscar = document.getElementById("buscar");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (buscar.value != "") {
    buscar.style.border = "";

    let pedido = new XMLHttpRequest();
    pedido.open("GET", `https://pokeapi.co/api/v2/pokemon/${buscar.value.toLowerCase()}`);
    pedido.send();
    pedido.addEventListener("load", () => {
      if (pedido.status == 200) {
        let pokemon = JSON.parse(pedido.responseText);

        let nome = pokemon.name;
        let foto = pokemon.sprites.other.dream_world.front_default;
        let id = pokemon.id;
        criaCard(foto, nome, id);
      } else {
        alert("Acho que esse pokémon não existe 😞 \n Tente novamente!");
        buscar.value = '' ;
      }
    });
  } else buscar.style.border = "2px solid #F11828";
});

function criaCard(foto, nome, id) {

  div.innerHTML += `
  <div id="${nome.toLowerCase()}" class="card">
  <img src="${foto}" alt="">
  <div class="info">
    <span class="id-poke">#${id}</span>
    <span class="nome-poke">${nome.toUpperCase()}</span>
  </div>
   `;

  buscar.value = '' ;
}

