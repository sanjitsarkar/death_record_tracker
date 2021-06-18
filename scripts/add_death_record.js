async function resubmitForm()
{
  var deathRecordResubmitForm = document.querySelector('#death-record-resubmit-form');


  
const resubmitBtn = document.querySelector('.resubmit');
  deathRecordResubmitForm.addEventListener('submit',async(e)=> {
    // startLoaderResubmit()
    var title = deathRecordResubmitForm["title"].value;
  var name = deathRecordResubmitForm["name"].value;
  var relation = deathRecordResubmitForm["relation"].value;
  var relative_name = deathRecordResubmitForm["relative_name"].value;
  var from = deathRecordResubmitForm["from"].value;
  var to = deathRecordResubmitForm["to"].value;
  var time = deathRecordResubmitForm["time"].value;
  var reason = deathRecordResubmitForm["reason"].value;
  var resident = deathRecordResubmitForm["resident"].value;
  var date = deathRecordResubmitForm["date"].value;
  var sex = deathRecordResubmitForm["sex"].value;
  var age = deathRecordResubmitForm["age"].value;
  e.preventDefault();
  resubmitBtn.disabled = true;
  console.log(age)
  console.log(death_record_id)
  firestore.collection('death_records').doc(death_record_id).update({
    title,name,relation,relative_name,from,to,time,reason,resident,date,age,sex,
    isApproved:false,
    isResubmit:false,
  
  }).then((data)=>
    {
    // stopLoader()
        console.log(data)
        // deathRecordFormError.innerHTML="Success";
        window.location.reload()
  
    }).catch((err)=>
    { 
        // stopLoader()
        // deathRecordFormError.innerHTML=err.message;
    })
  
  
  })
}
async function initForm()
{
const deathRecordForm = document.querySelector('#death-record-form');
const re = document.querySelector('#death-record-form');

const deathRecordFormError = document.querySelector('#error_death_record_form');
const submitBtn = document.querySelector('.submit');

// stopLoader()

deathRecordForm.addEventListener('submit',(e)=> {
    startLoader()
  e.preventDefault();
  submitBtn.disabled = true;
  var title = deathRecordForm["title"].value;
  var name = deathRecordForm["name"].value;
  var relation = deathRecordForm["relation"].value;
  var relative_name = deathRecordForm["relative_name"].value;
  var from = deathRecordForm["from"].value;
  var to = deathRecordForm["to"].value;
  var time = deathRecordForm["time"].value;
  var reason = deathRecordForm["reason"].value;
  var resident = deathRecordForm["resident"].value;
  var date = deathRecordForm["date"].value;
  var sex = deathRecordForm["sex"].value;
  var age = parseInt(deathRecordForm["age"].value);
  deathRecordFormError.innerHTML="";
// console.log(sex)
//   console.log(title+name+relation+relative_name+from+to+time+reason)

var firestore = firebase.firestore()


firestore.collection('death_records').add({
    title,name,relation,relative_name,from,to,time,reason,resident,date,age,sex,
    isApproved:false,
    isResubmit:false,
    authUid:auth.currentUser.uid

}).then((data)=>
    {
    stopLoader()
        console.log(data)
        deathRecordFormError.innerHTML="Success";
        window.location.reload()

    }).catch((err)=>
    { 
        stopLoader()
        deathRecordFormError.innerHTML=err.message;
    })


})


}
function startLoader()
{
    submitBtn.innerHTML=`  <div class="preloader-wrapper small active">
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
function startLoaderResubmit()
{
    resubmitButton.innerHTML=`  <div class="preloader-wrapper small active">
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
function stopLoader()
{
    deathRecordFormError.innerHTML=``
}