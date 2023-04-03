const registerform = document.getElementById('registerform')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const ConfirmPassword = document.getElementById('ConfirmPassword')

registerform.addEventListener('submit', (e) => {
    e.preventDefault();     // prevent the event from submitting

    validateInputs();
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}

const isValidEmail = email => {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return regex.test(String(email).toLowerCase())
}

const isValidPassword = password => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};

function validateInputs() {
    // get the values from the inputs
    const usernameValue = username.value.trim(); // remove the white space
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const ConfirmPasswordValue = ConfirmPassword.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is REQUIRED!')
    } else {
        // add success class
        setSuccess(username)
    }

    if (emailValue === '') {
        // show error
        setError(email, 'Email is REQUIRED!')
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please provide a valid email address.')
    } else {
        setSuccess(email)
    }

    if (passwordValue === '') {
        setError(password, 'Password is REQUIRED!')
    } else if (!isValidPassword(passwordValue)) {
        setError(password, 'Please provide a valid password')
    } else {
        setSuccess(password)
    }

    if (ConfirmPasswordValue === '') {
        // show error
        setError(ConfirmPassword, 'Confirm Password is REQUIRED!')
    } else if (passwordValue !== ConfirmPasswordValue) {
        setError(ConfirmPassword, 'Confirm Password does not match')
    } else {
        setSuccess(ConfirmPassword)
    }

    // check if all inputs are successful
    const inputs = [username, email, password, ConfirmPassword];
    const allInputsSuccessful = inputs.every(input => input.parentElement.classList.contains('success'));

    if (allInputsSuccessful) {
        registerform.submit(); // submit the form
    }
}

ConfirmPassword.addEventListener('input', () => {
    validateInputs();
});
