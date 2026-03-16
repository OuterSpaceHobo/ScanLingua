import { useEffect, useState, useRef } from 'react';
import { RadioGroup, Stack } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from './hooks';
import { saveLanguage, initializeLanguage } from './reducers/languageReducer';
import { initializeAnki, pollAnkiConnection, saveAnkiDeck } from './reducers/ankiReducer';
import { createNotification } from './reducers/notificationReducer';
import { fetchAvailableTargets } from './messages';
import { SOURCE_LANGUAGES } from './language';
import type { SourceLanguage } from './language';
import { ContentBox, CenteredBox, SettingsGrid, SettingTitle, StyledSelect, StyledRadio } from './Container';
import Notification from './Notification';
import { HotkeyInput } from './HotkeyInput';

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const { source, target } = useAppSelector((state) => state.language);
  const { isConnected, decks, selectedDeck } = useAppSelector((state) => state.anki);
  const [availableTargets, setAvailableTargets] = useState<{ code: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    dispatch(initializeLanguage());
    dispatch(initializeAnki());
    dispatch(pollAnkiConnection());
    pollRef.current = setInterval(() => dispatch(pollAnkiConnection()), 3000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [dispatch]);

  useEffect(() => {
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
        dispatch(createNotification('Language pair not available, switched to English', 3));
      }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [source]);

  const handleSourceChange = (value: string) => {
    dispatch(saveLanguage({ source: value as SourceLanguage, target }));
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(saveLanguage({ source, target: e.target.value }));
  };

  return (  
    <ContentBox style={{ padding: '1rem 0.75rem', border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: '#f5f5f5' }}>
      <SettingsGrid>
        <SettingTitle>Recognize:</SettingTitle>
        <RadioGroup 
          value={source as string} 
          onChange={handleSourceChange}
        >
          <Stack direction="row" spacing={4}>
            {SOURCE_LANGUAGES.map((lang) => (
              <StyledRadio 
                key={lang.code} 
                value={lang.code} 
                colorScheme="teal"
                size="md"
              >
                {lang.label}
              </StyledRadio>
            ))}
          </Stack>
        </RadioGroup> 

        <SettingTitle>Translate to:</SettingTitle>
        <StyledSelect
          size={'sm'} 
          value={target as string}
          onChange={handleTargetChange}
          focusBorderColor="teal"
          isDisabled={loading}
        >
          {availableTargets.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </StyledSelect>

        <SettingTitle>Hotkey cmd:</SettingTitle>
        <SettingTitle>
          <HotkeyInput />
        </SettingTitle>

        <SettingTitle>Anki deck:</SettingTitle>
        <StyledSelect
          size={'sm'}
          value={selectedDeck}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(saveAnkiDeck(e.target.value))}
          focusBorderColor="teal"
          isDisabled={!isConnected}
        >
          {isConnected && decks.length > 0
            ? decks.map((deck) => (
                <option key={deck} value={deck}>{deck}</option>
              ))
            : <option value={selectedDeck}>{selectedDeck}</option>
          }
        </StyledSelect>
      </SettingsGrid>
      <CenteredBox>
        <Notification />
      </CenteredBox>
    </ContentBox>
  );
}
