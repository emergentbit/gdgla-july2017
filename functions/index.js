const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

const url = functions.config().meetup.url

admin.initializeApp(functions.config().firebase);

exports.getMeetupDataForGDGLA = functions.https.onRequest((req, res) => { 

  axios({
      method: 'get',
      url: functions.config().meetup.url
    })
    .then(function(responseData) {
      let data = responseData.data;
      return admin.database().ref(`/meetup/gdgla`).set(data,function(error){
        if(!error){
          console.log("Successfully set data.")
          res.status(200).send('Success!');
        } else {
          console.error(error);
          res.status(500).send('Failure!');
        }
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failure!');
    })
});

exports.processData = functions.database.ref(`/meetup/gdgla`)
  .onWrite(event => {

    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log('processing started...');

    original.forEach(function(e){
      const eventData = {
        name: e.name,
        desc: e.description,
        groupName: e.group.name,
        address: `${e.venue.address_1}, ${e.venue.city} ${e.venue.state} - ${e.venue.name}`,
        maxSize: e.rsvp_limit,
        registered: e.yes_rsvp_count
      }
      admin.database().ref(`/v1/sets/gdgla/events/${e.id}`).set(eventData, function (error) {
        if(error) {
          console.error(error);
        } else {
          console.log("Set data written.")
        }
      });
    });
  });