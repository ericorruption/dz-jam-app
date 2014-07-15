#!/usr/bin/env node

// This will copy all of our assets (Icons, splash screens, etc.) into their appropriate places when we build our app.
// Modify your source dir as needed.

var ncp = require('ncp').ncp,
    transfers = [
      {
        'source': './assets/ios',
        'destination': './platforms/ios/Jam App/Resources'
      },{
        'source': './assets/android',
        'destination': './platforms/android/res'
      }
    ];

ncp.limit = 16;

transfers.forEach(function(transfer) {
  ncp(transfer.source, transfer.destination, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('====== Assets moved from ' + transfer.source + ' to ' + transfer.destination + ' ======');
  });
});