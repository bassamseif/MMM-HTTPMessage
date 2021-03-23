/* 
This code was originally written by JC21 https://github.com/jc21/MMM-IFTTT and modified by P J Tewkesbury
*/

'use strict';

const _ = require('lodash');
const NodeHelper = require('node_helper');
const bodyParser = require('body-parser');
const moment = require('moment');
const Mustache = require('mustache');
var url = require('url');

module.exports = NodeHelper.create({
    /**
     * node_helper start method
     */    
    start: function () {
        this.log('Starting node_helper');

        // Create endpoint for Webhook notifications
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));

        //https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#work-item
        this.expressApp.post('/webhook', (req, res) => {

        // Process request.
        this.log('Incoming webhook notification : ' + JSON.stringify(req.body), true);
	    this.log(JSON.stringify(this.config));

            try {
                this.log('Incoming webhook notification '+ JSON.stringify(req.body));
                this.sendSocketNotification('WEBHOOKALERTS_NOTIFICATION', req.body);

                // return OK to caller
                res.status(200)
                    .send({
                        status: 200
                    });
            }
            catch (err) {
                // Return errors to caller
                let final_error = new Error(err);
                res.status(400)
                    .send({
                        status: 400,
                        error: err.message
                    });
            }
        });
    },

    /**
     *
     * @param {String} notification
     * @param {*}      payload
     */
    socketNotificationReceived: function (notification, payload)
	{
	this.log("Socket Notification recevied : "+notification);
        if (notification === 'START') {
            // Load config into this module
            this.config = payload;
	this.log("Config at start "+this.config);
        }
    },

    /**
     * Outputs log messages
     *
     * @param {String}  message
     * @param {Boolean} [debug_only]
     */
    log: function (message) {
        console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] [MMM-WebHookAlert] ' + message);        
    }
});
