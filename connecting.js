// Used to connect to a camera, simulating a loading time. When a connection is established, the user is redirected to the confirmation page.

import wixLocation from 'wix-location';

$w.onReady(function () {

	console.log("Now loading...");
    setTimeout(() => {
		console.log("Now redirecting");
        wixLocation.to("/copy-of-connect1");

    }, 4000);

});
