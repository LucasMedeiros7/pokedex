//ARMAZENAMENTO DE DADOS DOS POKEMONS
const pokemons = [];

//MVC - CONTROLLER
function getPokemon(nome) {
  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
  );
  request.send();

  request.addEventListener("load", () => {
    if (request.status == 200) {
      const pkm = JSON.parse(request.responseText);

      createPokemon(
        pkm.id,
        pkm.name,
        pkm.sprites.other.dream_world.front_default
      );
    } else {
      p.innerText = "Este pokémon não existe";
      p.style.color = "red";
      modal.style.display = "flex";
      input.value = "";
    }
  });
}

//MVC - MODEL
function createPokemon(id, name, image) {
  const pokemon = {
    key: pokemons.length + 1,
    id: id,
    name: name,
    image: image,
  };
  pokemons.push(pokemon);

  render(pokemon);
}

//MVC - VIEW
function render(pokemon) {
  const nome = pokemon.name;
  input.value = "";

  div.innerHTML += `
    <div id="${pokemon.key}" class="card">
      <img src="${pokemon.image}" alt="">
      <div class="info">
        <span class="id-poke">#${pokemon.id}</span>
        <span class="nome-poke">${
          nome[0].toUpperCase() + nome.substring(1)
        }</span>
      </div>
    </div>`;
}
