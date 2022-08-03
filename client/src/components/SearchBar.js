import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getPokemonName} from '../actions'
import './SearchBar.css'

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:""
        };
      }
    
      handleChange(event) {
        this.setState({ name: event.target.value });
      }
      handleSubmit(event) {
        event.preventDefault();
        this.props.getPokemonName(this.state.name,1,this.props.query,this.props.filter,this.props.typeids);
        this.setState({name:""})
      }

  render() {
    const {name} = this.state
    return (
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <label className="label">Pokemon: </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
        <button type="submit">SEARCH</button>
      </form>
    )
  }
}

function mapStateToProps(state){
    return{
        query: state.query,
        pokemons : state.pokemonsLoaded,
        filter:state.filter,
        typeids:state.typeids
    }
  }

function mapDispatchToProps(dispatch){
    return{
      getPokemonName: (name,page,query,filter,typeids) => dispatch(getPokemonName(name,page,query,filter,typeids))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)