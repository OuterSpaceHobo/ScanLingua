import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Home } from './Home';
import { About } from './About';
import { Howtouse } from './Howtouse';

function App() {
  return ( 
  <>
  <BrowserRouter>

    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />          
        <Route path="/about" element={<About />}></Route>
        <Route path="/howtouse" element={<Howtouse />}></Route>
      </Routes>
    </div>

  <Tabs variant='enclosed' colorScheme='teal' align="center" width={`430px`}>
  <TabList>
    <Tab style={{fontWeight: `300`, fontFamily: `Helvetica, "Noto Sans JP", sans-serif`}}>Home</Tab>
    <Tab style={{fontWeight: `300`, fontFamily: `Helvetica, "Noto Sans JP", sans-serif`}}>Why do I need API key?</Tab>
    <Tab style={{fontWeight: `300`, fontFamily: `Helvetica, "Noto Sans JP", sans-serif`}}>About</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Home />
    </TabPanel>
    <TabPanel>
      <Howtouse />
    </TabPanel>
    <TabPanel>
      <About />
    </TabPanel>
  </TabPanels>
  </Tabs>

  </BrowserRouter>
  </>
    )
  }
  
export default App
  
