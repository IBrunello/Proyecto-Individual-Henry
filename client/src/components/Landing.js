import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllPokemons } from '../actions'
import './Landing.css'


export default function Landing() {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(getAllPokemons(1))
    })
        return (
            <section className='web-container'>
                <div className='container'>
                    <a className='title' href='/home'>Henry's Pokedex</a>
                </div>
            </section>
        )
}