

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
const error_resubmit = document.querySelector('#error_resubmit');
const deathRecord = document.querySelector('.death-record');
// const deathRecordForm = document.querySelector('#death-record-form');
const resubmitButton = document.querySelector('.submit');
const preloader = document.querySelector('.preloader')
var uid = "";
var death_record_id = "";
var firestore = firebase.firestore()
//This method is called on page load  and shows loading icon until dara is completely fetched from database.
function startPreLoading()
{
  preloader.style.display="block"
}
//This method is is called on page load.
function stopPreLoading()
{
  preloader.style.display="none"
}
startPreLoading()
//This is callbak function which triggers on user signin, signup and logout.
auth.onAuthStateChanged(async(user)=>
{
  stopPreLoading()
//When user is logged in or signed in.
    if(user)
    { 
        console.log(user)
        uid = user.uid
        logout.style.display = "block";
        account.style.display = "block";
        login.style.display = "none";
        signup.style.display = "none";
        //Displays loading icon.
        startLoading()
        //Fetch data about death records created by logged in user.
        var data = await firestore.collection("death_records").where("authUid","==",user.uid).get()
        //If data is not empty, then store the id of the respective death record todeath_record_id variable
        death_record_id = data?.docs[0]?.id;
        stopLoading()
        //If there exist any documnets
        if(data.docs.length){
            deathRecord.style.display = "block";
        //If the record has isApproved field as true
        if(data.docs[0].data().isApproved)
        {
            var title = document.createElement('h5')
            title.textContent = "Record is approved"
            deathRecord.appendChild(title)
            //Set the UI for data(death record details) to load
setUI(data)

        }
        //If the record has both isApproved and isResubmit fields as false that means The record is still need approval or pending for approval.

        else if(data.docs[0].data().isApproved==false && data.docs[0].data().isResubmit==false)
        {
            var title = document.createElement('h5')
            title.textContent = "Record is pending for approval"
            deathRecord.appendChild(title)
            //Set the UI for data(death record details) to load

            setUI(data)

        }
        else{

//Else Set The Resubmit Form UI
setResubmitFormUI()
var deathRecordResubmitForm = document.querySelector('#death-record-resubmit-form');

var title = deathRecordResubmitForm["title"];
  var name = deathRecordResubmitForm["name"];
  var relation = deathRecordResubmitForm["relation"];
  var relative_name = deathRecordResubmitForm["relative_name"];
  var from = deathRecordResubmitForm["from"];
  var to = deathRecordResubmitForm["to"];
  var time = deathRecordResubmitForm["time"];
  var reason = deathRecordResubmitForm["reason"];
  var resident = deathRecordResubmitForm["resident"];
  var date = deathRecordResubmitForm["date"];
  var sex = deathRecordResubmitForm["sex"];
  var age = deathRecordResubmitForm["age"];
  var resubmission_reason = document.querySelector('#error_death_record_form')
  // deathRecordFormError.innerHTML="";
  // console.log(sex)
  //   console.log(title+name+relation+relative_name+from+to+time+reason)
  
  //Fetch all the death records created or stored by the logged in user
  var data = await firestore.collection("death_records").where('authUid','==',uid).get()
  data = data.docs[0].data()
  name.value = data.name
  relation.value = data.relation
  relative_name.value = data.relative_name
  from.value = data.from
  to.value = data.to
  reason.value = data.reason
  resident.value = data.resident
  date.value = data.date
  time.value = data.time
  sex.value = data.sex
  age.value = data.age
  var titleSelect = document.getElementById('title');

for(var i, j = 0; i = titleSelect.options[j]; j++) {
    if(i.value == titleSelect.value) {
        titleSelect.selectedIndex = j;
        
M.FormSelect.init(titleSelect); 
        break;
    }
}
    var relationSelect = document.getElementById('relation');
    // console.log(relationSelect.value)

    for(var i, j = 0; i = relationSelect.options[j]; j++) {
        if(i.value == relationSelect.value) {
           
            relationSelect.selectedIndex = j;
            M.FormSelect.init(relationSelect); 
            break;
        }
    }
//Set the resubmission reason
  resubmission_reason.textContent = `Reason for resubmission: ${data.resubmissionReason}`
  //Initialise the death record resubmit form submitting function
  resubmitForm()
        }
        }
        else
        {
        deathRecord.style.display = "block";
      //If there is no death record is created or stored by the logged in user
      //Then set the add death record details form
setFormUI()
  //Initialise the death record form submitting function
initForm()
        }
        //Feth user details from `users` collection and set those details to UI elements.
        var data = await firestore.collection("users").doc(uid).get()
        console.log(uid+data?.data())
        accountName.textContent = data?.data()?.fullName
        
        
        accountEmail.textContent = user.email;
        
    
       
        
    }else{
      //If No user is logged in or signed up or logged out
        signup.style.display = "block";
        login.style.display = "block";
    logout.style.display = "none";
    account.style.display = "none";
    deathRecord.style.display = "none";

    }
});
//Sign out method
logoutButton.addEventListener('click',()=>
{
    auth.signOut();
})
//It triggers when ever user submits the signupForm.
signupForm.addEventListener('submit',async(e)=> {
var signup_error = document.querySelector('#signup_error')
    e.preventDefault();
    document.querySelector('.signup_btn').innerHTML.disabled = true
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
// console.log(email+password)

// signup the user

//It's a firebase predefined function to create an account with email and password as credentials.

auth.createUserWithEmailAndPassword(email, password).then(async(cred) =>{
   
    // console.log(cred.user);
 
    //After creating an account this fuction stores the user's info like name and uid(Unique Id) to Firestore.
    await firestore.collection("users").
    doc(cred.user.uid).
    set({
        
        fullName:fullName,
        email:email,
        isAdmin:false
    })
    //close the signup Modal & reset form
    const modal= document.querySelector('#Modal-signup');
    M.Modal.getInstance(modal).close();
    document.querySelector('.signup_btn').innerHTML.disabled = false

    signupForm.reset();
    user = auth.currentUser;
    
    document.querySelector('.signup_btn').innerHTML = "Signup"

    signup_error.innerHTML = ""

}).catch(err=>
    {
    document.querySelector('.signup_btn').innerHTML.disabled = true
    document.querySelector('.signup_btn').innerHTML = "Signup"

        console.log(err.message)
        signup_error.innerHTML = err.message
    });





});
//It triggers when ever user submits the signupForm.

