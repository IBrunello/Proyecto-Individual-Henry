import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getPokemonDetail, emptyDetail } from '../actions';
import { Link } from 'react-router-dom';
import './Detail.css'


const Detail = (id) => {
    const dispatch = useDispatch()
    const pokemonid = id.id

    React.useEffect(()=>{
        dispatch(getPokemonDetail(pokemonid))
        return ()=>{dispatch(emptyDetail())}
    },[dispatch,pokemonid])

    const pokemons = useSelector((state)=> state.pokemonDetail)
    // console.log(pokemons)
    return(
        <div className='detail-body'>
             <header className="navbar"><nav><Link to={'/home'}><img className='logo' src='https://as1.ftcdn.net/v2/jpg/03/66/63/52/1000_F_366635299_S1MlOWCcUVFPwgtxznb89r56tvyBBBVU.jpg' width="30" height="30" alt='NOT FOUND'/></Link></nav></header>
            {pokemons && (
                <div className='pokemon'>
                    <h1 className='name'>{pokemons.name}</h1>
                    <img className='sprite' src={pokemons.sprite} alt=''/>
                    <div className='lists'>
                    <ul className='titles'>
                    <li className='title'>Index: </li>
                    <li className='title'>Weight: </li>
                    <li className='title'>Heigth: </li>
                    <li className='title'>HP: </li>
                    <li className='title'>Attack: </li>
                    <li className='title'>Defense: </li>
                    <li className='title'>Speed: </li>
                    </ul>
                    <ul className='stats'>
                    <li><h4 className='id'>{pokemons.id}</h4></li>
                    <li><h4 className='stat'>{pokemons.weight}</h4></li>
                    <li><h4 className='stat'>{pokemons.height}</h4></li>
                    <li><h4 className='stat'>{pokemons.hp}</h4></li>
                    <li><h4 className='stat'>{pokemons.attack}</h4></li>
                    <li><h4 className='stat'>{pokemons.defense}</h4></li>
                    <li> <h4 className='stat'> {pokemons.speed}</h4></li>
                    </ul>
                    <ul className='types'>
                    <li className='title'> <h4 >Types: </h4></li>
                    {pokemons.types?.map((c,index)=>(
                            <li key={index}><h4 className='stat'>{c.name}</h4></li>
                        ))}</ul>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Detail