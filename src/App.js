import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';


// App components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import PageNotFound from './components/PageNotFound';



export default class App extends Component {
  

  
  render(){
    return (
      <div className="container">
        <BrowserRouter>
          <SearchForm />    
          <Nav />
          
          <Switch>
            <Route exact path="/" component={Gallery} />
            <Route exact path="/:name" component={Gallery} />
            <Route component={PageNotFound} />
          </Switch>
       
        </BrowserRouter>
      </div>
    );
  }
} 

