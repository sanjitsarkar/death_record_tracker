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
  var age = parseInt(deathRecordResubmitForm["age"].value);
  e.preventDefault();
  resubmitBtn.disabled = true;
  // console.log(age)
  // console.log(death_record_id)
  reason = reason.toLowerCase()
  resident = resident.toLowerCase()
  
  var firestore = firebase.firestore()
  var data_reason = await firestore.collection("reasons").where("reason","==",reason).get()
  var data_resident = await firestore.collection("residents").where("resident","==",resident).get()
  if(data_reason.docs.length == 0)
  {
   await firestore.collection("reasons").add({reason})
  }
  if(data_resident.docs.length == 0)
  {
        await firestore.collection("residents").add({resident})
  }
  //Update the death record having document id as death_record_id
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
// const re = document.querySelector('#death-record-form');
// const deathRecordFormError = document.querySelector('#error_death_record_form');
const submitButton = document.querySelector('#submit');

// stopLoader()

deathRecordForm.addEventListener('submit',async(e)=> {
    // startLoader()
    document.querySelector('#submit').innerHTML=`<div class="preloader-wrapper small active">
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
  e.preventDefault();


submitButton.disabled = true;
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
  // deathRecordFormError.innerHTML="";
// console.log(sex)
reason = reason.toLowerCase()
resident = resident.toLowerCase()

var firestore = firebase.firestore()
var data_reason = await firestore.collection("reasons").where("reason","==",reason).get()
var data_resident = await firestore.collection("residents").where("resident","==",resident).get()
if(data_reason.docs.length == 0)
{
var data = await firestore.collection("reasons").add({reason})
}
if(data_resident.docs.length == 0)
{
var data = await firestore.collection("residents").add({resident})
}
  //Add the death record details
firestore.collection('death_records').add({
    title,name,relation,relative_name,from,to,time,reason,resident,date,age,sex,
    isApproved:false,
    isResubmit:false,
    authUid:uid

}).then((data)=>
    {
    // stopLoader()
        // console.log(data)
        // deathRecordFormError.innerHTML="Success";
      submitButton.disabled = false;
        document.querySelector('#submit').innerHTML='Submit'
        window.location.reload()

    }).catch((err)=>
    { 
      submitButton.disabled = false;
      document.querySelector('#submit').innerHTML='Submit'

        // stopLoader()
        // deathRecordFormError.innerHTML=err.message;
    })


})


}
// function startLoader()
// {

//   submitButton.innerHTML=`  <div class="preloader-wrapper small active">
//     <div class="spinner-layer spinner-green-only">
//       <div class="circle-clipper left">
//         <div class="circle"></div>
//       </div><div class="gap-patch">
//         <div class="circle"></div>
//       </div><div class="circle-clipper right">
//         <div class="circle"></div>
//       </div>
//     </div>
//   </div>`  
// }
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