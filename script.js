
//login part


function User(username, password, access) {
    this.username = username,
        this.password = password,
        this.access = access;

}

const Accounts = new User(localStorage.getItem('username'), localStorage.getItem('password'),false);
console.log(Accounts.username);
console.log(Accounts.password);


Accounts.access;
const params = new URLSearchParams(window.location.search);
const username = params.get('username');
const password = params.get('password');



if (username != Accounts.username || password != Accounts.password || !Accounts.username || !Accounts.password) {
    if (Accounts.access == false) {
        window.location.replace('login.html');
    }
    else {
        document.getElementById('contentBody').style = `display:block;`;
    }

}

else {
    Accounts.access = true;
    document.getElementById('contentBody').style = `display:block;`;
}









//content part

let accountBalance = parseFloat(localStorage.getItem('balance'));
let newAccountBalance = document.getElementById('accountBalance').textContent = accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
let newbalanceLength;
let depositInput;
let withdrawInput;
if (accountBalance) {
    newAccountBalance = document.getElementById('accountBalance').textContent = accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
} else {
    localStorage.setItem('balance', 0);
    accountBalance = parseFloat(localStorage.getItem('balance'));
    newAccountBalance = document.getElementById('accountBalance').textContent = accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
}




// deposit

function showDepositModal() {
    document.getElementById('depositModal').style = `display:flex`;

}
function hideDepositModal() {
    document.getElementById('depositModal').style = `display:none`;
}



function numPadDepo(number) {
    if (number == 'del') {
        depositInput = document.getElementById('depositInput').value = depositInput.slice(0, -1);
    }
    else {
        depositInput = document.getElementById('depositInput').value += number.toString();
    }

}





function deposit() {
    let newdepositInput = parseFloat(depositInput);
    if (depositInput) {
        let newBalance = newdepositInput + accountBalance;
        localStorage.setItem('balance', newBalance);
        accountBalance = parseFloat(localStorage.getItem('balance'));
        document.getElementById('accountBalance').textContent = accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
        depositInput = document.getElementById('depositInput').value = '';
        hideDepositModal();
        successModal();
    } else {
        errorModal();

    }



}





// withdraw

function showWithdrawModal() {
    document.getElementById('withdrawModal').style = `display:flex`;
    document.getElementById('withdrawInput').type = 'text';
    document.getElementById('withdrawInput').maxLength = newAccountBalance.toString().length;
}
function hideWithdrawModal() {
    document.getElementById('withdrawModal').style = `display:none`;
}


function numPadWithdraw(number) {
    if (number == 'del') {
        withdrawInput = document.getElementById('withdrawInput').value = withdrawInput.slice(0, -1);
        let balanceLength = parseFloat(newAccountBalance.replace(/[^0-9.-]+/g, ''))
        newbalanceLength = balanceLength.toString().length;
        if (withdrawInput.length < newbalanceLength) {
            document.querySelectorAll('#numPad').forEach(element => {
                element.removeAttribute('disabled');
            })
        }
        else {
            document.querySelectorAll('#numPad').forEach(element => {
                element.setAttribute('disabled', true);
            })
        }
    }
    else {

        withdrawInput = document.getElementById('withdrawInput').value += number.toString();
        let balanceLength = parseFloat(newAccountBalance.replace(/[^0-9.-]+/g, ''))
        newbalanceLength = balanceLength.toString().length;
        if (withdrawInput.length < newbalanceLength) {
            document.querySelectorAll('#numPad').forEach(element => {
                element.removeAttribute('disabled');
            })
        }
        else {
            document.querySelectorAll('#numPad').forEach(element => {
                element.setAttribute('disabled', true);
            })
        }
    }

}
function withdraw() {
    let newwithdrawInput = parseFloat(withdrawInput);
    if (newwithdrawInput <= accountBalance) {
        let newBalance = accountBalance - newwithdrawInput;
        localStorage.setItem('balance', newBalance);
        accountBalance = parseFloat(localStorage.getItem('balance'));
        document.getElementById('accountBalance').textContent = accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
        withdrawInput = document.getElementById('withdrawInput').value = '';
        hideWithdrawModal();
        successModal();

    } else {
        errorModal();
    }

}



// success modal
function successModal() {
    document.getElementById('successPopup').style = "display: flex;";
    document.getElementById('successPopup').showPopover();
    setTimeout(() => {
        document.getElementById('successPopup').style = "display:none;";
        let balanceLength = parseFloat(newAccountBalance.replace(/[^0-9.-]+/g, ''))
        newbalanceLength = balanceLength.toString().length;
        document.querySelectorAll('#numPad').forEach(element => {
            element.removeAttribute('disabled');
        })
        window.location.reload();


    }, 1500)
}

//error modal
function errorModal() {
    document.getElementById('errorPopup').style = 'display:flex';
    hideDepositModal();
    setTimeout(() => {
        document.getElementById('errorPopup').style = "display:none;";
    }, 1500)
}

function logout() {
    if (confirm('Are you sure')) {
        document.getElementById('contentBody').style = `display:initial;`;
        Accounts.access = false;
        window.location.replace('login.html');
    }

}


document.getElementById('logout')
