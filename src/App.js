import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import Post from "./Post";
import User from "./User";
import UserDetails from "./UserDetails";
import Layout from "./Layout";
import DataProvider from "./DataContext";

// Styles
import "./App.css";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="app">
          <Layout>
            <Switch>
              <Route path="/" exact component={Post} />
              <Route path="/users" exact component={User} />
              <Route path="/user-details/:id" exact component={UserDetails} />
              <Redirect path="*" to="/" />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
