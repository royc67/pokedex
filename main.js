const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');
const searchType = document.getElementById('searchType');
const searchTypeButton = document.getElementById('searchTypeButton');
const typeResults = document.getElementById('typeResults');


//search pokemon
const searchPokemon = async (pokemonId) => {
  searchInput.value = "";
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  
  console.log(data)
  createContainer(data);
  }
  catch(e) {
    alert(e.message)
    return e;
  }
};

//search types
const searchPokemonType = async (type,URL,e) => {
  e.target.innerHTML = type;
  try {
    const { data } = await axios.get(`${URL}`);
  
  console.log(data)
  let pokemonList = document.createElement('ul')
  for (let i = 0; i<data.pokemon.length;i++){
    let temp = document.createElement('li')
    temp.innerHTML = data.pokemon[i].pokemon.name;
    pokemonList.appendChild(temp);
    console.log(data.pokemon[i].pokemon.name)
  }
  e.target.appendChild(pokemonList);
  return pokemonList;
  }
  catch(e) {
    alert(e.message)
    return e;
  }
};

//searchPokemon();
searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode == 13){
    displayDiv.innerHTML = "";
    searchPokemon(searchInput.value)}})


searchButton.addEventListener('click', () => {
  displayDiv.innerHTML = "";
  searchPokemon(searchInput.value)})


const createContainer = (data) => {
  const tempPoke = [document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('ul'),
                    document.createElement('img')
                    ];
  tempPoke[0].innerHTML = `name: ${data.name}`; 
  tempPoke[1].innerHTML = `height: ${data.height}`; 
  tempPoke[2].innerHTML = `weight: ${data.weight}`; 
  tempPoke[4].src = data.sprites.front_default;
  tempPoke[4].addEventListener('mouseenter', ()=> {tempPoke[4].src = data.sprites.back_default});
  tempPoke[4].addEventListener('mouseleave', ()=> {tempPoke[4].src = data.sprites.front_default});

  //types:
  for (let i = 0; i< data.types.length; i++){
    let temp = document.createElement('li')
    temp.innerHTML = data.types[i].type.name;
    //searchPokemonType(data.types[i].type.url,temp)
    temp.addEventListener('click', (e) => searchPokemonType(data.types[i].type.name, data.types[i].type.url,e));
    tempPoke[3].appendChild(temp);
  }

  tempPoke.forEach(element => {displayDiv.appendChild(element)});
  
}


