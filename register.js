import { authentication } from 'wix-members';
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

        authentication.login(email, password)
        .then(() => {
            wixLocation.to('/')
        })
        .catch(err => {
            showError(err)
        });
    })
});

const showError = (error) => {
    if (error.toLowerCase().includes('exists')) {
        error = 'User already exists';
    }

    $w('#errorMessage').text = error;
    $w('#errorMessage').show();
}