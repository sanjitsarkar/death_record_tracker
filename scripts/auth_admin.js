
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const logoutButton = document.querySelector('#logout');
const logout = document.querySelector('.logged-out');

const account = document.querySelector('.account');

const accountEmail = document.querySelector('#account_email');
const accountName = document.querySelector('#account_name');
const error = document.querySelector('#error');
const deathRecordWrapper = document.querySelector('.death-record-wrapper');

var firestore = firebase.firestore()
auth.onAuthStateChanged(user=>
{
 
    if(user)
    {
        console.log(user)
        logout.style.display = "block";
        account.style.display = "block";
        login.style.display = "none";
        signup.style.display = "none";
        deathRecordWrapper.style.display = "block";
        firestore.collection("users").doc(user.uid).get().then((data)=>
        {
            accountName.textContent = data.data().fullName
        })
       
        accountEmail.textContent = user.email;
        
        
       
        
    }else{
        signup.style.display = "block";
        login.style.display = "block";
    logout.style.display = "none";
    account.style.display = "none";
    deathRecordWrapper.style.display = "none";

    }
});
logoutButton.addEventListener('click',()=>
{
    auth.signOut();
})
signupForm.addEventListener('submit',(e)=> {

    e.preventDefault();

//get user info
const email = signupForm['signup-email'].value;

const password= signupForm['signup-password'].value;
const fullName= signupForm['signup-full-name'].value;

error.innerHTML = ""
// console.log(email+password)
if(email==="" || password==="" || fullName==="")
{
    error.innerHTML = "Please don't keep the input field empty."
}
else{
// signup the user
auth.createUserWithEmailAndPassword(email, password).then(cred =>{

    console.log(cred.user);
   
   
    

    firestore.collection("users").
    doc(cred.user.uid).
    set({
        fullName:fullName,
        email:email,
        isAdmin:true
    }).then((data)=>
    {
        error.innerHTML = "Successfull"

    }).catch((err)=>
    {
        error.innerHTML = err.message

    })
    //close the signup Modal & reset form
    const modal= document.querySelector('#Modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    user = auth.currentUser;
  
    

}).catch(err=>
    {
        // console.log(err.message)
error.innerHTML = err.message
    });
}




});
loginForm.addEventListener('submit',(e)=> {

    e.preventDefault();

//get user info
const email = loginForm['login-email'].value;

const password= loginForm['login-password'].value;
    
// console.log(email+password)
if(email==="" || password==="")
{
    error.innerHTML = "Please don't keep the input field empty."
}
else
{
    // firestore.collection("users").where()
auth.signInWithEmailAndPassword(email, password).then(cred =>{

    console.log(cred.user);

    //close the signup Modal & reset form
    const modal= document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    user = auth.currentUser;

error.innerHTML = ""


}).catch(err=>
    {
        console.log(err.message)
error.innerHTML = err.message
    });
}




});