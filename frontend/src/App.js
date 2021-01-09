
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import { signout } from './actions/userAction';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import {ProductScreen} from './screens/ProductScreen'
import { SigninScreen } from './screens/SigninScreen';


function App() {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo}= userSignin;
    const dispatch = useDispatch();

    const signoutHandler = ()=>{
        dispatch(signout())
    }
    return( <Router>
      <div className="grid-container">
            <header className="row">
                <div className="brand">
                    <Link to="/">Ecommerce Lab</Link>
                </div>
                <div>
                    <Link to="/cart">Cart
                    {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}
                    </Link>
                    {
                        userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                                <ul className="dropdown-content">
                                    <li>
                                    <Link to="#signout" onClick={signoutHandler} >Sign out</Link>
                                    </li>
                            </ul>
                            </div>)
                        :(<Link to="/signin">Sign in</Link>)
                    }
                </div>
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/" component={HomeScreen} exact/>
            </main>
            <footer className="row center"> 
                All right reserved
            </footer>
        </div>
        </Router>)
}

export default App;
