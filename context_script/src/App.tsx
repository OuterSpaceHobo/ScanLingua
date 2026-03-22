import { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { CloseButton, Close, DragButton, DragIcon, Spinner }  from "./Buttons";
import { ZoneContainer, ContentBox, ButtonColumn, BlankColumn, ContentP, InfoP, BottomDiv } from "./Container";
import { deInit } from "./init";
import { useAppSelector } from "./hooks"; 
import { CharTiles } from "./CharTiles";
import { TextInput } from "./TextInput";
import store from "./store";
import { initializeVision } from "./reducers/visionReducer";
import { requestAnnotation, requestTranslation, requestVision } from "./messages";
import { initializeTranslation } from "./reducers/translationReducer";
import { initializeAnnotation } from "./reducers/annotationReducer";
import { setVoiceAvailable, setVisionTextForTTS } from "./reducers/audioReducer";
import { initVoiceCheck } from "./tts";
import { AddAnki } from "./AddAnki";
import Notification from "./Notification";
import { SOURCE_LOCALE } from "./language-utils";
import { reactFrame } from "./reactResponce";

const App = () => {
  const { t } = useTranslation()
  const reduxVision = useAppSelector((state) => state.vision)
  const reduxTranslation = useAppSelector((state) => state.translation)
  const coords = useAppSelector((state) => state.coords)
  const [loading, setLoading] = useState(true)
  const [render, setRender] = useState(false)
  const [sourceLang, setSourceLang] = useState('ja')

  useEffect(() => {
    chrome.storage.local.get(["languageConfig"], (result) => {
      const src = result.languageConfig?.source || 'ja'
      setSourceLang(src)
    })
  }, [])

  useEffect(() => {
    const locale = SOURCE_LOCALE[sourceLang] || 'ja-JP'
    return initVoiceCheck(locale, (avail) => store.dispatch(setVoiceAvailable(avail)))
  }, [sourceLang])

  useEffect(() => {
    const init = async () => {
      console.log(`[app] init started`)
      const langResult = await chrome.storage.local.get(["languageConfig"])
      const srcLang = (langResult.languageConfig as Record<string, string>)?.source || 'ja'
      console.log(`[app] languageConfig:`, langResult.languageConfig, `srcLang=${srcLang}`)
      setSourceLang(srcLang)

      let visionOk = false
      try {
        console.log(`[app] requestVision coords:`, coords.x1, coords.y1, coords.x2, coords.y2)
        const resVision = await requestVision(coords.x1, coords.y1, coords.x2, coords.y2)
        console.log(`[app] requestVision result:`, resVision)
        store.dispatch(initializeVision(resVision as string))
        store.dispatch(setVisionTextForTTS(resVision as string))
        visionOk = true
      } catch (e) {
        console.error(`[app] requestVision FAILED:`, e)
        store.dispatch(initializeVision(t('notification.ocrFailed') + String(e)))
      }

      if (visionOk) {
        console.log(`[app] starting translation + annotation requests`)
        await Promise.allSettled([
          requestTranslation(undefined).then(
            (res) => { console.log(`[app] requestTranslation result:`, res); store.dispatch(initializeTranslation(res as string)) },
            (e) => { console.error(`[app] requestTranslation FAILED:`, e); store.dispatch(initializeTranslation(t('notification.translationFailed') + String(e))) }
          ),
          requestAnnotation(srcLang).then(
            (res) => { console.log(`[app] requestAnnotation result:`, res); store.dispatch(initializeAnnotation(res as string)) },
            (e) => {
              store.dispatch(initializeAnnotation(t('notification.noAnnotation')))
              console.error("[app] requestAnnotation FAILED:", e)
            }
          ),
        ])
      }

      console.log(`[app] init complete, loading=false`)
      setLoading(false)
      chrome.runtime.sendMessage({type: "check-support"})
    }
    init()
  },[])

  useEffect(() => {
    if (!loading && (
      reduxVision !== "No text detected."
      && reduxVision !== "Text not detected.") ) {
      setRender(true)
    }
  },[loading])

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!reactFrame) return
    const startX = e.clientX
    const startY = e.clientY
    const origLeft = reactFrame.offsetLeft
    const origTop = reactFrame.offsetTop

    const onMouseMove = (ev: MouseEvent) => {
      if (!reactFrame) return
      reactFrame.style.left = `${origLeft + (ev.clientX - startX)}px`
      reactFrame.style.top = `${origTop + (ev.clientY - startY)}px`
      reactFrame.style.bottom = 'unset'
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  return (
<>
  <ZoneContainer>
        <ContentBox>
        <Notification /> 
          {
            (() => {
              if(loading) {
                      return (
                        <div style={{padding: '5px', height: '85px'}}>
                          <Spinner />
                        </div>
                      )
                  } else if (reduxVision === "No text detected.") {
                      return (
                        <BottomDiv>
                          <InfoP>{t('overlay.detectedText')}</InfoP>
                          <ContentP>{t('overlay.noTextHint')}</ContentP>
                        </BottomDiv>
                      )
                  } else if (reduxVision === "Text not detected.") {
                      return (
                        <BottomDiv>
                          <InfoP>{t('overlay.detectedText')}</InfoP>
                          <ContentP>{t('overlay.textNotDetectedHint')}</ContentP>
                        </BottomDiv>
                      )
                  } else {
                      return (
                        <>
                          <BottomDiv> 
                            <InfoP>{t('overlay.detectedText')}</InfoP>
                            <TextInput />
                          </BottomDiv>
                          <BottomDiv>
                            <InfoP>{t('overlay.translation')}</InfoP>
                            <ContentP key={reduxTranslation}>
                              {(reduxTranslation)}
                            </ContentP>
                          </BottomDiv>
                          <CharTiles />
                        </> 
                      )
                  }
            })()  
          }
        </ContentBox>
        <BlankColumn />
        <ButtonColumn>
              <CloseButton
              onClick={deInit}>
                <Close />
              </CloseButton>
              <DragButton onMouseDown={handleDragStart}>
                <DragIcon />
              </DragButton>
              {!render ?  null : <AddAnki />}
        </ButtonColumn>
  </ZoneContainer>
</>
  )
}

export default App;
