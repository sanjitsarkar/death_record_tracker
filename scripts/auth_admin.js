
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
const chart = document.querySelector('.death-record-statistics')
const preloader = document.querySelector('.preloader')

var firestore = firebase.firestore()
function startPreLoading()
{
  preloader.style.display="block"
}
function stopPreLoading()
{
  preloader.style.display="none"
}
startPreLoading()
auth.onAuthStateChanged(
    async(user)=>
{
 stopPreLoading()
    if(user)
    {
        console.log(user)
        logout.style.display = "block";
        account.style.display = "block";
        login.style.display = "none";
        signup.style.display = "none";
        chart.style.display = "block";
        deathRecordWrapper.style.display = "block";
        await initChart()
        await initDeathRecord()
        firestore.collection("users").doc(user.uid).get().then((data)=>
        {
            accountName.textContent = data.data().fullName
        })
       
        accountEmail.textContent = user.email;
        
        
       
        
    }else{
        chart.style.display = "none";
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
    document.querySelector('.signup_btn').disabled = true
    e.preventDefault();
    document.querySelector('.signup_btn').innerHTML=`<div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
    </div>` 
//get user info
const email = signupForm['signup-email'].value;

const password= signupForm['signup-password'].value;
const fullName= signupForm['signup-full-name'].value;

error.innerHTML = ""
// console.log(email+password)

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
    document.querySelector('.signup_btn').disabled = false
    
    document.querySelector('.signup_btn').innerHTML="Signup"
    

}).catch(err=>
    {
        // console.log(err.message)
    document.querySelector('.signup_btn').disabled = false

        document.querySelector('.signup_btn').innerHTML = 'Signup'

error.innerHTML = err.message
    });





});
loginForm.addEventListener('submit',(e)=> {
    document.querySelector('.login_btn').disabled = true

    e.preventDefault();
    document.querySelector('.login_btn').innerHTML=`<div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
    </div>` 
//get user info
const email = loginForm['login-email'].value;

const password= loginForm['login-password'].value;
    
// console.log(email+password)

    // firestore.collection("users").where()
auth.signInWithEmailAndPassword(email, password).then(cred =>{

    console.log(cred.user);

    //close the signup Modal & reset form
    const modal= document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    user = auth.currentUser;
    document.querySelector('.login_btn').disabled = false

    document.querySelector('.login_btn').innerHTML = 'Login'

error.innerHTML = ""


}).catch(err=>
    {

    document.querySelector('.login_btn').disabled = false

        document.querySelector('.login_btn').innerHTML = 'Login'
        console.log(err.message)
error.innerHTML = err.message
    });





});