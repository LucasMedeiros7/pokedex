const div = document.getElementById('list')
const btn = document.getElementById('botao')
const buscar = document.getElementById('buscar')



btn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('ta funfando')
  let pedido = new XMLHttpRequest()
  pedido.open('GET', `https://pokeapi.co/api/v2/pokemon/${buscar.value}`)
  pedido.send()
  pedido.addEventListener("load", () => {
    if (pedido.status == 200) {
      let pokemon = JSON.parse(pedido.responseText)

      let nome = pokemon.name
      let foto = pokemon.sprites.front_default
      let id = pokemon.id

      criaCard(foto, nome, id)

    } else alert('Acho que esse pokémon não existe 😞 \n Tente novamente!')
  })

})

function criaCard(foto, nome, id) {
  div.innerHTML += `
  <div class="card">
  <img src="${foto}" alt="">
  <div class="info">
    <span class="id-poke">#${id}</span>
    <span class="nome-poke">${nome}</span>
  </div>
   `
}
