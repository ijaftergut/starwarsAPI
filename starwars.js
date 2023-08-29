window.addEventListener("hashchange", ()=>{
    getEventFromHash()
    selectCharacter()
})
function getEventFromHash(){
    const name = window.location.hash.slice(1)
    const singleCharacter = state.characters.find((character)=>{
        return character.name.replace(' ','_') === name
    })
    state.singleCharacter = singleCharacter
}

state= {
    characters: [],
    singleCharacter: null
}

async function getCharacterList(){
    const info = await fetch("https://swapi.dev/api/people")
    const characterData = await info.json()
    state.characters = characterData.results
    // const characterName = state.characters.map((character)=>{
    //     return (character.name.replace(' ','_'))
    // })
    // characterName
    renderCharacterList()
}
const allCharactersDiv = document.getElementById("allCharacters")
function renderCharacterList(){
    const allCharacters = state.characters.map(function(character){
        return `<div><a href='#${character.name}'>${character.name}</div>`
    })
    allCharactersDiv.innerHTML = allCharacters.join('')
    console.log(allCharacters)
}


async function render(){
    await getCharacterList()
    selectCharacter()
}
render()


const selectedCharacter = document.getElementById('selectedCharacter')
async function selectCharacter(){
    getEventFromHash()
    if (state.singleCharacter) {
        await getSingleCharacter(state.singleCharacter.name)
        selectedCharacter.innerHTML = `<h1>${state.singleCharacter.name}</h1>`
    } else {
        selectedCharacter.innerHTML = ''
    }
}
async function getSingleCharacter(){
    const characterData = await fetch (`https://pokeapi.co/api/v2/pokemon/${(state.characters.name.replace(' ','_'))}`)
    const singleCharacterData = await characterData.json()
    state.singleCharacter = singleCharacterData
}


// function renderPokemonDetails(){
//     if (state.singlePokemon){
//         getSinglePoke()}
// }
