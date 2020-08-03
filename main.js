const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');


const searchPokemon = async (pokemonId = 3) => {
  searchInput.value = "";
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
  createContainer(data);
};
//searchPokemon();
searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode == 13)
    searchPokemon(parseInt(searchInput.value))})

searchButton.addEventListener('click', () => {searchPokemon(parseInt(searchInput.value))})

const createContainer = (data) => {
  const tempPoke = [document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('img')];
  tempPoke[0].innerHTML = `name: ${data.name}`; 
  tempPoke[1].innerHTML = `height: ${data.height}`; 
  tempPoke[2].innerHTML = `weight: ${data.weight}`; 
  tempPoke[3].src = data.sprites.front_default;
  tempPoke[3].addEventListener('mouseover', ()=> {tempPoke[3].src = data.sprites.back_default});
  tempPoke[3].addEventListener('mouseleave', ()=> {tempPoke[3].src = data.sprites.front_default});

  tempPoke.forEach(element => {displayDiv.appendChild(element)});
  
}


