import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { Home } from './Home';
import { About } from './About';
import { Anki } from "./Anki";
import { Support } from "./Support";

const TAB_KEYS = ['app.tabs.home', 'app.tabs.ankiExport', 'app.tabs.about', 'app.tabs.support'];

function App() {
  const { t } = useTranslation();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    if (tab) {
      setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
  }, []);

  useEffect(() => {
    updateIndicator(0);
  }, [updateIndicator]);

  const tabLabels = TAB_KEYS.map((key) => t(key));

  return (
    <TabGroup onChange={updateIndicator}>
      <div className="w-[400px]">
        <TabList className="relative flex justify-center border-b border-border">
          {tabLabels.map((label, i) => (
            <Tab
              key={TAB_KEYS[i]}
              ref={(el: HTMLButtonElement | null) => { tabRefs.current[i] = el; }}
              className="font-light text-base px-4 py-2 outline-none cursor-pointer bg-transparent border-none whitespace-nowrap"
            >
              {label}
            </Tab>
          ))}
          <div
            className="absolute bottom-[-1.5px] h-[2px] bg-primary rounded-[2px] transition-all duration-300"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </TabList>
        <TabPanels>
          <TabPanel className="p-4 pb-0"><Home /></TabPanel>
          <TabPanel className="p-4 pb-0"><Anki /></TabPanel>
          <TabPanel className="p-4 pb-0"><About /></TabPanel>
          <TabPanel className="p-4 pb-0"><Support window={false} /></TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
}

export default App
