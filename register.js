// Used on the register page. On the user attempting to submit their data,
// verifies that all input fields are filled and sends the data to the server.
// If the data is valid and the username is not already taken, the account is created 
// and the user is signed in, else an error is displayed to the user.

import { authentication } from 'wix-members';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
	$w('#registerBTN').onClick(() => {
		if ($w('#fName').value === '' || $w('#lName').value === '' ||
			$w('#email').value === '' || $w('#password').value === '' ||
			$w('#confirmPassword').value === '') {
				showError('Please fillout all the inputs');
			}


		if ($w('#password').value.localeCompare($w('#confirmPassword').value) !== 0) {
			showError('Passwords do not match');
		}

		const email = $w('#email').value;
		const password = $w('#password').value;

		const options = {
			contactInfo: {
 	      		firstName: $w('#fName').value,
 	    		lastName: $w('#lName').value
    		}
		}

		authentication.register(email, password, options)
		.then(() => {
			wixLocation.to('/dashboard')
		})
		.catch(err => {
			showError(err)
		});

		let initialSettings = {
			"userId": email,
			"phone": true,
			"email":true,
			"baby":"",
			"camera1":true,
			"camera2":true
		}
		
		wixData.save("UserSettings", initialSettings)
	})
});

const showError = (error) => {
	if (error.toLowerCase().includes('exists')) {
		error = 'User already exists';
	}

	$w('#errorMessage').text = error;
	$w('#errorMessage').show();
}
