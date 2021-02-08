import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./Components/add-User.component";
import User from "./Components/user.component";
import UserList from "./Components/user-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Search" className="navbar-brand">
            API integration 
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Search"} className="nav-link">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add client
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/search"]} component={UserList} />
            <Route exact path="/add" component={AddUser} />
            <Route path="/client/:id"
             component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;