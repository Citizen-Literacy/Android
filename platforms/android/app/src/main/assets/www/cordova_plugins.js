cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-screen-orientation.screenorientation",
    "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
    "pluginId": "cordova-plugin-screen-orientation",
    "clobbers": [
      "cordova.plugins.screenorientation"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "org.apache.cordova.plugin.speechrecognizer.SpeechRecognizer",
    "file": "plugins/org.apache.cordova.plugin.speechrecognizer/www/SpeechRecognizer.js",
    "pluginId": "org.apache.cordova.plugin.speechrecognizer",
    "clobbers": [
      "navigator.SpeechRecognizer"
    ]
  },
  {
    "id": "cordova-plugin-tts.tts",
    "file": "plugins/cordova-plugin-tts/www/tts.js",
    "pluginId": "cordova-plugin-tts",
    "clobbers": [
      "TTS"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.4",
  "es6-promise-plugin": "4.2.2",
  "cordova-plugin-screen-orientation": "3.0.2",
  "cordova-plugin-device": "2.0.3",
  "org.apache.cordova.plugin.speechrecognizer": "0.2.0",
  "cordova-plugin-tts": "0.2.3"
};
// BOTTOM OF METADATA
});