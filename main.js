const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');


const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
  createContainer(data);
};
//searchPokemon();

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
  
  tempPoke.forEach(element => {displayDiv.appendChild(element)});
  
}


