import React, { useState, useEffect } from 'react'
import loader from './loader.gif'

function PokeCard() {

    const [pokemon, setPokemon] = useState({})
    const [search, setSearch] = useState('pikachu')
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchPokemon = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(r => r.json())
            .then(p => {
                setPokemon(p)
                setIsLoaded(true)
            })
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <div className='card'>
            {isLoaded ? <div className='title'>PokéCard - {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</div> : <div className='title'>PokéCard</div>}
            <div className='searchBox'>
                <input
                    type={'text'}
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                    placeholder='Pokemon Name'
                />
                <button onClick={() => {
                    setIsLoaded(false)
                    fetchPokemon()
                }}>Search</button>
            </div>
            {isLoaded ? <div className='container'>
                <img className='pimg' src={pokemon.sprites.front_default} />
                <div className='details'>
                    <div>Name - <i className='value'>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</i></div>
                    <div>Type - <i className='value'>{pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1)}</i></div>
                    <div>Height - <i className='value'>{pokemon.height}</i></div>
                    <div>Weight - <i className='value'>{pokemon.weight}</i></div>
                    <div>Order - <i className='value'>{pokemon.order}</i></div>
                    <div>Ability - <i className='value'>{pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.substring(1)}</i></div>
                    <div>Move - <i className='value'>{pokemon.moves[0].move.name[0].toUpperCase() + pokemon.moves[0].move.name.substring(1)}</i></div>
                    <div>Base Experience - <i className='value'>{pokemon.base_experience}</i></div>
                </div>
            </div> : <img src={loader} className='load' />}
            <div className='ref'>Reference - <i><a href='https://pokeapi.co/docs/v2'>PokéAPI</a></i></div>
        </div>
    )
}

export default PokeCard