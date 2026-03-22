import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { InfoP, KanjiStatP, KanjiTd, KanjiTab, KanjiStatDiv, ContentSpan, KanjiSpan, KanjiCardDiv } from "./Container";
import { EditButton, TileButton } from "./Buttons";
import { useAppSelector } from "./hooks";
import { createNotification } from "./reducers/notificationReducer";
import store from "./store";
import { requestAddAnkiCard } from "./messages";
import type { CharData, AnnotationState } from "./reducers/annotationReducer";

interface AddCardResult {
    error?: string
    noteId?: number
}

    export function KanjiTiles() {
    const { t } = useTranslation()
    const [dropdown, setDropdown] = useState<number | null>(null)
    const reduxJpAnnotation = useAppSelector((state) => state.annotation)
    const fixwidth = { width: `110px` }
    const trStyle = { verticalAlign: `top`, lineHeight: `normal` }

    useEffect(() => {
            const elem = document.getElementById('present-kanji')
            elem?.scrollIntoView({ behavior: 'smooth' });
    }, [dropdown])

    const clickHandler = (index: number) => {
        setDropdown((prev) => {
            return prev === index ? null : index;
        });
    }

    const addKanjiCardHandler = async (
        literal: string,
        frequency: number | undefined,
        grade: number | undefined,
        jlpt: number | undefined,
        meanings: string,
        onyomi: string,
        kunyomi: string,
        ) => {

        if (kunyomi === undefined) {
            kunyomi = 'n/a'
        }

        const kanjiCard = { literal, frequency, grade, jlpt, meanings, onyomi, kunyomi }
        try {
            const result = await requestAddAnkiCard(kanjiCard) as AddCardResult | undefined

            if (result === undefined) {
              store.dispatch(createNotification('notification.cardNotAdded', 5))
            } else if (result?.error) {
              store.dispatch(createNotification('notification.cardNotAdded', 5))
            } else {
              store.dispatch(createNotification('notification.kanjiCardAdded', 5))
            }
        } catch {
            store.dispatch(createNotification('notification.cardNotAdded', 5))
        }
    }

    const annotation = reduxJpAnnotation as AnnotationState | string
    if (typeof annotation === 'string' || !('kanji' in annotation) ||
        annotation.kanji?.length === 0) {
        return null
    }

    return (
        <>
        <InfoP>
            {t('overlay.kanjiAnnotation')}
        </InfoP>
        <div style={{position: 'relative'}}>
        {(annotation.kanji?.map((kanji: CharData, index: number) => {
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
                                        {t('overlay.stats')}
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        {t('overlay.frequency')}{kanji.frequency}
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        {t('overlay.grade')}{kanji.grade}
                                    </KanjiStatP>
                                    <KanjiStatP>
                                        {t('overlay.jlpt')}{kanji.jlpt}
                                    </KanjiStatP>
                                </KanjiTd>
                                <KanjiTd style={fixwidth}>
                                    <KanjiStatP>
                                        {t('overlay.meaning')}
                                    </KanjiStatP>
                                    {kanji.meanings?.map((meaning) => {
                                        return <KanjiStatP key={meaning}>{meaning}</KanjiStatP>
                                    })}
                                </KanjiTd>
                                <KanjiTd>
                                    <KanjiStatP>
                                        {t('overlay.on')}
                                    </KanjiStatP>
                                    {kanji.onyomi?.map((onyomi) => {
                                        return <KanjiStatP key={onyomi}>{onyomi}</KanjiStatP>
                                    })}
                                </KanjiTd>
                                <KanjiTd>
                                    <KanjiStatP>
                                        {t('overlay.kun')}
                                    </KanjiStatP>
                                    {kanji.kunyomi?.map((kunyomi) => {
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
                        kanji.meanings?.map((meaning) => meaning).toString().replace(/,[s]*/g, ", "),
                        kanji.onyomi?.map((onyomi) => onyomi).toString().replace(/,[s]*/g, ", ") || '',
                        kanji.kunyomi?.map((kunyomi) => kunyomi).toString().replace(/,[s]*/g, ", ") || ''
                        )}>
                            <ContentSpan>
                                {t('overlay.createKanjiCard')}
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
