import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import NavBar from './NavBar';
import ReactPaginate from 'react-paginate'
import { getAllPokemons,getPokemonName, emptyQuerys} from '../actions';
import './Home.css'

export class Home extends Component {

  constructor(props){
    super(props);
    this.state={
      loading:true,
    }
  }
  async componentDidMount(){
    const {getAllPokemons} = this.props
    // console.log(this.props.pokemons)
    await getAllPokemons(1).then(
      this.setState({loading:false}),
      )
  }
  componentWillUnmount(){
    const {emptyQuerys} = this.props
    emptyQuerys()
  }
  render() {
    const handlePageClick = (data) => {
      const {getPokemonName} = this.props
      // console.log(data.selected+1)
      getPokemonName(this.props.nameSearch,data.selected+1,this.props.query,this.props.filter,this.props.typeids)
    }
    return (
      <div className='home_body'>
        <NavBar className="nav"/>
        <div className='content'>
        <ul className='card_container'>
         {this.props.pokemons?.map(c => (
           <li className='card' key = {c.id}><Link to={`/detail/${c.id}`}><div className='card__content'>
           <img className='img' src={c.sprite} width="60" height="60" alt='NOT FOUND'/> {" "} <h3 className='card-title'>{c.name}</h3></div>
         </Link>{" "}
         </li>
         ))}
        </ul>
          <ReactPaginate 
          previousLabel={'<<'}
          nextLabel={'>>'}
          pageCount={this.props.pages}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
           />
           </div>
    </div>
    )
  }
}

function mapStateToProps(state){
  return{
      query: state.query,
      pokemons : state.pokemonsLoaded,
      pages : state.totalPages,
      nameSearch: state.nameSearch,
      filter:state.filter,
      typeids:state.typeids
  }
}

function mapDispatchToProps(dispatch){
  return{
    getAllPokemons: page => dispatch(getAllPokemons(page)),
    getPokemonName: (name,page,query,filter,types) =>dispatch(getPokemonName(name,page,query,filter,types)),
    emptyQuerys: ()=>dispatch(emptyQuerys())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)