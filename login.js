// Detects when the user clicks the submit button on the login page and extracts the inputted
// username and password. If an input is blank, the user is told to fill all inputs.
// If all inputs are filled, the data is sent to the server for verification, and the user
// is either logged in or given an error message depending on whether the username and password are correct.

import { authentication } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w('#loginBTN').onClick(() => {
        if ($w('#email').value === '' || $w('#password').value === '') {
            showError('Please fillout all the inputs');
        }

        const email = $w('#email').value;
        const password = $w('#password').value;
        authentication.login(email, password)
        .then(() => {
            wixLocation.to('/')
        })
        .catch(err => {
            showError(err.message);
        });
    })
});

const showError = (error) => {
    $w('#errorMessage').text = error;
    $w('#errorMessage').show();
}
