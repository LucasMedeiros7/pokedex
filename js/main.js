const div = document.getElementById("list");
const btn = document.getElementById("botao");
const input = document.getElementById("input");
const modal = document.getElementById("div-modal");
const p = document.getElementById("p");

//refatorar essa parte
btn.addEventListener("click", (e) => {
  e.preventDefault();

  let isNew;

  const nome = input.value === "" ? false : input.value;

  if (nome) {
    input.style.border = "initial";
    isNew =
      pokemons.filter((pokemon) => pokemon.name === nome.toLowerCase())
        .length === 0;
  }

  if (isNew) getPokemon(nome);
  else if (nome) {
    p.innerText = `O ${
      nome[0].toUpperCase() + nome.substring(1).toLowerCase()
    } já está na sua pokédex`;

    p.style.color = "#2A74BA";
    modal.style.display = "flex";
    input.value = "";
  } else input.style.border = "red solid 2px";
});

modal.onclick = () => (modal.style.display = "none");
