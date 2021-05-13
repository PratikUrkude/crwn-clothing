import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.components";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.components";
import { auth } from "./firebase/firebase.ulis";

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount(unsubscribeFromAuth) {
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });


      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={ this.state.currentUser } />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/signin" component={SignInAndSignUpPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
