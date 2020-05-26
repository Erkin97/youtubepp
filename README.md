# youtube++
A chrome extension to extend YouTube functionality

# Problem

Add modern text and speach recognition features to the YouTube functionality.
Youtube already supports search by voice and auto subtitles. However comments translation (INSTAGRAM comments) and video voice control are not supported.

## Text recognition by Comments Translation

- Decode youtube comments and inject custom button which calls translate api
- Translate api is served by custom express.js server. Look `/api` for code. 
- Demo (

## Command recognition (Not implemented)

- Replace youtube player with custom player for video controlling from code
- Run background script for command recognition using [Web Speach API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
