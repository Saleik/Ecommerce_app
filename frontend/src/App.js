
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
import { CART_EMPTY, CART_SHIPPING_ADDRESS_RESET} from './constants/cartConstants';
import { UserListScreen } from './screens/UserListScreen';
import { UserEditScreen } from './screens/UserEditScreen';
import { SellerRoute } from './components/SellerRoute';
import { SellerScreen } from './screens/SellerScreen';
import { SearchBox } from './components/SearchBox';
import { SearchScreen } from './screens/SearchScreen';
import { useEffect, useState } from 'react';
import { ListProductsCategories } from './actions/productActions';
import { MessageBox } from './components/MessageBox';
import { LoadingBox } from './components/LoadingBox';
import { MapScreen } from './screens/MapScreen';


function App() {
   
    const cart = useSelector(state => state.cart);  
    const {cartItems} = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const productCategoryList = useSelector(state => state.productCategoryList);
    const { loading: loadingCategories, error:errorCategories, categories } = productCategoryList;

    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

    const dispatch = useDispatch();
    const signoutHandler = ()=>{
        dispatch({type:CART_SHIPPING_ADDRESS_RESET});
        dispatch({type: CART_EMPTY});
        dispatch(signout());
    }

    useEffect(()=>{
        dispatch(ListProductsCategories());
    },[dispatch])
    return( <Router>
      <div className="grid-container">
            <header className="row">
                <div className="brand">
                    <button type="button" onClick={()=> setSideBarIsOpen(!sideBarIsOpen)} className="open-sidebar">
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link to="/">Ecommerce</Link>
                </div>
                <div>
                    <Route render={({history}) => <SearchBox history={history}/>} />
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
                    {userInfo && userInfo.isSeller && (
                        <div className="dropdown">
                            <Link to="#">Seller {' '}<i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orders/seller">Orders</Link>
                                </li>
                            </ul>
                        </div>
                    )}
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
            <aside className={sideBarIsOpen ? 'open' : ''}>
                        <ul className="categories">
                            <li>
                                <strong>Categories</strong>
                                <button onClick={()=>setSideBarIsOpen(!sideBarIsOpen)}type="button" className="close-sidebar">
                                    <i className="fa fa-close"></i>
                                    </button>
                            </li>
                            {loadingCategories ? (<LoadingBox />) : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>) :(
                                categories.map(c => (<li className="category" key={c}>
                                    <Link to={`/search/category/${c}`} onClick={()=> setSideBarIsOpen(false)}>{c}</Link>
                                </li>))
                            )}
                            <li className="category">
                                <Link to='/search/name/' onClick={()=> setSideBarIsOpen(false)}>Any</Link>
                            </li>
                        </ul>
            </aside>
            <main>
                <Route exact path="/seller/:id" component={SellerScreen}/>
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
                <PrivateRoute path="/map" component={MapScreen}/>
                <Route exact path="/search" component={SearchScreen}/>
                <Route exact path="/search/name/:name?" component={SearchScreen}/>
                <Route exact path="/search/category/:category" component={SearchScreen}/>
                <Route exact path="/search/category/:category/name/:name" component={SearchScreen}/>
                <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen}/>
                <PrivateRoute path="/profile" component={ProfileScreen} />
                <AdminRoute path="/productlist" component={ProductListScreen}/>
                <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen}/>
                <AdminRoute path="/orders" component={OrderListScreen}/>
                <AdminRoute path="/users" component={UserListScreen}/>
                <AdminRoute path="/users/:id/edit" component={UserEditScreen}/>
                <SellerRoute path="/productlist/seller" component={ProductListScreen}/>
                <SellerRoute path="/orders/seller" component={OrderListScreen}/>
                <Route exact path="/" component={HomeScreen}/>
            </main>
            <footer className="row center"> 
                All right reserved
            </footer>
        </div>
        </Router>)
}

export default App;