loginForm.addEventListener('submit',(e)=> {

    e.preventDefault();
    document.querySelector('.login_btn').disabled = true
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

//It's a firebase predefined function to sign in with email and password as credentials.

auth.signInWithEmailAndPassword(email, password).then(cred =>{
   
    // console.log(cred.user);
  

    //close the signup Modal & reset form
    const modal= document.querySelector('#modal-login');
    
    M.Modal.getInstance(modal).close();
    document.querySelector('.login_btn').disabled = false

    loginForm.reset();
    user = auth.currentUser;
   
error.innerHTML = ""
document.querySelector('.login_btn').innerHTML = "Login"

}).catch(err=>
    {
        console.log(err.message)
    document.querySelector('.login_btn').disabled = false

document.querySelector('.login_btn').innerHTML = "Login"

error.innerHTML = err.message
    });




});

// It loads until the death record info is fetched from death_records collection.
function startLoading()
{   
    console.log("Loading")
    deathRecord.innerHTML = `  <div class="preloader-wrapper small active">
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
}
function stopLoading()
{   
    
    deathRecord.innerHTML = ``  
}

function setUI(querySnapshot)
{
   
var ul = document.createElement('ul')
ul.classList=["collapsible"]
deathRecord.appendChild(ul)
const content = deathRecord.querySelector('ul')
//If there exists data queried from database
    if(querySnapshot.docs.length)
    {
       //Iterate through data.
    querySnapshot.forEach((doc) => {

        content.innerHTML+=`<li>
                <div class="collapsible-header">${doc.data().name}</div>
                <div class="collapsible-body">
                  <form id="death-record-form">
                    <div class="input-field inline">
                   <p>I hereby certify that the 
                    <input type="text" name="title" id="title" value=${doc.data().title} placeholder="Title" maxlength="200"  readonly>
          
                    </div>
                     <input type="text" name="name" id="name" value=${doc.data().name} placeholder="Name" maxlength="200" readonly>
                     <div class="input-field inline">
                      <input type="text" name="relation" id="relation" value=${doc.data().relation} placeholder="Relation" maxlength="200" readonly>
                    
                 
                    
                    of
                  </div>
                    <input type="text" name="relative_name" id="relative_name" value=${doc.data().relative_name} placeholder="Relative maxlength="200" name" readonly>
                    resident of <input type="text" name="resident" id="resident" value=${doc.data().resident} placeholder="Resident"maxlength="200"  readonly>
                    was under my treatment from <input type="text" value=${doc.data().from} name="from" id="from" placeholder="From"maxlength="200"  readonly>
                    to <input type="text" name="to" id="to" value=${doc.data().to} placeholder="To" maxlength="200" readonly>
                    and he/she died on <input type="text" name="date" value=${doc.data().date} id="date" maxlength="200" readonly>
                    at <input type="text" name="time" value=${doc.data().time} id="time" maxlength="200" readonly>
                 
                    <h6>Resaon of death</h6>
                    <input type="text" name="reason" id="reason" value=${doc.data().reason} placeholder="Resaon of death" maxlength="200"  readonly>
                    <h6>Age</h6>
                   
                    <input type="number" id="age" name="age" value=${doc.data().age} required readonly/>
                    <h6>Sex</h6>
                   
                    <input type="text" id="sex" name="sex" value=${doc.data().sex} required readonly/>
                 
                    
                   </p>
  
               
              
               
            
               
                   </form>
                
               
                </div>
              </li>
            </ul>`
       
   
             
    
    
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
    
    });
}
    else{
      //If there is nothing found after quering database.
        var ul = deathRecord.querySelector('ul')
deathRecord?.removeChild(ul)
        deathRecord.innerHTML = `<h5>Not Available</h5>`  

    }
}

function setResubmitFormUI()
{
    
    deathRecord.style.display = "block";
    deathRecord.innerHTML = ` <h4>Resubmit Death Record</h4>
    <p class="error pink-text center-align" id="error_death_record_form"></p>

    <form id="death-record-resubmit-form">
      <div class="input-field ">
     <p>I hereby certify that the 
       <select name="title" id="title">
         <option value="Shri">Shri</option>
         <option value="Srimati">Smt</option>
         <option value="Kumar">.Km</option>
       </select>
      </div>
      <div class="input-field ">
  
       <input type="text" name="name" id="name" placeholder="Name" required>
       </div>
       <div class="input-field ">
       <select name="relation" id="relation">
        <option value="son">son</option>
        <option value="wife">wife</option>
        <option value="daughter">daughter</option>
      </select>
      of
    </div>
    <div class="input-field ">
      <input type="text" name="relative_name" id="relative_name" placeholder="Relative name" required>
      
    </div>
    <div class="input-field ">
      resident of
   
      
      <input type="text" name="resident" id="resident" placeholder="Resident" required>
      
    </div>
    <div class="input-field ">
      was under my treatment from <input type="datetime-local" name="from" id="from" placeholder="From" required>
      
</div>
<div class="input-field">

      to <input type="datetime-local" name="to" id="to" placeholder="To" required>
</div>
<div class="input-field">

      and he/she died on <input type="date" name="date" id="date" required>
      at <input type="time" name="time" id="time" required>
</div>
    
      <div class="input-field">
        <input type="text" id="reason" name="reason" required placeholder="Reason of death"/>
      </div>
      <div class="input-field">
        <input type="number" id="age" name="age" required placeholder="Age"/>
      </div>
      <label>
        <input class="with-gap" name="sex" type="radio" value="male" checked/>
        <span>Male</span>
      </label>
      <label>
        <input class="with-gap" name="sex" type="radio"  value="female"/>
        <span>Female</span>
      </label>

     </p>
     
      <button class="btn yellow darken-2 z-depth-0 resubmit">Resubmit</button>
      <p class="error pink-text center-align" id="error_resubmit">Please resubmit the form with correct details</p>
     
    </form>`
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}
function setFormUI()
{
    
    deathRecord.style.display = "block";
    deathRecord.innerHTML = ` <h4>Add Death Record</h4>
    <form id="death-record-form">
      <div class="input-field ">
     <p>I hereby certify that the 
       <select name="title">
         <option value="Shri">Shri</option>
         <option value="Srimati">Smt</option>
         <option value="Kumar">.Km</option>
       </select>
      </div>
      <div class="input-field ">
  
       <input type="text" name="name" id="name" placeholder="Name" required>
       </div>
       <div class="input-field ">
       <select name="relation">
        <option value="son">son</option>
        <option value="wife">wife</option>
        <option value="daughter">daughter</option>
      </select>
      of
    </div>
    <div class="input-field ">
      <input type="text" name="relative_name" id="relative_name" placeholder="Relative name" required>
      
    </div>
    <div class="input-field ">
      resident of
   
      
      <input type="text" name="resident" id="resident" placeholder="Resident" required>
      
    </div>
    <div class="input-field ">
      was under my treatment from <input type="datetime-local" name="from" id="from" placeholder="From" required>
      
</div>
<div class="input-field">

      to <input type="datetime-local" name="to" id="to" placeholder="To" required>
</div>
<div class="input-field">

      and he/she died on <input type="date" name="date" id="date" required>
      at <input type="time" name="time" id="time" required>
</div>
    
      <div class="input-field">
        <input type="text" id="reason" name="reason" required />
        <label for="reason">Reason of death</label>
      </div>
      <div class="input-field">
        <input type="number" id="age" name="age" required />
        <label for="age">Age</label>
      </div>
      <label>
        <input class="with-gap" name="sex" type="radio" value="male" checked/>
        <span>Male</span>
      </label>
      <label>
        <input class="with-gap" name="sex" type="radio"  value="female"/>
        <span>Female</span>
      </label>

     </p>
     
      <button class="btn yellow darken-2 z-depth-0" id="submit">Submit</button>
      <p class="error pink-text center-align" id="error_death_record_form"></p>
  
     
    </form>`
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}