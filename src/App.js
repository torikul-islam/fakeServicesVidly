import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import Movies from "./components/movies";
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import Navbar from "./components/Navbar";
import MovieForm from './components/MovieForm';
import LoginForm from "./components/LoginForm";
import ImageUpload from './firebase/imageupload';
import "./App.css";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <main className="container">
          <Switch>
            <Route path="/firebase" component={ImageUpload}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to='/movies'></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
