import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator } from "@chakra-ui/react";
import { Home } from './Home';
import { About } from './About';
import { Anki } from "./Anki";
import { Support } from "./Support";

function App() {

  const tabStyle = {
    fontWeight: `300`, 
    fontFamily: `Helvetica, "Noto Sans JP", sans-serif`,
  }

  return ( 
    <>
      <Tabs variant='unstyled' align="center" width={`400px`}>
        <TabList style={{ borderBottom: '1px solid #e0e0e0' }}>
          <Tab style={tabStyle}>Home</Tab>
          <Tab style={tabStyle}>Anki export</Tab>
          <Tab style={tabStyle}>About</Tab>
          <Tab style={tabStyle}>Support</Tab>
        </TabList>
        <TabIndicator mt='-2.5px' height='2px' bg='teal.500' borderRadius='2px' />
          <TabPanels>
            <TabPanel pb={0}>
              <Home />
            </TabPanel>
            <TabPanel pb={0}>
              <Anki />
            </TabPanel>
            <TabPanel pb={0}>
              <About />
            </TabPanel>
            <TabPanel pb={0}>
              <Support window={false} />
            </TabPanel>
          </TabPanels>
      </Tabs>
    </>
    )
  }
  
export default App
  
