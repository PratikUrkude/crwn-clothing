import React from "react";
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import "./App.css";

import HomePage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.components";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.components";
import CheckoutPage from "./pages/checkout/checkout.components";

import { auth, createUserProfileDocument } from "./firebase/firebase.ulis";

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";


// function App() {
class App extends React.Component {
  

  unsubscribeFromAuth = null;

  componentDidMount(unsubscribeFromAuth) {
    const { setCurrentUser } = this.props;
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
        // console.log(snapShot);  
        setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      else 
      {
        setCurrentUser(userAuth);
      }

      // console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signin" render={() => 
              this.props.currentUser ? (
                <Redirect to='/' /> 
              ) : (
                <SignInAndSignUpPage />
                ) 
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispactchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispactchToProps)(App);
