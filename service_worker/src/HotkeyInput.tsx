import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

const MAC_SYMBOL_MAP: Record<string, string> = {
  '⌃': 'Ctrl',
  '⇧': 'Shift',
  '⌥': 'Alt',
  '⌘': 'Cmd',
};

export function formatShortcut(raw: string) {
  if (!raw) return 'Not set';

  if (raw.includes('+')) {
    return raw.split('+').join(' + ');
  }

  const chars = [...raw];
  const keys: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const mapped = MAC_SYMBOL_MAP[chars[i]];
    if (mapped) {
      keys.push(mapped);
    } else {
      keys.push(chars[i].toUpperCase());
    }
  }

  return keys.join(' + ');
}

export function HotkeyInput() {
  const [shortcut, setShortcut] = useState('');

  useEffect(() => {
    chrome.commands.getAll().then((commands) => {
      console.log('[hotkey] commands:', commands);
      const cmd = commands.find((c) => c.name === 'screenshot');
      setShortcut(cmd?.shortcut || '');
    });
  }, []);

  const handleChange = () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  };

  const spanStyle = {
    width: 'fit-content',
    fontSize: '14px',
    border: '1px solid #e0e0e0',
    backgroundColor: 'white',
    padding: '7px 0.75rem',
    borderRadius: '5px',
  };

  return (
    <>
      <span style={spanStyle}>{formatShortcut(shortcut)}</span>
      <Button colorScheme="teal" variant="link" onClick={handleChange}>
        change
      </Button>
    </>
  );
}
