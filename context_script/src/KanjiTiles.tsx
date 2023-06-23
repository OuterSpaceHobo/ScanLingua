import React, { createRef, useEffect, useRef, useState } from "react";
import { InfoP, KanjiStatP, KanjiTd, KanjiTab, KanjiStatDiv, ContentP, ContentSpan, KanjiSpan, KanjiCardDiv } from "./Container";
import { EditButton, TileButton } from "./Buttons";
import { useAppSelector } from "./hooks";
import { createNotification } from "./reducers/notificationReducer";
import store from "./store";
import { requestAddAnkiCard } from "./messages";
 
    export function KanjiTiles() {
    const [dropdown, setDropdown] = useState(null)
    const reduxJpAnnotation: any = useAppSelector((state) => state.jpAnnotation)
    const fixwidth = { width: `110px` }
    const trStyle = { verticalAlign: `top`, lineHeight: `normal` }
    // const key = crypto.randomUUID() // test

    useEffect(() => {
            const elem = document.getElementById('present-kanji')
            elem?.scrollIntoView({ behavior: 'smooth' });
    }, [dropdown])

    const clickHandler = (index: any) => {
        setDropdown((prev) => {
            return prev === index ? null : index;
        });
        // console.log('clicked', index);
    }

    const addKanjiCardHandler = async (
        literal: any, 
        frequency: any, 
        grade: any, 
        jlpt: any,
        meanings: any,
        onyomi: any,
        kunyomi: any,
        ) => {

        if (kunyomi === undefined) {
            kunyomi = 'n/a'
        }

        const kanjiCard = { literal, frequency, grade, jlpt, meanings, onyomi, kunyomi }
        // console.log('kanjiCard', kanjiCard)
        const AddCardRez: any = await requestAddAnkiCard(kanjiCard)
        // console.log("AddCardRez", AddCardRez)

        if (AddCardRez === undefined) {
          store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
        } else if(AddCardRez?.error !== null) {
          console.log('error', AddCardRez?.error)
        } else {
          store.dispatch(createNotification(`Kanji card succesfully added to default deck.`, 5))
        }
    }

    if (reduxJpAnnotation?.kanji?.length === 0 || 
        reduxJpAnnotation === "no annotation") {
        return null
    }

    return (
        <> 
        <InfoP>
            kanji annotation
        </InfoP>
        <div style={{position: 'relative'}}>
        {(reduxJpAnnotation.kanji?.map((kanji: any, index: any) => {
            return (
            <React.Fragment key={`${kanji.literal}${kanji.frequency}`}> 
                <TileButton
                index={index}
                dropdown={dropdown}
                key={index}
                onClick={() => clickHandler(index)}>
                    <KanjiSpan>
                        {(kanji.literal).replaceAll(`"`,``)}
                    </KanjiSpan>               
                </TileButton>
                {/* dropdown part */}
                <KanjiStatDiv 
                className={dropdown === index ? 'kanji-dropdown' : 'hidden'} 
                id={dropdown === index ? 'present-kanji' : ''}
                index={index}
                dropdown={dropdown}>  
                    <KanjiTab>
                        <tbody>
                            <tr style={trStyle}>
                                <KanjiTd style={fixwidth}>
                                    <KanjiStatP>
                                        Stats: 
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        frequency: {kanji.frequency}
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        grade: {kanji.grade}
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        jlpt: {kanji.jlpt}
                                    </KanjiStatP>
                                </KanjiTd>
                                <KanjiTd style={fixwidth}>
                                    <KanjiStatP>
                                        Meaning: 
                                    </KanjiStatP>
                                    {kanji.meanings?.map((meaning: any) => {
                                        return <KanjiStatP key={meaning}>{meaning}</KanjiStatP>
                                    })}
                                </KanjiTd>
                                <KanjiTd>
                                    <KanjiStatP>
                                        On: 
                                    </KanjiStatP>
                                    {kanji.onyomi?.map((onyomi: any) => {
                                        return <KanjiStatP key={onyomi}>{onyomi}</KanjiStatP>
                                    })}
                                </KanjiTd>
                                <KanjiTd>
                                    <KanjiStatP>
                                        Kun: 
                                    </KanjiStatP>
                                    {kanji.kunyomi?.map((kunyomi: any) => {
                                        return <KanjiStatP key={kunyomi}>{kunyomi}</KanjiStatP>
                                    })}
                                </KanjiTd>
                            </tr>
                        </tbody>
                    </KanjiTab>
                    {/* kanji export part */}
                    <KanjiCardDiv>
                        <EditButton 
                        style={{margin: '5px'}}
                        onClick={
                            () => addKanjiCardHandler(
                        kanji.literal,
                        kanji.frequency,
                        kanji.grade,
                        kanji.jlpt,
                        kanji.meanings?.map((meaning: any) => meaning).toString().replace(/,[s]*/g, ", "),
                        kanji.onyomi?.map((onyomi: any) => onyomi).toString().replace(/,[s]*/g, ", "),
                        kanji.kunyomi?.map((kunyomi: any) => kunyomi).toString().replace(/,[s]*/g, ", ")
                        )}>
                            <ContentSpan>
                                create kanji card
                            </ContentSpan>
                        </EditButton>
                    </KanjiCardDiv>
                </KanjiStatDiv>
            </React.Fragment>
            )
        })
        )}
        </div>
    </>
    )
}
