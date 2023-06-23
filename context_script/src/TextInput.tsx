import { useEffect, useRef, useState } from "react";
import { ContentSpan, EditDiv, EditSpan, EditTextarea, InputP, KanjiForm, SaveCloseDiv, SaveCloseSpan } from "./Container";
import { Player } from "./Player";
import store from "./store.js";
import { requestJpAnnotation, requestJpAudio, requestTranslation } from "./messages";
import { initializeTranslation } from "./reducers/translationReducer";
import { initializeAudio } from "./reducers/audioReducer";
import { initializeJpAnnotation } from "./reducers/jpAnnotationReducer";
import { initializeVision } from "./reducers/visionReducer";
import { EditButton } from "./Buttons";
import { useAppSelector } from "./hooks";

export function TextInput() {
    const reduxVision: any = useAppSelector((state) => state.vision) 

    const [input, setInput] = useState(false)
    const [value, setValue] = useState(reduxVision)

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const pRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        textareaRef.current!.style.height = "0px";
        const scrollHeight = textareaRef.current?.scrollHeight;
        textareaRef.current!.style.height = scrollHeight + "px";
    }, [value]);
    
    const handleInputClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setInput(!input)
        setTimeout(() => {
            const length = value.length
            textareaRef?.current?.setSelectionRange(length, length);
            textareaRef?.current?.focus?.() 
          }, 500) // TODO try refactor
    } 

    const handleEditClick = async ( event: { preventDefault: () => void; }) => {
        event.preventDefault()
        // console.log('tryin translation edit', value)
        try {
        store.dispatch(initializeVision(value)) 
        const resTranslation = await requestTranslation(value)  
        store.dispatch(initializeTranslation(resTranslation)) 
        const resJpAnnotation = await requestJpAnnotation()
        store.dispatch(initializeJpAnnotation(resJpAnnotation)) 
        const resAudio = await requestJpAudio() 
        store.dispatch(initializeAudio(resAudio)) 
        setInput(!input) 
        } catch (error) {
            console.log(error)
        }
    } // edit req kanji

    return (
    <div>
        <EditDiv
        ref={pRef}
        input={input}>
            <InputP>
            {(reduxVision)} &nbsp; 
                <EditSpan 
                input={input}>
                    <Player /> 
                    &nbsp;
                    <EditButton onClick={handleInputClick}>
                        <ContentSpan>
                            edit
                        </ContentSpan>
                    </EditButton>
                </EditSpan>
            </InputP>
        </EditDiv>
    {/* show / hide */}
        <SaveCloseDiv
        input={input}>
            <KanjiForm 
            action="">
                <EditTextarea 
                ref={textareaRef}
                autoFocus
                defaultValue={reduxVision} 
                onChange={(e) => (setValue(e.target.value))}/>
                <SaveCloseSpan 
                input={input}>
                    <InputP>
                        <EditButton onClick={handleInputClick}>
                            <ContentSpan>
                                cancel
                            </ContentSpan>
                        </EditButton>
                        &nbsp;
                        <EditButton 
                        onClick={handleEditClick}> 
                            <ContentSpan>
                                save
                            </ContentSpan>
                        </EditButton>
                    </InputP>
                </SaveCloseSpan>
            </KanjiForm>                            
        </SaveCloseDiv> 
    </div>
    )
}
