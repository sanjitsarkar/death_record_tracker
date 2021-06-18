const deathRecordForm = document.querySelector('#death-record-form');
const deathRecordFormError = document.querySelector('#error_death_record_form');
stopLoader()
deathRecordForm.addEventListener('submit',(e)=> {
    startLoader()
  // e.preventDefault();
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
if(title===""||name===""||relation===""||relative_name===""||from===""||to===""||time===""||reason===""||date==="")
deathRecordFormError.innerHTML="Please don't leave the input field empty.";
else
{
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

    }).catch((err)=>
    { 
        stopLoader()
        deathRecordFormError.innerHTML=err.message;
    })
}

})

function startLoader()
{
    deathRecordFormError.innerHTML=`  <div class="preloader-wrapper small active">
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