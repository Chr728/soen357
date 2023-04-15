// Extracts the name of the baby being monitored, to be displayed on the screen.
// If no baby name is found, the name is defaulted to "Baby Izzy".

import wixData from 'wix-data';
import wixMembers from 'wix-members';

$w.onReady(function () {
	let query = wixData.query("UserSettings");
	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		query.eq("userId", email).find().then((results) => {
			console.log(email);
			console.log(results);
			if(results.items.length > 0) {
				let settings = results.items[0];
				let phoneOn = settings["phone"];
				let emailOn = settings["email"];
				let baby = settings["baby"];
                if (baby == null || baby == "")
                    $w('#text16').text = "Baby Izzy";
                else
				    $w('#text16').text = baby;
			}
		})
	} );
});
