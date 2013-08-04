jquery.mloverlay
================

A simple, lightweight jQuery plugin for showing modal less overlays.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.mloverlay.js"></script>
```
Include jquery.cookie *before* jquery.mloverlay if you want to save overlay visibilitie:
```html
<script src="/path/to/jquery.cookie.js"></script>
<script src="/path/to/jquery.mloverlay.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Features

- Developer friendly - Extensible through callbacks to make anything (gallery slideshows, video-conferencing, ajax, etc.) possible
- User friendly - Restoring previously shown overlays through use of cookies
- Designer friendly - Use *your* HTML+CSS for Layout and Styling
- Translator/i18n friendly - No hardcoded English strings 
- Support of multiple overlays on one page
- Support of various close triggers (toggle overlay, button, outside click, escape key)
- Support of ignored elements that should not close the overlay

## Usage

> Typically for showing additional informations, choosing search options or what-have-yous to your website you must;;

1.  **Add overlay placeholder(s) to your page.** Overlay placeholders are usually hidden \<div> containers. CSS is used for styling and positioning. Dialogs are displayed("shown") when a trigger event occurs.

2.  **Initialize your overlay(s).** mlOverlay must be called on each dialog element before it can be shown using the $.mlOverlay() function. You can customize your overlay by passing parameters as an argument (e.g. $('#overlay').mlOverlay({saveState: true, trigger: '#showOverlayButton'});).  

3.  **Trigger your overlay.** Overlays are automatically shown when a "trigger" element is clicked. You can also manually trigger a overlay by executing the $.mlOverlay('show') function on it.

## Reference

### Parameters

- **ignore**
- **target**
- **closeOnOutsideClick**
- **closeOnTargetCLick**
- **closeOnEsc**
- **saveState**

### Functions

- **show**
- **hide**

### Events

- **onShow**
- *onHide*