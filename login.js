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