import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import { Home } from './Home';
import { About } from './About';
import { Howtouse } from './Howtouse';

function App() {
  return ( 
  <>
  <BrowserRouter>
    <Navbar />
    <div className="container">
        <Routes>
          <Route path="/*" element={<Home />} />          
          <Route path="/about" element={<About />}></Route>
          <Route path="/howtouse" element={<Howtouse />}></Route>
        </Routes>
      </div>
  </BrowserRouter>
  </>
    )
  }
  
export default App
  
