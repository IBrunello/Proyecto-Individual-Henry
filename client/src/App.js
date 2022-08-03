import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Create from './components/Create';
import Home from './components/Home';
import Landing from './components/Landing';
import Detail from './components/Detail';
import Loader from './components/Loader';

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/detail/:id" render={({match})=><Detail id={match.params.id}/>}></Route>
      <Route path="/create" component={Create}></Route>
      <Route path="/loading" component={Loader}></Route>
    </div>
      </BrowserRouter>
  );
}

export default App;
