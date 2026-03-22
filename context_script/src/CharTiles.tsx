import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { InfoP, KanjiStatP, KanjiTd, KanjiTab, KanjiStatDiv, ContentSpan, KanjiSpan, KanjiCardDiv } from "./Container";
import { EditButton, TileButton } from "./Buttons";
import { useAppSelector } from "./hooks";
import { createNotification } from "./reducers/notificationReducer";
import store from "./store";
import { requestAddAnkiCard } from "./messages";
import type { CharData, AnnotationState } from "./reducers/annotationReducer";

const LABEL_KEYS: Record<string, { header: string; cardButton: string }> = {
    ja: { header: 'overlay.kanjiAnnotation', cardButton: 'overlay.createKanjiCard' },
    zh: { header: 'overlay.hanziAnnotation', cardButton: 'overlay.createHanziCard' },
    ko: { header: 'overlay.hanjaAnnotation', cardButton: 'overlay.createHanjaCard' },
}

interface AddCardResult {
    error?: string
    noteId?: number
}

export function CharTiles() {
    const { t } = useTranslation()
    const [dropdown, setDropdown] = useState<number | null>(null)
    const activeRef = useRef<HTMLDivElement>(null)
    const reduxAnnotation = useAppSelector((state) => state.annotation)
    const fixwidth = { width: `110px` }
    const trStyle = { verticalAlign: `top`, lineHeight: `normal` }

    useEffect(() => {
        activeRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    const labelKeys = LABEL_KEYS[lang] || LABEL_KEYS.ja

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

        const labels: Record<string, string> = {
            picture: t('anki.picture'),
            text: t('anki.text'),
            translation: t('anki.cardTranslation'),
            example: t('anki.example'),
        }
        if (lang === 'ja') {
            labels.frequency = t('overlay.frequency')
            labels.grade = t('overlay.grade')
            labels.jlpt = t('overlay.jlpt')
            labels.on = t('overlay.on')
            labels.kun = t('overlay.kun')
        } else if (lang === 'zh') {
            labels.pinyin = t('overlay.pinyin')
            labels.traditional = t('overlay.traditional')
            labels.simplified = t('overlay.simplified')
        } else {
            labels.romaja = t('overlay.romaja')
            labels.readings = t('overlay.readings')
            labels.pos = t('overlay.pos')
        }

        try {
            const result = await requestAddAnkiCard(kanjiCard, labels) as AddCardResult | undefined

            if (result === undefined) {
                store.dispatch(createNotification('notification.cardNotAdded', 5))
            } else if (result?.error) {
                store.dispatch(createNotification('notification.cardNotAdded', 5))
            } else {
                store.dispatch(createNotification('notification.cardAdded', 5))
            }
        } catch {
            store.dispatch(createNotification('notification.cardNotAdded', 5))
        }
    }

    const renderJA = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.stats')} </KanjiStatP>
                <KanjiStatP>{t('overlay.frequency')}{char.frequency}</KanjiStatP>
                <KanjiStatP>{t('overlay.grade')}{char.grade}</KanjiStatP>
                <KanjiStatP>{t('overlay.jlpt')}{char.jlpt}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.meaning')} </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            <KanjiTd>
                <KanjiStatP>{t('overlay.on')} </KanjiStatP>
                {char.onyomi?.map((o) => <KanjiStatP key={o}>{o}</KanjiStatP>)}
            </KanjiTd>
            <KanjiTd>
                <KanjiStatP>{t('overlay.kun')} </KanjiStatP>
                {char.kunyomi?.map((k) => <KanjiStatP key={k}>{k}</KanjiStatP>)}
            </KanjiTd>
        </>
    )

    const renderZH = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.pinyin')} </KanjiStatP>
                <KanjiStatP>{char.pinyin}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.meaning')} </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            {char.traditional && (
                <KanjiTd>
                    <KanjiStatP>{t('overlay.traditional')} </KanjiStatP>
                    <KanjiStatP>{char.traditional}</KanjiStatP>
                </KanjiTd>
            )}
            {char.simplified && (
                <KanjiTd>
                    <KanjiStatP>{t('overlay.simplified')} </KanjiStatP>
                    <KanjiStatP>{char.simplified}</KanjiStatP>
                </KanjiTd>
            )}
        </>
    )

    const renderKO = (char: CharData) => (
        <>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.romaja')} </KanjiStatP>
                <KanjiStatP>{char.romaja}</KanjiStatP>
            </KanjiTd>
            <KanjiTd style={fixwidth}>
                <KanjiStatP>{t('overlay.meaning')} </KanjiStatP>
                {char.meanings?.map((m) => <KanjiStatP key={m}>{m}</KanjiStatP>)}
            </KanjiTd>
            {char.readings && char.readings.length > 0 && (
                <KanjiTd>
                    <KanjiStatP>{t('overlay.readings')} </KanjiStatP>
                    {char.readings.map((r) => <KanjiStatP key={r}>{r}</KanjiStatP>)}
                </KanjiTd>
            )}
            {char.pos && (
                <KanjiTd>
                    <KanjiStatP>{t('overlay.pos')} </KanjiStatP>
                    <KanjiStatP>{char.pos}</KanjiStatP>
                </KanjiTd>
            )}
        </>
    )

    const renderChar = lang === 'zh' ? renderZH : lang === 'ko' ? renderKO : renderJA

    return (
        <>
            <InfoP>{t(labelKeys.header)}</InfoP>
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
                                ref={dropdown === index ? activeRef : undefined}
                                className={dropdown === index ? 'kanji-dropdown' : 'hidden'}
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
                                        style={{ margin: '5px', position: 'unset' }} 
                                        onClick={() => addCardHandler(char)}>
                                        <ContentSpan>
                                            {t(labelKeys.cardButton)}
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
