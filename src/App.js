import './App.css';
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import {auth,createUserProfileDocument,addCollectionAndDocuments } from './firebase/firebase.utils';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
// import {selectCollectionsForPreview} from './redux/shop/shop.selector';

class App extends React.Component{
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    //const {setCurrentUser, collectionsArray} = this.props;
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
            setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            })
        });
      }else{
        setCurrentUser(userAuth);
        //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render (){
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser}/> 
          this is because header component taking the current user value from the reducer */}
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route  path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" 
            render={() => 
              this.props.currentUser 
              ? 
              (<Redirect to="/"/>) 
              : 
              (<SignInAndSignUpPage/>)} 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
