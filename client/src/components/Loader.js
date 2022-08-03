import React, { Component } from 'react'
import LoadingSpinner from './Loading';

export class Loader extends Component {
    constructor(props){
        super(props);
        this.state={
          loading:false,
        }
      }
  render() {
    const handleClick =() =>{
        this.state.loading ? this.setState({loading:false}) : this.setState({loading:true})
        console.log(this.state.loading)
    }
    return (
      <div>
        <button onClick={handleClick}>BOTON</button>
        {this.state.loading ? <LoadingSpinner/>:<h1>LOADED</h1>}
        </div>
    )
  }
}

export default Loader