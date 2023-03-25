# ScanLingua ![icon-32](https://user-images.githubusercontent.com/116193464/227442669-3b44093f-61e7-48f5-9997-d4b23b01e1d3.png)

ScanLingua provides OCR & translation for more that 100 languages and kanji annotation of selected screen areas.

It is great for checking on subtitles, manga panels or any japanese text.

This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba API for kanji annotation (Jotoba takes data from various resources, you can check them out at https://jotoba.de/about).

DEFAULT_API_KEY is NOT provided in this repo (check service_worker/public/index.js/line 76; service_worker/src/messages.ts/line 17).

Demo video: https://www.youtube.com/watch?v=wZ3lVvQ6_u8

To-Do list: work on design; fix errors and expand existing functionality; add annotation for chinese and korean languages; add Anki integration.

# How to get API key?
1. Register at https://console.cloud.google.com/ and create a project;
2. Enable Vision API https://cloud.google.com/vision/docs/setup and Translation API https://cloud.google.com/translate/docs/setup (you DO NOT need to setup google CLI or libraries, just enable needed APIs for created project);
3. It is mandatory to enable billing, so pay attention to set APIs quotas on free mounthly limits - 1000 req for Vision API and 500.000 character cranslation fot Translation API after trial period to avoid unexpected expenses.
4. Create API key in console/credentials https://cloud.google.com/docs/authentication/api-keys#console;
