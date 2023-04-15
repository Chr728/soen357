// Runs in settings page to detect user input. 
// When the user clicks the save button, the settings are sent
// to the server to be stored. The user may activate or deactivate 
// phone notifications or email notifications. They may also disconnect cameras.
// Finally, the user may change the name of the baby being monitored.
// If no name is set, the name of the baby defaults to "Baby Izzy".

import wixData from 'wix-data';
import wixMembers from 'wix-members';

$w.onReady(function () {
	let query = wixData.query("UserSettings");
	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		query.eq("userId", email).find().then((results) => {
			if(results.items.length > 0) {
				let settings = results.items[0];
				let phoneOn = settings["phone"];
				let emailOn = settings["email"];
				let baby = settings["baby"];
				$w('#checkbox1').checked = phoneOn;
				$w('#checkbox2').checked = emailOn;
				$w('#input1').value = baby;

				let camera1 = settings["camera1"];
				let camera2 = settings["camera2"];

				if (!camera1){
					$w('#text19').hide();
					$w('#text21').hide();
				}

				if (!camera2){
					$w('#text20').hide();
					$w('#text22').hide();
				}
			}
		})
	} );
});

$w('#button1').onClick(function () {
	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		wixData.query("UserSettings").eq("userId", email).find().then((results) => {
			let update;
			if(results.items.length > 0) {
				update = {
					"_id": results.items[0]["_id"],
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value
				}
			}
			else{
				update = {
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value,
					"camera1": results.items[0]["camera1"],
					"camera2": results.items[0]["camera2"]
				}
			}
			wixData.save("UserSettings", update)
		})
	});
});

$w('#text21').onClick(function () {
	$w('#text19').hide();
	$w('#text21').hide();

	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		wixData.query("UserSettings").eq("userId", email).find().then((results) => {
			let update;
			if(results.items.length > 0) {
				update = {
					"_id": results.items[0]["_id"],
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value,
					"camera1": false,
					"camera2": results.items[0]["camera2"]
				}
			}
			else{
				update = {
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value,
					"camera1": false,
					"camera2": results.items[0]["camera2"]
				}
			}
			wixData.save("UserSettings", update)
		})
	});
})

$w('#text22').onClick(function () {
	$w('#text20').hide();
	$w('#text22').hide();

	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		wixData.query("UserSettings").eq("userId", email).find().then((results) => {
			let update;
			if(results.items.length > 0) {
				update = {
					"_id": results.items[0]["_id"],
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value,
					"camera1": results.items[0]["camera1"],
					"camera2": false
				}
			}
			else{
				update = {
					"userId": email,
					"phone": $w('#checkbox1').checked,
					"email": $w("#checkbox2").checked,
					"baby": $w('#input1').value,
					"camera1": results.items[0]["camera1"],
					"camera2": false
				}
			}
			wixData.save("UserSettings", update)
		})
	});
})
