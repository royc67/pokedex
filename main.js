const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');


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

//searchPokemon();
searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode == 13)
    searchPokemon(searchInput.value)})


searchButton.addEventListener('click', () => {
  displayDiv.innerHTML = "";
  searchPokemon(searchInput.value)})


const createContainer = (data) => {
  const tempPoke = [document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('img'),
                    document.createElement('ul')];
  tempPoke[0].innerHTML = `name: ${data.name}`; 
  tempPoke[1].innerHTML = `height: ${data.height}`; 
  tempPoke[2].innerHTML = `weight: ${data.weight}`; 
  tempPoke[3].src = data.sprites.front_default;
  tempPoke[3].addEventListener('mouseover', ()=> {tempPoke[3].src = data.sprites.back_default});
  tempPoke[3].addEventListener('mouseleave', ()=> {tempPoke[3].src = data.sprites.front_default});

  //types:
  const types = []
  for (let i = 0; i< data.types.length; i++){
    let temp = document.createElement('li')
    temp.innerHTML = data.types[i].type.name;
    tempPoke[4].appendChild(temp);
  }

  tempPoke.forEach(element => {displayDiv.appendChild(element)});
  
}


