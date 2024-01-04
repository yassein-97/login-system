// signUp page
const signUpName = document.querySelector('#nameInput');
const signUpEmail = document.querySelector('#emailInput');
const signUpPassword = document.querySelector("#passwordInput");
const signUpBtn = document.querySelector("#signUpBtn");
const errorUsedEmail = document.querySelector("#errorUsedEmail");
const errorInvalidEmail = document.querySelector("#errorInvalidEmail");
const errorInvalidName = document.querySelector("#errorInvalidName");
const showPassword = document.querySelector("#showPassword");
const hidePassword = document.querySelector("#hidePassword");
const signUpPage = document.querySelector(".signUp");
// login Page
const loginPage = document.querySelector(".login");
const loginEmail = document.querySelector('#userEmail');
const loginPassword = document.querySelector('#userPassword');
const loginBtn = document.querySelector('#loginBtn');
const errorEmptyInputs = document.querySelector('#errorEmptyInputs');
const errorInvalidInputs = document.querySelector('#errorInvalidInputs');
// home page
const homePage = document.querySelector(".home");
const homeMessage = document.querySelector('#homeMessage');
const logoutBtn = document.querySelector('#logoutBtn');

// array of users
let usersList = [];
// let userLogin=0;

// get data from Local Storage
if (localStorage.getItem("users") != null) {
    usersList = JSON.parse(localStorage.getItem("users"));
};

//create new user 
function createNewUser(){
    const user = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    }
    usersList.push(user);
    localStorage.setItem('users',JSON.stringify(usersList));
};

// check if user email and password exist or not
function checkLoginValidation(){
    let email = loginEmail.value;
    let password = loginPassword.value;

    let res = usersList.filter(function(user){
        return user.email == email && user.password == password;
    });
    return res;
    // for(let i=0; i<usersList.length ; i++){
    //     if(usersList[i].email==email && usersList[i].password ==password){
    //         if(i ==0 ){
    //             return true;
    //         }
    //         else{
    //             return i;   
    //         }
    //     }
    // }
    // return false;
}

// while in login page
if(loginPage){
    
    loginBtn.addEventListener('click',function(){
        // if user doesn`t entered any inputs
        if(loginEmail.value =='' || loginPassword.value==''){
            errorEmptyInputs.classList.remove('d-none');
            errorInvalidInputs.classList.add('d-none');
        }
        else{
            let validLogin = checkLoginValidation();
            if(validLogin != 0){
                loginBtn.setAttribute('href','home.html');
                // console.log(validLogin);
                localStorage.setItem('user',JSON.stringify(validLogin));

                errorEmptyInputs.classList.add('d-none');
                errorInvalidInputs.classList.add('d-none');
            }
            else{
                errorInvalidInputs.classList.remove('d-none');
                errorEmptyInputs.classList.add('d-none');
            };  
        }
    });
    showPassword.addEventListener('click',function(){
        loginPassword.setAttribute('type','text');
        showPassword.classList.add('d-none');
        hidePassword.classList.remove('d-none');
    });
    hidePassword.addEventListener('click',function(){
        loginPassword.setAttribute('type','password');
        hidePassword.classList.add('d-none');
        showPassword.classList.remove('d-none');
    });
}

// while in home page
if(homePage){
    if (localStorage.getItem("user") != null) {
        // get the index for login user to show his name
        let userLogin = JSON.parse(localStorage.getItem('user'));
        // case user at index 0
        // if(String(userLogin) == "true"){
        //     homeMessage.innerHTML = `Welcom ${usersList[0].name}`;
        // }
        // // otherwise
        // else{
            homeMessage.innerHTML = `Welcom ${userLogin[0].name}`;
            // console.log(userLogin);
        // }
    };
    // when logout delete userid from localstorage
    logoutBtn.addEventListener('click',function(){
        localStorage.removeItem('user');
    })
}

// validate email inputs
function emailValidation(){
    let regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
     return regx.test(signUpEmail.value);
};
//validate name input
function nameValidation(){
    let regx = /^[A-Z]{1}[a-zA-Z0-9]{2,19}$/;
     return regx.test(signUpName.value);
};

//check if email used alrady or not
function checkEmailExistence(){
    let email = signUpEmail.value;
    for(let i=0; i<usersList.length ; i++){
        if(usersList[i].email==email){
            return false;
        }
    }
    return true;
};

//check if user didn`t enter any inputs
function isNotEmpty(){
    if(signUpName.value =='' || signUpEmail.value =='' || signUpPassword.value ==''){
        errorEmptyInputs.classList.remove('d-none');
        return false;
    }
    else{
        errorEmptyInputs.classList.add('d-none');
        return true;
    }
};

//while in signup page
if(signUpPage){
    signUpBtn.addEventListener('click',()=>{
        if(isNotEmpty() && emailValidation() && checkEmailExistence()){
            createNewUser(); 
            signUpBtn.setAttribute('href','index.html');
        }
    });

    signUpEmail.addEventListener('blur',function(){
        let validEmail = emailValidation();
        if(validEmail){
            signUpEmail.classList.add('is-valid');
            signUpEmail.classList.remove('is-invalid');
            errorInvalidEmail.classList.add('d-none');
        }
        else{
            signUpEmail.classList.remove('is-valid');
            signUpEmail.classList.add('is-invalid');
            errorInvalidEmail.classList.remove('d-none');
        };

        let y =checkEmailExistence();
        if(!y){
            errorUsedEmail.classList.remove('d-none');
            signUpEmail.classList.remove('is-valid');
            signUpEmail.classList.add('is-invalid');
        }
        else{
            errorUsedEmail.classList.add('d-none');
        }
    });
    showPassword.addEventListener('click',function(){
        signUpPassword.setAttribute('type','text');
        showPassword.classList.add('d-none');
        hidePassword.classList.remove('d-none');
    });
    hidePassword.addEventListener('click',function(){
        signUpPassword.setAttribute('type','password');
        hidePassword.classList.add('d-none');
        showPassword.classList.remove('d-none');
    });

    signUpName.addEventListener('blur',function(){
        let validName = nameValidation();

        if(validName){
            signUpName.classList.add('is-valid');
            signUpName.classList.remove('is-invalid');
            errorInvalidName.classList.add('d-none');
        }
        else{
            signUpName.classList.remove('is-valid');
            signUpName.classList.add('is-invalid');
            errorInvalidName.classList.remove('d-none');
        };
    });
};
