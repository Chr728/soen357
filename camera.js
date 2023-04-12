import wixData from 'wix-data';
import {triggeredEmails} from 'wix-crm';
import wixMembers from 'wix-members';
import wixWindow from 'wix-window';

function doAlert(){
	let query = wixData.query("UserSettings");
	wixMembers.currentMember.getMember().then( (member) => {
		let email = member.loginEmail;
		query.eq("userId", email).find().then( async (results) => {
			if(results.items.length > 0) {
				let settings = results.items[0];
				let phoneOn = settings["phone"];
				let emailOn = settings["email"];

				if(phoneOn){
					wixWindow.openLightbox("Alert");
				}

				if(emailOn){
					triggeredEmails.emailMember("Ta122cc", member._id);
				}		
			}
		})
	});
}

$w.onReady(function () {
	setTimeout(doAlert, 5000);
})