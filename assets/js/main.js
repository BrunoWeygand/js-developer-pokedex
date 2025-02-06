const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <ol class="detailExpand">
                <li>
                    <p class="grey">HP</p>
                    <div>
                        <span>${pokemon.hp}</span>
                        <progress value="${pokemon.hp}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Attack</p>
                    <div>
                        <span>${pokemon.attack}</span>
                        <progress value="${pokemon.attack}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Defense</p>
                    <div>
                        <span>${pokemon.defense}</span>
                        <progress value="${pokemon.defense}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Sp. Attack</p>
                    <div>
                        <span>${pokemon.spAttack}</span>
                        <progress value="${pokemon.spAttack}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Sp. Defense</p>
                    <div>
                        <span>${pokemon.spDefense}</span>
                        <progress value="${pokemon.spDefense}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Speed</p>
                    <div>
                        <span>${pokemon.speed}</span>
                        <progress value="${pokemon.speed}" max="100"></progress>
                    </div>
                </li>
                <li>
                    <p class="grey">Total</p>
                    <div>
                        <span>${pokemon.total}</span>
                        <progress value="${pokemon.total}" max="600"></progress>
                    </div>
                </li>
            </ol>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})