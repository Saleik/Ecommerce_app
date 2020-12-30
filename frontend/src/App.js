
import { Card } from './Card'
import {data} from './data'

function App() {
  return <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">Ecommerce Lab</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign in</a>
                </div>
            </header>
            <main>
                <div className="row center ">
                    {data.products.map((p)=> <Card _id={parseInt(p._id)} image={p.image} name={p.name} price={p.price} />)}
                </div>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
          </div>
}

export default App;
