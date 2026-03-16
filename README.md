# ScanLingua ![icon-32](https://user-images.githubusercontent.com/116193464/229344421-e508bdde-c1dd-428a-85f2-58578a05060c.png)

ScanLingua provides Japanese, Chinese and Korean text recognition of selected screen areas with translation, kanji annotation and audio.

- Check on subtitles, manga panels or any CJK text;
- Edit recognized text and alter annotations;
- Create and export kanji cards to Anki via Anki-connect;
- Free and open source, secure by design;
- Packed with local OCR engine and dictionaries.

Demo video: https://www.youtube.com/watch?v=u-YYc9RSiXo

ScanLingua uses Baidu's PaggleOCR (PP-OCRv5) for recognition and KANJIDIC2, CC-CEDICT, CC-KEDICT dictionaries, licensed under 'CC BY-SA 4.0', for characters annotation. Translation and audio (TTS) are handled by free native chrome APIs.

To-Do list:
- CSS migration - Styled components -> Tailwind;
- Interface localization i18n;
- Advanced setting - local model endpoins option;
- Advanced setting - dictionary annotation translation;
- Local usage statistics page and crop history;

Feedback is highly appreciated!

# Troubleshooting

* If screenshot hotkey don't work try to set it manually at chrome://extensions/shortcuts for "take-screenshot" command.
* For other questions use links at the extension popup footer.

# License
The scripts and documentation in this project are released under the [MIT License](https://github.com/OuterSpaceHobo/ScanLingua/blob/main/LICENSE).

# Appendix

Looking for more?
My other macOS app [ToriOCR](https://github.com/OuterSpaceHobo/tori_ocr) works system-wide (games or other apps), not limited to the browser.