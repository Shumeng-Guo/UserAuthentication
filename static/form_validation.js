const registerform = document.getElementById('registrationform')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const ConfirmPassword = document.getElementById('ConfirmPassword')

// prevent a form from being submitted until all input fields have been validated
// An event listener is a function that is attached to an HTML element to listen for a specific event on that element, 
// such as a button click, a key press, or a form submission. When the specified event occurs on the element, 
// the event listener is triggered and executes its associated code.
// addEventListener(type, event handler/callback function) 
registerform.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
})

// Add the following event listener outside of the validateInputs() function:
// to validate as soon as the user enters any data into it
username.addEventListener('input', () => {
    validateInputs();
  });

email.addEventListener('input', () => {
    validateInputs();
  });

password.addEventListener('input', () => {
    validateInputs();
  });

ConfirmPassword.addEventListener('input', () => {
    validateInputs();
  });


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

}

