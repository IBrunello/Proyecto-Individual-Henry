export const GET_ALL_POKEMON = "GET_ALL_POKEMON"
export const GET_POKEMON_DETAIL ="GET_POKEMON_DETAIL"
export const GET_POKEMON_NAME ="GET_POKEMON_NAME"
export const GET_TYPE ="GET_TYPE"
export const EMPTY_DETAIL = "EMPTY_DETAIL"
export const POST_POKEMON ="POST_POKEMON"
export const EMPTY_QUERYS ="EMPTY QUERYS"
export const FILTER_HIGH_HP ="FILTER_HIGH_HP"
export const FILTER_LOW_HP ="FILTER_LOW_HP"

const initialState = {
    totalPages: "",
    query: "&alpha=1",
    nameSearch:"",
    types: [],
    pokemonsLoaded: [],
    pokemonDetail: {},
    filter:"",
    typeids:"",
    message:""
}

export default function rootReducer(state = initialState,{type,name,query,payload,filter,typeids}){
    if(type===GET_ALL_POKEMON){
        return{
            ...state,
            pokemonsLoaded:payload.slice(0, payload.length-1),
            totalPages:payload[payload.length-1]
        }
    }
    if(type === GET_POKEMON_DETAIL){
        return{
            ...state,
            pokemonDetail:payload[0]
        }
    }
    if(type===EMPTY_DETAIL){
        return{
            ...state,
            pokemonDetail:{}
        }
    }
    if(type===GET_TYPE){
        return{
            ...state,
            types:payload
        }
    }
    if(type===POST_POKEMON){
        return {...state,
            message:payload};
    }
    if(type===GET_POKEMON_NAME){
        return{
            ...state,
            pokemonsLoaded:payload.slice(0,payload.length-1),
            totalPages:payload[payload.length-1],
            nameSearch:name,
            query:query,
            filter:filter,
            typeids:typeids
        }
    }
    if(type===EMPTY_QUERYS){
        // console.log(state.query+" "+state.nameSearch+" "+state.filter+" "+state.typeids)
        return{
            ...state,
            query:"&alpha=1",
            nameSearch:"",
            filter:"",
            typeids:"",
            pokemonsLoaded:[]
        }
    }
    if(type===FILTER_HIGH_HP){
        return{
            ...state,
            pokemonsLoaded:state.pokemonsLoaded.filter(e=>e.hp>=50)
        }
    }
    if(type===FILTER_LOW_HP){
        return{
            ...state,
            pokemonsLoaded:state.pokemonsLoaded.filter(e=>e.hp<50)
        }
    }
    return state
}