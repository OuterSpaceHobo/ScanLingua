import React from "react";
import { DefaultButton, Loader, Close }  from "./Buttons";
import { ZoneContainer, ContentBox, ButtonColumn, BlankColumn, ContentP } from "./Container";
import { deInit } from "./init";
// import { deReact } from "./reactResponce";

export type RequestVisionCallback = (x1: number, y1: number, x2: number, y2: number) => Promise<any>;
export type RequestTranslationCallback = (translation: string) => Promise<any>;
export type RequestJpAnnotationCallback = (translation: string) => Promise<any>;


type AppProps = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  translation: string;
  jpAnnotation: any;
  requestVision: RequestVisionCallback;
  requestTranslation: RequestTranslationCallback; 
  requestJpAnnotation: RequestJpAnnotationCallback;
};

type AppState = {
  loading: boolean;
  visionDetectResult: any;
  translationResults: any;
  annotationResults: any;
};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    loading: true,
    visionDetectResult: null,
    translationResults: null,
    annotationResults: null,
  };

  componentDidMount() {
    // console.log("componentDidMount called")
    try {
      this.init()
    } catch (error) {
      console.log(error)
    } 
  }

  init = async () => {
    // console.log("init request")
    const resVision = await this.props.requestVision(this.props.x1, this.props.y1, this.props.x2, this.props.y2)
    const resTranslation = await this.props.requestTranslation(this.props.translation) 
    const resJpAnnotation = await this.props.requestJpAnnotation(this.props.jpAnnotation) 
    // console.log("resVision", resVision, "resTranslation", resTranslation, "resJpAnnotation", resJpAnnotation)
    this.setState({loading: false, visionDetectResult: resVision, translationResults: resTranslation, annotationResults: resJpAnnotation})
  }
  
  render() {
    return (
      <ZoneContainer>
      <ContentBox>
        {
          (() => {
            if(this.state.loading) {
                    return (
                      <ContentP>
                        <Loader />
                      </ContentP>
                    )
                } else if (this.state.visionDetectResult === "No text detected.") {
                    return (
                      <div style={{ borderBottom: `1px solid #ddd` }}>
                      <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>detected text</ContentP>
                      <ContentP style={{fontSize: `17px`}}>No text detected.</ContentP>
                    </div>
                    )
                } else if (this.state.visionDetectResult === "API key not valid. Please pass a valid API key.") {
                  return (
                    <div style={{ borderBottom: `1px solid #ddd` }}>
                    <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>error</ContentP>
                    <ContentP style={{fontSize: `17px`}}>You need to provide a valid API key. See instruction in "Why do I need API key?" tab.</ContentP>
                  </div>
                  )
                } else if (this.state.visionDetectResult === "Defauil API key limits exhausted.") {
                  return (
                    <div style={{ borderBottom: `1px solid #ddd` }}>
                    <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>error</ContentP>
                    <ContentP style={{fontSize: `17px`}}>API key limits exhausted. Please check key usage.</ContentP>
                  </div>
                  ) // no kanji
                } else {
                    return (
                      <>
                      <div style={{ borderBottom: `1px solid #ddd` }}>
                        <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>detected text</ContentP>
                        <ContentP style={{fontSize: `17px`}}>{(this.state.visionDetectResult)}</ContentP>
                      </div>
                      <div style={{ whiteSpace: `pre-line`, borderBottom: `1px solid #ddd` }}>
                        <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>translation</ContentP>
                        <ContentP style={{fontSize: `17px`}}>
                        {(this.state.translationResults)}
                      </ContentP>
                      </div>
                        {(this.state.annotationResults.kanji?.map((kanji: any) => {
                          return (
                            <> 
                            <ContentP style={{fontSize: `14px`, width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`, margin: `5px`}}>kanji annotation</ContentP>
                            <table style={{ borderBottom: `1px solid #ddd`, width: `100%`, paddingRight: `5px`, WebkitFontSmoothing: `antialiased`}}>
                            <tbody>
                            <tr style={{verticalAlign: `top`, lineHeight: `normal`}}>
                              <td style={{width: `110px`}}>
                                <ContentP style={{fontSize: `30px`, textAlign: `center`}}>
                                  {(kanji.literal).replaceAll(`"`,``)}
                                </ContentP>
                                <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>frequency: {kanji.frequency}</ContentP>
                                <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>grade: {kanji.grade}</ContentP>
                                <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>jlpt: {kanji.jlpt}</ContentP>
                              </td>
                              <td style={{width: `110px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>Meaning: {kanji.meanings?.map((meaning: any) => {
                                return <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>{meaning}</ContentP>
                              })}</td>
                              <td style={{padding: `2px`, margin: `5px`, textAlign: `center`}}>On: {kanji.onyomi?.map((onyomi: any) => {
                                return <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>{onyomi}</ContentP>
                              })}</td>
                              <td style={{padding: `2px`, margin: `5px`, textAlign: `center`}}>Kun: {kanji.kunyomi?.map((kunyomi: any) => {
                                return <ContentP style={{fontSize: `14px`, padding: `2px`, margin: `5px`, textAlign: `center`}}>{kunyomi}</ContentP>
                              })}</td>
                            </tr>
                            </tbody>
                            </table>
                            </>
                            )
                          })
                        )}
                      </> 
                    )
                }
          })()  
        }
      </ContentBox>
      <BlankColumn />
      <ButtonColumn>
            <DefaultButton 
            onClick={deInit}>
              <Close />
            </DefaultButton>
      </ButtonColumn>
      </ZoneContainer>
    );
  }
}

export default App;
