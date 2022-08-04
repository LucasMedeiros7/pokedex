const div = document.getElementById('list');
const btn = document.getElementById('botao');
const input = document.getElementById('input');
const modal = document.getElementById('div-modal');
const textModal = document.getElementById('p');

//ARMAZENAMENTO DE DADOS DOS POKEMONS
const pokemons = [];

const modalDontExist = () => {
  input.value = '';
  textModal.innerText = 'Este pokémon não existe';
  textModal.style.color = 'red';
  modal.style.display = 'flex';
};

modal.onclick = () => (modal.style.display = 'none');

// CONTROLLER
async function getPokemon(pokemonName) {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  const pkm = await fetch(`${url}/${pokemonName}`)
    .then(res => res.json())
    .catch(__ => modalDontExist());

  if (pkm) {
    const { id, name, sprites } = pkm;
    const pfp = sprites.other.dream_world.front_default;

    createPokemon(id, name, pfp);
  }
}

// MODEL
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

const initialUpperCase = name =>
  name[0].toUpperCase() + name.substring(1).toLowerCase();

// VIEW
function render(pokemon) {
  div.innerHTML += `
    <div id="${pokemon.key}" class="card">
      <img src="${pokemon.image}" alt="">
      <div class="info">
        <span class="id-poke">#${pokemon.id}</span>
        <span class="name-poke">${initialUpperCase(pokemon.name)}</span>
      </div>
    </div>`;

  input.value = '';
}

btn.addEventListener('click', e => {
  e.preventDefault();

  const pokemonName = input.value.trim().toLowerCase();
  const isNew = pokemons.filter(pkm => pkm.name === pokemonName).length;

  if (!isNew) {
    getPokemon(pokemonName);
    return;
  }

  if (pokemonName) {
    textModal.innerText = `O ${initialUpperCase(
      pokemonName
    )} já está na sua pokédex`;

    textModal.style.color = '#2A74BA';
    modal.style.display = 'flex';
    input.value = '';
  } else {
    input.style.border = 'red solid 2px';
  }
});
