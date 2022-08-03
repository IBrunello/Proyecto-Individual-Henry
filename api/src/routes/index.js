const { Router } = require('express');
const axios = require('axios')
const {Pokemon, Type} = require('../db');



const router = Router();

function filter(i){
    return function(obj){
    let type = obj.types.map(e=>e.id)
    if(type.includes(i)) return true
    }
}

const getApiInfo = async()=>{
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    const response = await apiUrl.data.results
    const apiInfo = await Promise.all(
        response.map(async(e)=>{
            const pokemon = await axios.get(e.url)
            const {id,name,types,sprites,stats,weight,height}=pokemon.data
            const dbtypes = await Type.findAll({where:{name:types.map(e=>e.type.name)}})
            return{
                id:id,
                name:name,
                types:dbtypes,
                sprite:sprites.front_default,
                hp:stats[0].base_stat,
                height:height,
                weight:weight,
                attack:stats[1].base_stat,
                defense:stats[2].base_stat,
                speed:stats[5].base_stat,
            }
        })
    )
    return apiInfo;
}

const getDbInfo = async()=>{
    const dbInfo = await Pokemon.findAll({
        include: {
          model: Type,
          through: {
            attributes: []
          }
        }
      })
    return dbInfo
}

const getAllPokemons = async()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

const apiFilter=async(types)=>{
    const apiPokemons = await getApiInfo()
    const data = []
    for(i=0;i<types.length;i++){
    data.push(apiPokemons.filter(filter(types[i])))
    }
    return [].concat.apply([], data)
}

const dbFilter = async(types)=>{
    const dbPokemons = await Pokemon.findAll({
        include:[{
            model:Type,
            where:{id:types},
            through:{ attributes:[]}
        }]
    })
    return dbPokemons
}

const getAllFiltered = async(types)=>{
    const apiPokemons = await apiFilter(types)
    const dbPokemons = await dbFilter(types)
    const allPokemons = apiPokemons.concat(dbPokemons)
    return [].concat.apply([], allPokemons)
}

router.get('/pokemons',async(req,res)=>{
    const page = req.query.page*12-12;
    const name = req.query.name
    const alpha = req.query.alpha
    const str = req.query.str
    const created = req.query.created
    const types = [parseInt(req.query.types)]

    function compare(a, b) {
        if(alpha==1){
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
            return 0;
        }
        if(alpha==2){
        if ( a.name < b.name ){
            return 1;
        }
        if ( a.name > b.name ){
            return -1;
        }
            return 0;
        }
        if(str==1){
            if ( a.attack < b.attack ){
                return -1;
            }
            if ( a.attack > b.attack ){
                return 1;
            }
                return 0;
            }
            if(str==2){
            if ( a.attack < b.attack ){
                return 1;
            }
            if ( a.attack > b.attack ){
                return -1;
            }
                return 0;
            }
    }

    try{
        if(name){
            if(req.query.types){
                if(name.length){
                    if(created==1){
                        const dbfilter = await dbFilter(types)
                        const pokenamedb = dbfilter.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                        const response = pokenamedb.sort(compare).slice(page,page+12);
                        const pages = Math.ceil(pokenamedb.length/12)
                        response.push(pages)
                        return res.status(200).send(response)
                    }else
            if(created==2){
                const apifilter = await apiFilter(types)
                const pokenameapi = apifilter.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                 const response = pokenameapi.length ? pokenameapi.sort(compare).slice(page,page+12) : [];
                 const pages = Math.ceil(pokenameapi.length/12)
                 response.push(pages)
                 return res.status(200).send(response)
                }else{
                    const typefilter = await getAllFiltered(types)
                const pokename = typefilter.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                let order = pokename.sort(compare).slice(page,page+12)
                let pages = Math.ceil(pokename.length/12)
                order.push(pages)
                return res.status(200).json(order)
            }
        }else{
            res.status(404).send("Pokemon not found")
        }
        }else{
        if(name.length){
            if(created==1){
                const db = await getDbInfo()
                const pokenamedb = db.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                 const response = pokenamedb.sort(compare).slice(page,page+12);
                 const pages = Math.ceil(pokenamedb.length/12)
                 response.push(pages)
                return res.status(200).send(response)
            }else
            if(created==2){
                const api = await getApiInfo()
                const pokenameapi = api.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                 const response = pokenameapi.length ? pokenameapi.sort(compare).slice(page,page+12) : [];
                 const pages = Math.ceil(pokenameapi.length/12)
                 response.push(pages)
                return res.status(200).send(response)
            }else{
                const pokemon = await getAllPokemons();
                const pokename = pokemon.filter(e=>{return e.name.toLowerCase().includes(name.toLowerCase())});
                let order = pokename.sort(compare).slice(page,page+12)
                let pages = Math.ceil(pokename.length/12)
                order.push(pages)
                return res.status(200).json(order)
            }
        }else{
            res.status(404).send("Pokemon not found")
        }}
        }else{
            if(req.query.types){            
                if(created==1){
                    const dbfilter = await dbFilter(types)
                    const response = dbfilter.sort(compare).slice(page,page+12);
                    const pages = Math.ceil(dbfilter.length/12)
                    response.push(pages)
                    return res.status(200).send(response)
                }else{
                    if(created==2){
                        const apifilter = await apiFilter(types)
                        const response = apifilter.length ? apifilter.sort(compare).slice(page,page+12) : [];
                        const pages = Math.ceil(apifilter.length/12)
                        response.length ? response.push(pages) : ""
                        return res.status(200).send(response)
                    }else{
                        const typefilter = await getAllFiltered(types)
                        const order = typefilter.sort(compare).slice(page,page+12)
                        let pages = Math.ceil(typefilter.length/12)
                        order.push(pages)
                        return res.status(200).json(order)
                    }}
                }else{
            if(created==1){
                const db = await getDbInfo()
                 const response = db.sort(compare).slice(page,page+12);
                 const pages = Math.ceil(db.length/12)
                 response.push(pages)
                return res.status(200).send(response)
            }else{
            if(created==2){
                const api = await getApiInfo()
                 const response = api?.length ? api.sort(compare).slice(page,page+12):[];
                 const pages = Math.ceil(api.length/12)
                 response.push(pages)
                return res.status(200).send(response)
            }else{
                const pokemon = await getAllPokemons();
                const order = pokemon.sort(compare).slice(page,page+12)
                let pages = Math.ceil(pokemon.length/12)
                order.push(pages)
                return res.status(200).json(order)
        }}}}
    }catch(err){
        res.send(err)
    }
})

