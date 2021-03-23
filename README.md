# MMM-HTTPMessage
[MagicMirror](https://magicmirror.builders/) The MMM-HTTPMessage module for [MagicMirror](https://magicmirror.builders/) will display a message on your MagicMirror when a [webhook notification](https://en.wikipedia.org/wiki/Webhook) is received. When a webhook notification message is received, then it is displayed fullscreen on the MagicMirror. 

This module is intended to display one message

## Module installation

Clone the module and npm install:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/bassamseif/MMM-HTTPMessage.git
cd MMM-HTTPMessage
npm install
```

Add the module config to `~/MagicMirror/config/config.js`

```javascript
modules: [
    {
        module: 'MMM-HTTPMessage',        
        position: 'fullscreen_above',
        config: { 
        }
    }
]
```

# Sending WebHook Message

You can use CURL for testing, make sure that in the Magic Mirror config you enable the `address` to listen to all interfaces and your device is set on the `ipWhitelist`

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"message": "Your pizza is ready!"}' \
    "http://192.168.1.23:8080/webhook"
```
