$(document).ready(function() {
    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);
    }
    function validateUsername(username) {
        return /^[a-zA-Z]+$/.test(username);
    }
    function validatePassword(password) {
        return password.length >= 6;
    }

    function checkLoginFields() {
        let emailValid = validateEmail($('#email').val());
        let usernameValid = validateUsername($('#username').val());
        let passwordValid = validatePassword($('#password').val());
        let confirmPasswordValid = $('#password').val() === $('#confirm-password').val();

        $('#email-error').text(emailValid ? '' : 'Invalid Northeastern Email').toggleClass('hidden', emailValid);
        $('#username-error').text(usernameValid ? '' : 'Username must contain only letters').toggleClass('hidden', usernameValid);
        $('#password-error').text(passwordValid ? '' : 'Password must be at least 6 characters').toggleClass('hidden', passwordValid);
        $('#confirm-password-error').text(confirmPasswordValid ? '' : 'Passwords do not match').toggleClass('hidden', confirmPasswordValid);
        
        $('#login').prop('disabled', !(emailValid && usernameValid && passwordValid && confirmPasswordValid));
    }

    $('#email, #username, #password, #confirm-password').on('input', checkLoginFields);

    $('#login').click(function() {
        $('#login-page').hide();
        $('#calculator-page').show();
        $('#user-name').text($('#username').val());
    });

    const calculate = (op) => (num1, num2) => {
        if (op === '/' && num2 == 0) return 'Infinity';
        return eval(`${num1} ${op} ${num2}`);
    };

    $('.operation').click(function() {
        let num1 = parseFloat($('#num1').val());
        let num2 = parseFloat($('#num2').val());
        let op = $(this).data('op');
        $('#result').val(calculate(op)(num1, num2));
    });

    let stopwatchRunning = false;
    let elapsedTime = 0;
    let stopwatchInterval;
    
    async function startStopwatch() {
        if (stopwatchRunning) return;
        stopwatchRunning = true;
        let startTime = Date.now() - elapsedTime;
        
        stopwatchInterval = setInterval(async () => {
            elapsedTime = Date.now() - startTime;
            let totalSeconds = Math.floor(elapsedTime / 1000);
            let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            let seconds = String(totalSeconds % 60).padStart(2, '0');
            $('#time').text(`${hours}:${minutes}:${seconds}`);
        }, 1000);
    }
    
    $('#start').click(startStopwatch);
    $('#stop').click(() => { stopwatchRunning = false; clearInterval(stopwatchInterval); });
    $('#reset').click(() => { stopwatchRunning = false; clearInterval(stopwatchInterval); elapsedTime = 0; $('#time').text("00:00:00"); });
});
