# ScanLingua ![icon-32](https://user-images.githubusercontent.com/116193464/229344421-e508bdde-c1dd-428a-85f2-58578a05060c.png)

ScanLingua provides Japanese text recognition of selected screen areas with translation, kanji annotation and audio.

- Check on subtitles, manga panels or any Japanese text;
- Edit recognized text and alter annotations;
- Create and export kanji cards to Anki via Anki-connect;
- Free and open source.

This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba API for kanji annotation (Jotoba takes data from various resources, you can check them out at https://jotoba.de/about).

Demo video: https://www.youtube.com/watch?v=BbWeflDf8-A

ScanLingua use various Google APIs. Free API key creation is mandatory to use extension functions.

This APIs provide free monthly limits, which should suffice for personal use (e.g. recognition API provide 1000 free requests, translation and text-to-speech provide 500 000 character).

To-Do list: add optional user registration with crop history & stats, fix errors and expand existing functionality;

Feedback is highly appreciated!

# How to get API key?

To use the ScanLingua, you'll need to create a Google API key. Here's how:
1. First, go to the Google Cloud Console website (https://console.cloud.google.com/).
  
2. If you don't already have a Google Cloud account, you'll need to create one. Click the "Get started for free" button and follow the prompts to create an account.
   
3. After logging into the Google Cloud Console, create a new project by clicking on the projects menu in the top navigation bar and then clicking "New Project".
<img width="754" alt="Select a project" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/71504d71-68ef-490b-ab74-90dacfa07849">

4. Give your project a name and click "Create". It may take a few moments to create the project.
<img width="551" alt="New Project" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/633d1eda-3d65-4c7d-bbbb-dbc4b4185802">

5. Once your project is created, you'll need to enable APIs. To do this, navigate to the "APIs & Services Dashboard" by clicking on the hamburger menu in the top left corner of the page and selecting "APIs & Services" > "Dashboard".
<img width="708" alt="APT APIs   Services" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/3e8a48cf-a6e7-4f24-8506-a62dfa5baca5">

6. On the "APIs & Services Dashboard" page, click the “+ Enable APIs and services” button.

7. In the search bar, find and select the "Google Vision API”,  "Google Translation API" and “Google text-to-speech API” and click on each of them to enable them for your project.
<img width="648" alt="Welcome to the API Library" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/12b98e37-2d3a-4d12-b95d-1872ac7477a8">

8. After enabling the APIs, you'll need to create an API key. To do this, go back to the "APIs & Services Dashboard" page and click the "+ Create Credentials" button, then select "API key".
<img width="599" alt="API APIs   Services" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/aab711cf-b616-43d9-85ad-16976803c0f2">

9. Your API key will now be displayed on the screen and in credentials page.

10. Enabling billing is mandatory for the Google APIs to work. To do this, navigate to the "Billing" section of the Google Cloud Console by clicking the "Billing" link in the left sidebar.
<img width="287" alt="Google Cloud" src="https://github.com/OuterSpaceHobo/ScanLingua/assets/116193464/c7c59d25-7205-4731-90c6-d0266347a016">

11. On the "Billing" page, click the "Link a billing account" button.
    
12. If you don't have a billing account yet, you will need to create one. Follow the prompts to set up your billing account.
    
13. Once your billing account is set up, link it to your project by selecting it from the list of available billing accounts and clicking the "Set account" button.
    
14. Enter created API key in extension Home tab form.

Done.

Enabling billing will allow you to use the Google APIs without any quota restrictions, as long as you stay within the free usage limits. You will only be charged if you exceed the free usage limits or if you use any billable features of the APIs.
- Optionally you can specify the enabled APIs that key can call at key tab. 
- Developer don't have access to key, it is stored locally. 


# Troubleshooting

* If Ctrl+Shift+S hotkey don't work try to set it manually at chrome://extensions/shortcuts for "take-screenshot" command.
* For other questions use links at the extension popup footer.

# License
The scripts and documentation in this project are released under the [MIT License](https://github.com/OuterSpaceHobo/ScanLingua/blob/main/LICENSE).
