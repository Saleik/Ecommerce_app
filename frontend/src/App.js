
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { signout } from './actions/userAction';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import {ProductScreen} from './screens/ProductScreen';
import { SigninScreen } from './screens/SigninScreen';
import {RegisterScreen} from './screens/RegisterScreen'
import { ShippingAddressScreen } from './screens/ShippingAddressScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { OrderHistoryScreen } from './screens/OrderHistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { OrderListScreen } from './screens/OrderListScreen';
import { CART_EMPTY } from './constants/cartConstants';


function App() {
   
    const cart = useSelector(state => state.cart);  
    const {cartItems} = cart;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo}= userSignin;
    const dispatch = useDispatch();

    const signoutHandler = ()=>{
        dispatch({type: CART_EMPTY});
        dispatch(signout());
    }
    return( <Router>
      <div className="grid-container">
            <header className="row">
                <div className="brand">
                    <Link to="/">Ecommerce Lab</Link>
                </div>
                <div>
                    <Link to="/cart">Cart
                    {cartItems.length > 0 ? (<span className="badge">{cartItems.length}</span>):''}
                    </Link>
                    {
                        userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                    <li>
                                    <Link to="#signout" onClick={signoutHandler} >Sign out</Link>
                                    </li>
                            </ul>
                            </div>)
                        :(<Link to="/signin">Sign in</Link>)
                    }

                    {userInfo && userInfo.isAdmin &&(
                        <div className="dropdown">
                            <Link to="#admin">Admin{' '}<i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orders">Orders</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route exact path="/product/:id" component={ProductScreen}/>
                <Route exact path="/product/:id/edit" component={ProductEditScreen}/>
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <PrivateRoute path="/shipping" component={ShippingAddressScreen}/>
                <PrivateRoute path="/payment" component={PaymentMethodScreen} />
                <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRoute path="/order/:id" component={OrderScreen} />
                <PrivateRoute path="/orderhistory" component={OrderHistoryScreen}/>
                <PrivateRoute path="/profile" component={ProfileScreen} />
                <AdminRoute path="/productlist" component={ProductListScreen}/>
                <AdminRoute path="/orders" component={OrderListScreen}/>
                <Route exact path="/" component={HomeScreen}/>
            </main>
            <footer className="row center"> 
                All right reserved
            </footer>
        </div>
        </Router>)
}

export default App;
