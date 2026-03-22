import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAC_SYMBOL_MAP: Record<string, string> = {
  '⌃': 'Ctrl',
  '⇧': 'Shift',
  '⌥': 'Alt',
  '⌘': 'Cmd',
};

export function formatShortcut(raw: string, notSetLabel = 'Not set') {
  if (!raw) return notSetLabel;

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
  const { t } = useTranslation();
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

  return (
    <>
      <span className="w-fit text-sm border border-border bg-white py-[7px] px-3 rounded-[5px]">
        {formatShortcut(shortcut, t('hotkey.notSet'))}
      </span>
      <button
        className="bg-none border-none text-primary font-medium hover:text-link-hover cursor-pointer"
        onClick={handleChange}
      >
        {t('hotkey.change')}
      </button>
    </>
  );
}
