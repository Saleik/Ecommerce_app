
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen';
import {ProductScreen} from './screens/ProductScreen'


function App() {
    return <Router>
      <div className="grid-container">
            <header className="row">
                <div className="brand">
                    <Link to="/">Ecommerce Lab</Link>
                </div>
                <div>
                    <Link to="/cart">Cart</Link>
                    <Link to="/signin">Sign in</Link>
                </div>
            </header>
            <main>
                <Route path="/product/:id" component={ProductScreen}/>
                <Route path="/" component={HomeScreen} exact/>
            </main>
            <footer className="row center"> 
                All right reserved
            </footer>
        </div>
        </Router>
}

export default App;
