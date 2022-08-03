import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPokemonName,getType,filterByHighHP,filterByLowHP } from '../actions'
import './NavBar.css'


export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:"",
      filter:"",
      types:[],
      typeids:""
    };
  }

  
  async componentDidMount(){
    const {getPokemonName,getType,filterByHighHP,filterByLowHP} = this.props
    await getType()
    this.setState({types:this.props.types})
    const selectElement = document.querySelector('#querylist');
    const selectElement2 = document.querySelector('#createdlist');
    selectElement.addEventListener('change', (event) => {
      event.preventDefault();
      this.setState({query:this.props.query})
      getPokemonName(this.props.name,1,event.target.value,this.props.filter,this.props.typeids)   
    })
    selectElement2.addEventListener('change', (event) => {
      event.preventDefault();
      this.setState({filter:this.props.filter})
      // console.log(event.target.value)
      getPokemonName(this.props.name,1,this.props.query,event.target.value,this.props.typeids)
    })
      const select = document.querySelector('#typelist');
      for(const type of this.state.types){
      var option = document.createElement("option")
      option.text = type.name
      option.value = type.id
      select.add(option)
    }
    select.addEventListener('change', (event) => {
      event.preventDefault();
      this.setState({typeids:this.props.typeids})
      // console.log(event.target.value)
      getPokemonName(this.props.name,1,this.props.query,this.props.filter,event.target.value)
    })
    const hpfilter = document.querySelector('#hpfilter')
    hpfilter.addEventListener('change',(event)=>{
      event.preventDefault()
      if(event.target.value==="Low") filterByLowHP()
      if(event.target.value==="High") filterByHighHP()
    })
  }
  
  
  render() {
    return (
      <header >
        <ul className="navbar">
          <li><Link to={'/home'}><img className='logo' src='https://as1.ftcdn.net/v2/jpg/03/66/63/52/1000_F_366635299_S1MlOWCcUVFPwgtxznb89r56tvyBBBVU.jpg' width="30" height="30" alt=''/></Link></li>
          <li><SearchBar/></li>
          <li><select id="createdlist">
            <option value="">All Pokemons</option>
            <option value="&created=1">Created Pokemons</option>
            <option value="&created=2">Original Pokemons</option>
          </select>
          </li>
          <li><select id="hpfilter">
            <option value="">All Pokemons</option>
            <option value="Low">Low hp</option>
            <option value="High">High hp</option>
          </select></li>
           <li><select id="typelist">
            <option value="" >Filter by types</option>
          </select>
          </li>
          <li><select id="querylist">
            <option value="&alpha=1">Ascendent order (A-Z)</option>
            <option value="&alpha=2">Descendent order (Z-A)</option>
            <option value="&str=1">Ascendent order (Weaker - Stronger)</option>
            <option value="&str=2">Descendent order (Stronger - Weaker)</option>
          </select>
          </li>
          <li className='post'><a  href='/create'>+</a></li>
          </ul>
      </header>
    )
  }
}
function mapStateToProps(state){
  return{
    query: state.query,
    name: state.nameSearch,
    types: state.types,
    filter: state.filter,
    typeids:state.typeids
  }
}

function mapDispatchToProps(dispatch){
  return{
    getPokemonName : (name,page,query,filter,types) => dispatch(getPokemonName(name,page,query,filter,types)),
    getType: () => dispatch(getType()),
    filterByHighHP:()=>dispatch(filterByHighHP()),
    filterByLowHP:()=>dispatch(filterByLowHP())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)