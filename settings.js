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
				$w('#checkbox1').checked = phoneOn;
				$w('#checkbox2').checked = emailOn;
				$w('#input1').value = baby;
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
					"baby": $w('#input1').value
				}
			}
			wixData.save("UserSettings", update)
		})
	});
});

$w('#text21').onClick(function () {
	$w('#text19').hide()
	$w('#text21').hide()
})

$w('#text20').onClick(function () {
	$w('#text20').hide()
	$w('#text22').hide()
})