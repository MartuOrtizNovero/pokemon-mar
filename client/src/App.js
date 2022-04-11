import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import Details from './components/Details.jsx'
import Form from './components/Form.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element = {<LandingPage/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/pokemons/:id' element = {<Details/>}/>
        <Route path = '/pokemons' element = {<Form/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;