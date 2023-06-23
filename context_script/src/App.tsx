import React from "react";
import { useState, useEffect } from "react";
import { CloseButton, Loader, Close, Spinner }  from "./Buttons";
import { ZoneContainer, ContentBox, ButtonColumn, BlankColumn, ContentP, InfoP, BottomDiv } from "./Container";
import { deInit } from "./init";
import { useAppSelector } from "./hooks"; 
import { KanjiTiles } from "./KanjiTiles";
import { TextInput } from "./TextInput";
import store from "./store";
import { initializeVision } from "./reducers/visionReducer";
import { requestJpAnnotation, requestJpAudio, requestTranslation, requestVision } from "./messages";
import { initializeTranslation } from "./reducers/translationReducer";
import { initializeJpAnnotation } from "./reducers/jpAnnotationReducer";
import { initializeAudio } from "./reducers/audioReducer";
import { AddAnki } from "./AddAnki";
import Notification from "./Notification";

const App = () => { 
  const reduxVision = useAppSelector((state) => state.vision) 
  const reduxTranslation = useAppSelector((state) => state.translation) 
  const reduxJpAnnotation = useAppSelector((state) => state.jpAnnotation) 
  const reduxAudio = useAppSelector((state) => state.audio) 
  const coords = useAppSelector((state) => state.coords)
  const [loading, setLoading] = useState(true)
  const [render, setRender] = useState(false)

  useEffect(() => {
    const init = async () => {
      // console.log("init request")
        try {
        const resVision = await requestVision(coords.x1, coords.y1, coords.x2, coords.y2)  
        store.dispatch(initializeVision(resVision)) 
        const resTranslation = await requestTranslation(undefined) // optional arg if edit in TextInput
        store.dispatch(initializeTranslation(resTranslation)) 
        const resJpAnnotation = await requestJpAnnotation()
        store.dispatch(initializeJpAnnotation(resJpAnnotation)) 
        const resAudio = await requestJpAudio() 
        store.dispatch(initializeAudio(resAudio)) 
        setLoading(false)
        } catch (error) {
          console.log('error', error)
        }
    }
    init()
  },[])

  useEffect(() => {
    if (!loading && (
      reduxVision !== "No text detected." 
      && reduxVision !== "Japanese text not detected." 
      && reduxVision !== "API key not valid. Please pass a valid API key." 
      && reduxVision !== "Defauil API key limits exhausted.") ) {
      setRender(true)
    }
  },[loading])

  // console.log(
  //   "resVision", reduxVision, 
  //   "resTranslation", reduxTranslation, 
  //   "resJpAnnotation", reduxJpAnnotation, 
  //   'resAudio', reduxAudio)

  return (
<>
  <ZoneContainer>
        <ContentBox>
        <Notification /> 
          {
            (() => {
              if(loading) {
                      return (
                        <div style={{padding: '5px'}}>
                          <Spinner />
                        </div>
                      )
                  } else if (reduxVision === "No text detected.") {
                      return (
                        <BottomDiv>
                          <InfoP>detected text</InfoP>
                          <ContentP>No text detected. Try to crop larger text portion.</ContentP>
                        </BottomDiv>
                      )
                  } else if (reduxVision === "Japanese text not detected.") {
                      return (
                        <BottomDiv>
                          <InfoP>detected text</InfoP>
                          <ContentP>Japanese text not detected or misjudjed as Chinese. Try to crop larger text portion.</ContentP>
                        </BottomDiv>
                      )
                  } else if (reduxVision === "API key not valid. Please pass a valid API key.") {
                      return (
                        <BottomDiv>
                          <InfoP>error</InfoP>
                          <ContentP>You need to provide a valid API key. See instruction in "Why API key?" tab.</ContentP>
                        </BottomDiv>
                      )
                  } else if (reduxVision === "Defauil API key limits exhausted.") {
                      return (
                        <BottomDiv>
                          <InfoP>error</InfoP>
                          <ContentP>API key limits exhausted. Please check key usage.</ContentP>
                        </BottomDiv>
                      ) // no kanji
                  } else {
                      return (
                        <>
                          <BottomDiv>
                            <InfoP>detected text</InfoP>
                            <TextInput />
                          </BottomDiv>
                          <BottomDiv>
                            <InfoP>translation</InfoP>
                            <ContentP key={reduxTranslation}>
                              {(reduxTranslation)}
                            </ContentP>
                          </BottomDiv>
                          <KanjiTiles />
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
              {!render ?  null : <AddAnki />}
        </ButtonColumn>
  </ZoneContainer>
</>
  )
}

export default App;
