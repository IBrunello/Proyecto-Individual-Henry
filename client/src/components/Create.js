import React, { Component} from 'react'
import update from 'react-addons-update'
import { Link } from 'react-router-dom'
import { getType, postPokemon } from '../actions'
import { connect } from 'react-redux'
import './Create.css'

export class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types:[],
            typeid:[],
          name:"",
          weight:"",
          height:"",
          hp:undefined,
          attack:"",
          defense:"",
          speed:"",
          num:0,
        };
      }
      
      async componentDidMount(){
        const{getType} = this.props
        await getType()
        this.setState({types:this.props.types})
        // console.log(this.state.types)
      }

  render() {
      const handleChange=(event)=>{
        this.setState({...this.state,
            [event.target.id]:event.target.value
        })
    }
      const handleSubmit=async(event)=>{
        const {postPokemon} = this.props
        event.preventDefault()
        if(typeof(this.state.hp)==='number'){await postPokemon({name:this.state.name,weight:this.state.weight,height:this.state.height,hp:this.state.hp,attack:this.state.attack,defense:this.state.defense,speed:this.state.speed,typeid:this.state.typeid})
        alert(this.props.message)}
        else alert("Incorrect value")
      }
    return (
    <div>
        <header className="navbar"><nav><Link to={'/home'}><img className='logo' src="https://as1.ftcdn.net/v2/jpg/03/66/63/52/1000_F_366635299_S1MlOWCcUVFPwgtxznb89r56tvyBBBVU.jpg" width="30" height="30" alt=''/></Link></nav></header>
        <div className='create-body'>
        <form action='http://localhost:3001/activity' method='post' onSubmit={handleSubmit} className='form' name='form'>
        <ul>
        <li>
        <label >Name: </label>
            <input type="text" id="name" name="name" autoComplete='false' required value={this.state.name} onChange={handleChange}/>
        </li>
        <li>
            <label >Weight: </label>
            <input type="number" id="weight" name="weight" autoComplete='false' value={this.state.weight} onChange={handleChange}/>
        </li>
        <li>
            <label >Height: </label>
            <input type="number" id="height" name="height" autoComplete='false' value={this.state.height} onChange={handleChange}/>
        </li>
        <li>
            <label >Hp: </label>
            <input type="number" id="hp" name="hp" autoComplete='false' value={this.state.hp} onChange={handleChange}/>
        </li>
        <li>
            <label >Attack: </label>
            <input type="number" id="attack" name="attack" autoComplete='false' value={this.state.attack} onChange={handleChange}/>
        </li>
        <li>
            <label >Defense: </label>
            <input type="number" id="defense" name="defense" autoComplete='false' value={this.state.defense} onChange={handleChange}/>
        </li>
        <li>
            <label >Speed: </label>
            <input type="number" id="speed" name="speed" autoComplete='false' value={this.state.speed} onChange={handleChange}/>
        </li>
        <li>
            <label >Types: </label>
            <button type='button' onClick={()=>{
                this.setState({...this.state,
                    num:this.state.num+1
                })
                var select = document.createElement('select')
                select.name= 'typeid'
                select.id ='typeid'+this.state.num
                var def = document.createElement('option')
                def.value = ""
                def.text = "Add Type"
                select.appendChild(def)
                for(const type of this.state.types){
                    var option = document.createElement('option')
                    option.text = type.name
                    option.value = type.id
                    select.appendChild(option)
                }
                document.getElementById("container").appendChild(select)
                document.getElementById("typeid"+this.state.num).addEventListener('change',(event)=>{
                    let num = event.target.id.slice(6)
                    this.setState(update(this.state,{
                        typeid:{
                            [num]:{
                                $set:event.target.value
                            }
                        }
                    }))
                    // console.log(this.state.typeid)
                })
            }}>Add type</button>
            <ul id="container"></ul>
        </li>
        <li className="button">
            <button type='submit'>Post your Pokemon</button>
        </li>
        </ul>
        </form>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state){
    return{
        types: state.types,
        pages: state.totalPages,
        message:state.message
    }
}

function mapDispatchToProps(dispatch){
    return{
        getType: () => dispatch(getType()),
        postPokemon: (body) =>dispatch(postPokemon(body))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Create)