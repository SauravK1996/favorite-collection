import React from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
// import './header.styles.scss';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {HeaderContainer, LogoContainer, OptionsContainer, OptionsLink} from './header.styles';


const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
              <Logo className="logo"/>
        </LogoContainer>
        <OptionsContainer>
            <OptionsLink to="/shop">
                SHOP
            </OptionsLink>
            
            <OptionsLink to="/shop">
                CONTACT
            </OptionsLink>
            
            {currentUser ? (
                <OptionsLink as='div' onClick={()=>auth.signOut()}> 
                        SIGN OUT 
                </OptionsLink>
                ) : (
                <OptionsLink to="/signin"> 
                    SIGN IN 
                </OptionsLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden 
});

export default connect(mapStateToProps)(Header);