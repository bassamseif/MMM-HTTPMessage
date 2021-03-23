/* global Module */
/* 
This code was originally written by JC21 https://github.com/jc21/MMM-IFTTT and modified by P J Tewkesbury
*/

Module.register('MMM-HTTPMessage',{

    /**
     * Module config defaults
     */
    defaults: {
           
    },

    /**
     * @var {Object}
     */
    currentNotification: {
        message: ""
    },

    /**
     * @var {Integer}
     */
    currentTimeout: null,

    /**
     * Starting of the module
     */
    start: function() {
        Log.info('[' + this.name + '] Starting');
        this.sendSocketNotification('START', this.config);
    },

    getStyles: function() {
         return [
             'WebHookAlert.css', // will try to load it from the vendor folder, otherwise it will load is from the module folder.            
         ]
    },

    /**
     * @param {String}  notification
     * @param {Object}  payload
     */
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'WEBHOOKALERTS_NOTIFICATION') {
            this.currentNotification = payload;
            this.updateDom();
            this.sendNotification('SCREEN_WAKEUP', true);
            if (payload.sound !==undefined)
                this.sendNotification('PLAY_SOUND', payload.sound);
        }
    },

    // Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
        var messageText = this.currentNotification.message;
		var messageDOM = document.createElement("span");
        messageDOM.appendChild(document.createTextNode(messageText));
		wrapper.appendChild(messageDOM);

		return wrapper;
	},
});
