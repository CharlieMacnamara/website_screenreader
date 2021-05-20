# website_screenreader
This is a screen reader built with the Transloadit API that can be plugged into any website. 

## Current State
To use this in it's current state go to index.js and update YOUR_AUTH_KEY, to your Transloadit accounts authentication key.

## Existing site
If you wish to use this in an existing website, copy index.js containing your updated auth key and loader.gif to your website directory, then in your html files header add, `<script src="https://releases.transloadit.com/uppy/robodog/v1.10.7/robodog.min.js"></script>` as well as `<script src="index.js"></script>` at the end of your body tag. 

With that setup you can now the following html to setup your generate text button:
```js
<div class="event_handler">
    <button id="button_event" onclick="runScript().then(console.log).catch(console.error)">Generate</button>
</div>
```

Finally, to select which text you want read out, wrap said text in a div tag with the following dataset like so:
```js
<div data-screenreaderLanguage="en-US">
    <p>Example Text</p>   
</div>

<code> const message = "I won't be included"; </code>

<div data-screenreaderLanguage="en-US">
    <p>
        Example Text 2
    </p>
</div>
```
