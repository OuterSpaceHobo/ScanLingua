import React, { useEffect, useState } from "react";
import { InfoP, KanjiStatP, KanjiTd, KanjiTab, KanjiStatDiv, ContentSpan, KanjiSpan, KanjiCardDiv } from "./Container";
import { EditButton, TileButton } from "./Buttons";
import { useAppSelector } from "./hooks";
import { createNotification } from "./reducers/notificationReducer";
import store from "./store";
import { requestAddAnkiCard } from "./messages";
import type { CharData, AnnotationState } from "./reducers/annotationReducer";

const LABELS: Record<string, { header: string; cardButton: string }> = {
    ja: { header: 'kanji annotation', cardButton: 'create kanji card' },
    zh: { header: 'hanzi annotation', cardButton: 'create hanzi card' },
    ko: { header: 'hanja annotation', cardButton: 'create hanja card' },
}

interface AddCardResult {
    error?: string
    noteId?: number
}

export function CharTiles() {
    const [dropdown, setDropdown] = useState<number | null>(null)
    const reduxAnnotation = useAppSelector((state) => state.annotation)
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

    const annotation = reduxAnnotation as AnnotationState | string
    if (typeof annotation === 'string' || !('lang' in annotation) || annotation.kanji?.length === 0) {
        return null
    }

    const lang = annotation.lang || 'ja'
    const labels = LABELS[lang] || LABELS.ja

    const addCardHandler = async (char: CharData) => {
        let kanjiCard: Record<string, string | number | undefined>
        if (lang === 'ja') {
            kanjiCard = {
                literal: char.literal,
                frequency: char.frequency,
                grade: char.grade,
                jlpt: char.jlpt,
                meanings: char.meanings?.join(', '),
                onyomi: char.onyomi?.join(', '),
                kunyomi: char.kunyomi?.join(', ') || 'n/a',
            }
        } else if (lang === 'zh') {
            kanjiCard = {
                literal: char.literal,
                meanings: char.meanings?.join(', '),
                pinyin: char.pinyin,
                traditional: char.traditional,
                simplified: char.simplified,
            }
        } else {
            kanjiCard = {
                literal: char.literal,
                meanings: char.meanings?.join(', '),
                romaja: char.romaja,
                readings: char.readings?.join(', '),
                pos: char.pos,
            }
        }

        try {
            const result = await requestAddAnkiCard(kanjiCard) as AddCardResult | undefined

            if (result === undefined) {
                store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
            } else if (result?.error) {
                store.dispatch(createNotification(result.error, 5))
            } else {
                store.dispatch(createNotification(`Card succesfully added to selected deck.`, 5))
            }
        } catch {
            store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
        }
    }

    const renderJA = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Stats: </KanjiStatP>
                <KanjiStatP>frequency: {char.frequency}</KanjiStatP>
                <KanjiStatP>grade: {char.grade}</KanjiStatP>
                <KanjiStatP>jlpt: {char.jlpt}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Meaning: </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            <KanjiTd>
                <KanjiStatP>On: </KanjiStatP>
                {char.onyomi?.map((o) => <KanjiStatP key={o}>{o}</KanjiStatP>)}
            </KanjiTd>
            <KanjiTd>
                <KanjiStatP>Kun: </KanjiStatP>
                {char.kunyomi?.map((k) => <KanjiStatP key={k}>{k}</KanjiStatP>)}
            </KanjiTd>
        </>
    )

    const renderZH = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Pinyin: </KanjiStatP>
                <KanjiStatP>{char.pinyin}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Meaning: </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            {char.traditional && (
                <KanjiTd>
                    <KanjiStatP>Traditional: </KanjiStatP>
                    <KanjiStatP>{char.traditional}</KanjiStatP>
                </KanjiTd>
            )}
            {char.simplified && (
                <KanjiTd>
                    <KanjiStatP>Simplified: </KanjiStatP>
                    <KanjiStatP>{char.simplified}</KanjiStatP>
                </KanjiTd>
            )}
        </>
    )

    const renderKO = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Romaja: </KanjiStatP>
                <KanjiStatP>{char.romaja}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>Meaning: </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            {char.readings && char.readings.length > 0 && (
                <KanjiTd>
                    <KanjiStatP>Readings: </KanjiStatP>
                    {char.readings.map((r) => <KanjiStatP key={r}>{r}</KanjiStatP>)}
                </KanjiTd>
            )}
            {char.pos && (
                <KanjiTd>
                    <KanjiStatP>POS: </KanjiStatP>
                    <KanjiStatP>{char.pos}</KanjiStatP>
                </KanjiTd>
            )}
        </>
    )

    const renderChar = lang === 'zh' ? renderZH : lang === 'ko' ? renderKO : renderJA

    return (
        <>
            <InfoP>{labels.header}</InfoP>
            <div style={{ position: 'relative' }}>
                {(annotation.kanji?.map((char: CharData, index: number) => {
                    return (
                        <React.Fragment key={`${char.literal}${index}`}>
                            <TileButton
                                index={index}
                                dropdown={dropdown}
                                key={index}
                                onClick={() => clickHandler(index)}>
                                <KanjiSpan>
                                    {(char.literal).replaceAll(`"`, ``)}
                                </KanjiSpan>
                            </TileButton>
                            <KanjiStatDiv
                                className={dropdown === index ? 'kanji-dropdown' : 'hidden'}
                                id={dropdown === index ? 'present-kanji' : ''}
                                index={index}
                                dropdown={dropdown}>
                                <KanjiTab>
                                    <tbody>
                                        <tr style={trStyle}>
                                            {renderChar(char)}
                                        </tr>
                                    </tbody>
                                </KanjiTab>
                                <KanjiCardDiv>
                                    <EditButton
                                        style={{ margin: '5px' }}
                                        onClick={() => addCardHandler(char)}>
                                        <ContentSpan>
                                            {labels.cardButton}
                                        </ContentSpan>
                                    </EditButton>
                                </KanjiCardDiv>
                            </KanjiStatDiv>
                        </React.Fragment>
                    )
                }))}
            </div>
        </>
    )
}
