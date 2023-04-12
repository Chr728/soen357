import wixLocation from 'wix-location';

$w.onReady(function () {

	console.log("Now loading...");
    setTimeout(() => {
		console.log("Now redirecting");
        wixLocation.to("/copy-of-connect1");

    }, 4000);

});