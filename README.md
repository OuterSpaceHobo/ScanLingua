# ScanLingua ![icon-32](https://user-images.githubusercontent.com/116193464/229344421-e508bdde-c1dd-428a-85f2-58578a05060c.png)

ScanLingua provides OCR & translation for more that 100 languages and kanji annotation of selected screen areas.

It is great for checking on subtitles, manga panels or any japanese text.

This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba API for kanji annotation (Jotoba takes data from various resources, you can check them out at https://jotoba.de/about).

Demo video: [https://www.youtube.com/watch?v=wZ3lVvQ6_u8](https://youtu.be/SU9TsNvd_OA)

For text recognition and translation ScanLingua use Google Vision and Translation APIs.

This APIs are not free, but provide 1000 free vision requests and 500 000 free character translation per month which should suffice for personal use. API KEY is NOT provided. User need to create appropriate API key.


To-Do list: work on design; fix errors and expand existing functionality; add annotation for chinese and korean languages;

Feedback is highly appreciated!

# How to get API key?
1. Register at https://console.cloud.google.com/ and create a project, in project main menu navigate to "Enabled APIs and services".
<img width="445" alt="Screen Shot 2023-03-31 at 19 35 21" src="https://user-images.githubusercontent.com/116193464/229344629-e2a75fb1-a750-48ab-ae5c-e9098126844d.png">

2. Click "+ Enable APIs and services".
<img width="704" alt="Screen Shot 2023-03-31 at 19 34 02" src="https://user-images.githubusercontent.com/116193464/229344751-aa353353-3859-42ce-a84b-2ab92c325339.png">

3. In opened search field find and enable "Vision API" and "Translation API"
(refer to API setup documentation: https://cloud.google.com/vision/docs/setup#api or https://cloud.google.com/translate/docs/setup#api).

3.1. You DO NOT need to setup google CLI or libraries, just enable needed APIs for created project.

4. It is mandatory to enable billing. Navigate to "Billing" tab from project main menu and follow instructions
(refer to API setup documentation: https://cloud.google.com/vision/docs/setup#billing or https://cloud.google.com/translate/docs/setup#billing).

4.1. Pay attention for APIs usage to not exceed free monthly limits (1000 req for Vision API and 500.000 character translation for Translation API) after trial period to avoid unexpected expenses. 

4.2. To help you track key usage simple hotkey counter is set at extension Home tab.

5. Create API key in project console/credentials (https://cloud.google.com/docs/authentication/api-keys#console)
<img width="871" alt="Screen Shot 2023-03-31 at 19 33 03" src="https://user-images.githubusercontent.com/116193464/229345364-e9d3c8e9-e9ed-41a9-98ff-ce2d8a90b2b7.png">

6. Enter created API key in extention Home tab form.

6.1. Developer don't have access to key, it is stored locally. API availability is not guaranteed.

7. Done.

# Troubleshooting

* If Ctrl+S hotkey don't work try to set it manually at chrome://extensions/shortcuts
* For other questions use links at the extension popup footer.

# License
The scripts and documentation in this project are released under the [MIT License](https://github.com/OuterSpaceHobo/ScanLingua/blob/main/LICENSE).
