import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import './header.styles.scss';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';


const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
              <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            
            <Link className="option" to="/shop">
                CONTACT
            </Link>
            
            {currentUser ? (
                <div className="option" onClick={()=>auth.signOut()}> 
                        SIGN OUT 
                </div>
                ) : (
                    <Link className="option" to="/signin"> 
                        SIGN IN 
                    </Link>
            )}
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown/>
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden 
});

export default connect(mapStateToProps)(Header);