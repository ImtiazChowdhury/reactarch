import logo from './logo.svg';
import './App.css';
import Product from './containers/Product';
import config from "./config.json"
import connector from "./connector"
import ProductView from "./component/ProductView";


connector.baseUrl = config.baseUrl;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Product view={(props)=><ProductView {...props}/>}/>
      </header>
    </div>
  );
}

export default App;