router.get("/pokemon/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const allpoke = await getAllPokemons()
        const pokemon = allpoke.filter(e=>e.id==id)
        res.status(200).send(pokemon)
    }catch(err){
        res.send(err)
    }
})

router.get("/types",async(req,res)=>{
    try{
        const dbTypes = await Type.findAll()
        if(dbTypes.length<20){
            const request = await axios.get("https://pokeapi.co/api/v2/type")
            const names = request.data.results.map(e=>e.name)
            const dbcreate = names.forEach((e,index)=>{
                Type.findOrCreate({where:{id:index+1},
                    defaults:{
                        name:e
                    }})
                })
                const types =names.map((e,index)=>{
                    return {
                        id:index+1,
                        name:e
                    }
                })
                res.send(types)
            }else{
            res.status(200).send(dbTypes)
        }
    }catch(err){
        res.send(err)
    }
})

router.post("/pokemon",async(req,res)=>{
    const {name,weight,height,hp,attack,defense,speed,typeid} = req.body
    try{
        if(!Number.isNaN(parseInt(name))) return res.send("Inserted name is not valid")
        const type = await Type.findAll({where:{id:typeid}})
        const dbpoke = await Pokemon.findOne({where:{name:name.toLowerCase()}})
        const lastid = await Pokemon.max('id')
        if(dbpoke) return res.send("Pokemon already exists in database")
        if(!lastid) {
            const poke = await Pokemon.create({
                id:"H0",
                name:name.toLowerCase(),
                weight:weight,
                height:height,
                hp:hp,
                attack:attack,
                defense:defense,
                speed:speed,
                sprite:"https://i.ebayimg.com/thumbs/images/g/TooAAOSw8t1elIjh/s-l96.jpg"
            })
            poke.addType(type)
            return res.send("Pokemon added to database")
        }else{
        const number = parseInt(lastid.slice(1))+1
        const id = "H"+number
        const poke = await Pokemon.create({
            id:id,
            name:name.toLowerCase(),
            weight:weight,
            height:height,
            hp:hp,
            attack:attack,
            defense:defense,
            speed:speed,
            sprite:"https://i.ebayimg.com/thumbs/images/g/TooAAOSw8t1elIjh/s-l96.jpg"
        })
        poke.addType(type)
        return res.send("Pokemon added to database")
    }}catch(err){
        res.send(err)
    }
})

module.exports = router;
