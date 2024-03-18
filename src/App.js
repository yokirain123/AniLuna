import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Popular from './Components/Popular';
import GlobalContext, { useGlobalContext } from './Context/global';


function App() {
 
  return (
    <BrowserRouter>
    <div className="App">
      <Popular />
    </div>
    </BrowserRouter>
  );
}

export default App;
