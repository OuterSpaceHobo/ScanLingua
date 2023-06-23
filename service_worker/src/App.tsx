import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Home } from './Home';
import { About } from './About';
import { Howtouse } from './Howtouse';
import { Anki } from "./Anki";

function App() {

  const tabStyle = {
    fontWeight: `300`, 
    fontFamily: `Helvetica, "Noto Sans JP", sans-serif`,
    // fontSize: `20px`
}

  return ( 
    <>
      <Tabs variant='enclosed' colorScheme='teal' align="center" width={`430px`}>
        <TabList>
          <Tab style={tabStyle}>Home</Tab>
          <Tab style={tabStyle}>Why API key?</Tab>
          <Tab style={tabStyle}>Anki info</Tab>
          <Tab style={tabStyle}>About</Tab>
        </TabList>
          <TabPanels>
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel>
              <Howtouse />
            </TabPanel>
            <TabPanel>
              <Anki />
            </TabPanel>
            <TabPanel>
              <About />
            </TabPanel>
          </TabPanels>
      </Tabs>
    </>
    )
  }
  
export default App
  
