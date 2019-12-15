const section = document.querySelector('.section')
const pokemons = [];
const likedPokemons = [];

window.onload = () => {
  getUrl();
};

//Função que requisita dados da API
function getUrl() {
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=10')
    .then(response => response.json())
    .then(data => {
      const arrUrl = data.results;
      arrUrl.forEach(api => {
        let urlF = api.url;
        arrayPoke(urlF);
      })
    })
};

//Função que monta uma array com as informações necessárias da API
function arrayPoke(urlF) {
  fetch(urlF)
    .then(response => response.json())
    .then(poke => {
      const type = poke.types.map(item => (item.type.name).charAt(0).toUpperCase() + (item.type.name).slice(1));
      const name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
      const ability = poke.abilities.map(item => item.ability.name).toString();
      pokemons.push({
        id: poke.id,
        name,
        generation: poke.order,
        img: poke.sprites.front_default,
        ability,
        type: type,
        hp: poke.stats[5].base_stat,
        attack: poke.stats[4].base_stat,
        defense: poke.stats[3].base_stat,
        specialDefense: poke.stats[1].base_stat,
        speed: poke.stats[0].base_stat,
      })
      templateCards(pokemons)
      return pokemons
    })
}

//Função para montar os templates dos pokemons 
function templateCards(data) {
  section.innerHTML = '';
  data.forEach(poke => {
    section.innerHTML += `<div class='card'>
    <div class='header-card'>
      <span>#${poke.id}</span>
      <button class='btnlike' id='${poke.name}' onclick='liked(event)'></button>
    </div>
      <img class='imagePoke' src=${poke.img} /> 
      <h3 class='namePoke'> ${poke.name}</h3>
      <p class='type'>${poke.type.map(item => `<span class='typePoke'> ${item}</span>`).join('  ')}</p>
      <button class='info' id='${poke.id}' onclick='showModal(event)'>View More</button>
  </div>`
  });
}

//Função de filtro por tipo de pokemon
const typeChange = document.querySelector('.generation')
typeChange.addEventListener('change', () => {
  if (typeChange.value === 'all') {
    templateCards(pokemons)
  }
  else {
    templateCards(pokemons.filter(item => item.type.includes(typeChange.value)))
  }
});

setTimeout(() => {
  showModal, liked
}, 3000);

//Função para mostrar o modal
function showModal(event) {
  const e = Number(event.target.id);
  const pokeModal = pokemons.filter((i) => i.id === e);
  document.querySelector('#myModal').classList.add('show');
  document.querySelector('.modal-content').innerHTML = `
  <div class='header-card'>
    <span>#${pokeModal[0].id}</span>
    <button id='btnclose' onclick='closeModal()'>X</button>
  </div>
  <img class='imagePoke-modal' src=${pokeModal[0].img} /> 
  <h3 class='namePoke'>${pokeModal[0].name}</h3>
  <button class='btnlike-modal' id='${pokeModal[0].name}'></button>
  <p class='type'>${(pokeModal[0].type).map(item => `<span class='typePoke'> ${item}</span>`).join('  ')}</p>
  <div class='stats'>
    <p>Speed:</br><span class='valuePoke'>${pokeModal[0].speed}</span></p>
    <p>Special Defense:</br><span class='valuePoke'>${pokeModal[0].specialDefense}</span></p>
    <p>Defense:</br><span class='valuePoke'>${pokeModal[0].defense}</span></p>
    <p>Attack:</br><span class='valuePoke'>${pokeModal[0].attack}</span></p>
    <p>HP:</br><span class='valuePoke'>${pokeModal[0].hp}</span></p>
  </div>
`;
}

//Função para fechar o modal
function closeModal() {
  document.getElementById('myModal').classList.remove('show');
}

//Função para mostrar coração vermelho e salvar os pokemons favoritos
function liked(event) {
  const e = '#' + event.target.id;
  document.querySelector(e).classList.add('click')
  pokemons.forEach((i) => {
    if (event.target.id == i.name) {
      likedPokemons.push(i)
    }
  })
  return likedPokemons;
}

//Função para criar o template dos pokemons favoritos
setTimeout(() => {
  const likedChange = document.querySelector('.pokedex')
  likedChange.addEventListener('change', () => {
    if (likedChange.value === 'pokedex') {
      templateCards(pokemons)
    } else {
      templateCards(likedPokemons)
    }
  })
}, 4000);
