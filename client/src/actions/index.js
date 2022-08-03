import { EMPTY_DETAIL,POST_POKEMON,GET_ALL_POKEMON,GET_POKEMON_DETAIL,GET_POKEMON_NAME,GET_TYPE,EMPTY_QUERYS,FILTER_HIGH_HP,FILTER_LOW_HP } from "../reducers";
import axios from "axios"

export const getAllPokemons=(page)=>{
    return async(dispatch)=>{
        const response = await axios.get("http://localhost:3001/pokemons?alpha=1&page="+page);
        const json = response.data;
        dispatch({type:GET_ALL_POKEMON,payload:json})
    }
}
export const filterByHighHP=()=>{
    return{
        type:FILTER_HIGH_HP
    }
}
export const filterByLowHP=()=>{
    return{
        type:FILTER_LOW_HP
    }
}
export const getPokemonName=(name,page,query,filter,types)=>{
    return async(dispatch)=>{
        const response = await axios.get("http://localhost:3001/pokemons?name=" + name + query + filter+"&page="+page + "&types="+types)
        const json = response.data
        console.log(json)
        dispatch({type:GET_POKEMON_NAME,payload:json,name:name,query:query,filter:filter,typeids:types})
    }
}
export const getPokemonDetail=(id)=>{
    return async(dispatch)=>{
        const response = await axios.get("http://localhost:3001/pokemon/" + id)
        const json = response.data
        dispatch({type:GET_POKEMON_DETAIL,payload:json})
    }
}
export const getType=()=>{
    return async(dispatch)=>{
        const response = await axios.get("http://localhost:3001/types")
        const json = response.data
        dispatch({type:GET_TYPE,payload:json})
    }
}
export const postPokemon=(body)=>{
    return async(dispatch)=>{
        // console.log(body)
        const response = await axios.post("http://localhost:3001/pokemon",body)
        const json = response.data
        dispatch({type:POST_POKEMON,payload:json})
    }
}
export const emptyDetail=()=>{
    return {
        type:EMPTY_DETAIL
    }
}
export const emptyQuerys=()=>{
    console.log("hola")
    return{
        type:EMPTY_QUERYS
    }
}