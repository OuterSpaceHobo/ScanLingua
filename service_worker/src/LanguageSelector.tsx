import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, Radio, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { useAppSelector, useAppDispatch } from './hooks';
import { saveLanguage, initializeLanguage } from './reducers/languageReducer';
import { initializeAnki, pollAnkiConnection, saveAnkiDeck } from './reducers/ankiReducer';
import { initializeLocale, saveLocale } from './reducers/localeReducer';
import { createNotification } from './reducers/notificationReducer';
import { fetchAvailableTargets } from './messages';
import store from './store';
import { SOURCE_LANGUAGES, UI_LOCALES } from './language';
import type { SourceLanguage } from './language';
import Notification from './Notification';
import { HotkeyInput } from './HotkeyInput';

export function LanguageSelector() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { source, target } = useAppSelector((state) => state.language);
  const { isConnected, decks, selectedDeck } = useAppSelector((state) => state.anki);
  const uiLocale = useAppSelector((state) => state.locale.uiLocale);
  const [availableTargets, setAvailableTargets] = useState<{ code: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await dispatch(initializeLanguage());
      dispatch(initializeLocale());
      dispatch(initializeAnki());
      dispatch(pollAnkiConnection());
      pollRef.current = setInterval(() => dispatch(pollAnkiConnection()), 3000);
      initializedRef.current = true;
      if (cancelled) return;
      setLoading(true);
      try {
        const currentSource = store.getState().language.source;
        const targets = await fetchAvailableTargets(currentSource);
        if (cancelled) return;
        setAvailableTargets(targets);
        const currentTarget = store.getState().language.target;
        const targetAvailable = targets.some((t) => t.code === currentTarget);
        if (!targetAvailable && targets.length > 0) {
          const fallback = targets.find((t) => t.code === 'en') ? 'en' : targets[0].code;
          dispatch(saveLanguage({ source: currentSource, target: fallback }));
          dispatch(createNotification(t('notification.langPairNotAvailable'), 3));
        }
      } catch (error) {
        console.log(error);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; if (pollRef.current) clearInterval(pollRef.current); };
  }, [dispatch]);

  useEffect(() => {
    if (!initializedRef.current) return;
    let cancelled = false;
    setLoading(true);
    fetchAvailableTargets(source).then((targets) => {
      if (cancelled) return;
      setAvailableTargets(targets);
      setLoading(false);

      const targetAvailable = targets.some((t) => t.code === target);
      if (!targetAvailable && targets.length > 0) {
        const fallback = targets.find((t) => t.code === 'en') ? 'en' : targets[0].code;
        dispatch(saveLanguage({ source, target: fallback }));
        dispatch(createNotification(t('notification.langPairNotAvailable'), 3));
      }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [source]);

  const handleSourceChange = (value: string) => {
    dispatch(saveLanguage({ source: value as SourceLanguage, target }));
  };

  const handleTargetChange = (value: string) => {
    dispatch(saveLanguage({ source, target: value }));
  };

  const selectedTarget = availableTargets.find((t) => t.code === target);

  return (
    <div className="w-full h-fit relative p-[1rem_0.75rem] border border-border rounded-[5px] bg-surface">
      <div className="w-full grid gap-[12px_8px] items-center grid-cols-[100px_1fr] h-fit relative">
        <span className="text-[17px] font-light leading-normal flex gap-3">{t('settings.recognize')}</span>
        <RadioGroup value={source as string} onChange={handleSourceChange} className="flex flex-row gap-4">
          {SOURCE_LANGUAGES.map((lang) => (
            <Radio key={lang.code} value={lang.code} className="group flex items-center gap-2 cursor-pointer">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-border group-data-[checked]:border-primary">
                <span className="h-2 w-2 rounded-full bg-transparent group-data-[checked]:bg-primary" />
              </span>
              <span className="text-sm font-light">{lang.label}</span>
            </Radio>
          ))}
        </RadioGroup>

        <span className="text-[17px] font-light leading-normal flex gap-3">{t('settings.translateTo')}</span>
        <Listbox value={target as string} onChange={handleTargetChange} disabled={loading}>
          <div className="relative">
            <ListboxButton className="w-full text-sm font-light border border-border bg-white py-[7px] px-3 rounded-[5px] text-left outline-none disabled:opacity-40 disabled:cursor-not-allowed">
              {selectedTarget?.label || target}
            </ListboxButton>
            <ListboxOptions anchor={{ to: "bottom start", padding: 12 }} className="z-10 max-h-40 w-[var(--button-width)] overflow-auto rounded-[5px] bg-white border border-border shadow-card text-sm font-light outline-none">
              {availableTargets.map((lang) => (
                <ListboxOption
                  key={lang.code}
                  value={lang.code}
                  className="cursor-pointer select-none py-1.5 px-3 data-[focus]:bg-gray-100 data-[selected]:bg-teal-50 data-[selected]:text-teal-700"
                >
                  {lang.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <span className="text-[17px] font-light leading-normal flex gap-3">{t('settings.hotkeyCmd')}</span>
        <span className="text-[17px] font-light leading-normal flex gap-3">
          <HotkeyInput />
        </span>

        <span className="text-[17px] font-light leading-normal flex gap-3">{t('settings.ankiDeck')}</span>
        <Listbox value={selectedDeck} onChange={(value: string) => dispatch(saveAnkiDeck(value))} disabled={!isConnected}>
          <div className="relative">
            <ListboxButton className="w-full text-sm font-light border border-border bg-white py-[7px] px-3 rounded-[5px] text-left outline-none disabled:opacity-40 disabled:cursor-not-allowed">
              {selectedDeck}
            </ListboxButton>
            <ListboxOptions anchor={{ to: "top start", padding: 12 }} className="z-10 max-h-40 w-[var(--button-width)] overflow-auto rounded-[5px] bg-white border border-border shadow-card text-sm font-light outline-none">
              {isConnected && decks.length > 0
                ? decks.map((deck) => (
                    <ListboxOption
                      key={deck}
                      value={deck}
                      className="cursor-pointer select-none py-1.5 px-3 data-[focus]:bg-gray-100 data-[selected]:bg-teal-50 data-[selected]:text-teal-700"
                    >
                      {deck}
                    </ListboxOption>
                  ))
                : <ListboxOption value={selectedDeck} className="py-1.5 px-3">{selectedDeck}</ListboxOption>
              }
            </ListboxOptions>
          </div>
        </Listbox>

        <span className="text-[17px] font-light leading-normal flex gap-3">{t('settings.uiLanguage')}</span>
        <Listbox value={uiLocale} onChange={(value: string) => dispatch(saveLocale(value))}>
          <div className="relative">
            <ListboxButton className="w-full text-sm font-light border border-border bg-white py-[7px] px-3 rounded-[5px] text-left outline-none disabled:opacity-40 disabled:cursor-not-allowed">
              {UI_LOCALES.find((l) => l.code === uiLocale)?.label || uiLocale}
            </ListboxButton>
            <ListboxOptions anchor={{ to: "bottom start", padding: 12 }} className="z-10 max-h-40 w-[var(--button-width)] overflow-auto rounded-[5px] bg-white border border-border shadow-card text-sm font-light outline-none">
              {UI_LOCALES.map((loc) => (
                <ListboxOption
                  key={loc.code}
                  value={loc.code}
                  className="cursor-pointer select-none py-1.5 px-3 data-[focus]:bg-gray-100 data-[selected]:bg-teal-50 data-[selected]:text-teal-700"
                >
                  {loc.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
      <div className="w-full flex justify-center mt-[5px]">
        <Notification />
      </div>
    </div>
  );
}
