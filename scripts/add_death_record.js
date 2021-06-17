const deathRecordForm = document.querySelector('#death-record-form');
const deathRecordFormError = document.querySelector('#error_death_record_form');

deathRecordForm.addEventListener('submit',(e)=> {

    e.preventDefault();
  var title = deathRecordForm["title"].value;
  var name = deathRecordForm["name"].value;
  var relation = deathRecordForm["relation"].value;
  var relative_name = deathRecordForm["relative_name"].value;
  var from = deathRecordForm["from"].value;
  var to = deathRecordForm["to"].value;
  var time = deathRecordForm["time"].value;
  var reason = deathRecordForm["reason"].value;
  deathRecordFormError.innerHTML="";

//   console.log(title+name+relation+relative_name+from+to+time+reason)
if(title==="",name==="",relation==="",relative_name==="",from==="",to==="",time==="",reason==="")
deathRecordFormError.innerHTML="Please don't leave the input field empty.";
else
{
var firestore = firebase.firestore()


firestore.collection('death_records').add({
    title,name,relation,relative_name,from,to,time,reason,
    isApproved:false,
    isResubmit:false,
    authUid:auth.currentUser.uid

}).then((data)=>
    {
        console.log(data)
        deathRecordFormError.innerHTML="Success";

    }).catch((err)=>
    {
        deathRecordFormError.innerHTML=err.message;
    })
}

})
