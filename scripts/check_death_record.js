


const deathRecord = document.querySelector('.death-record');
const filter = document.querySelector('#filter');
async function initDeathRecord()
{
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
var firestore = firebase.firestore()

var querySnapshot
startLoading()
querySnapshot = await firestore.collection("death_records").where("isResubmit","==",false).where("isApproved","==",false).get()
stopLoading()
setUI(querySnapshot)
filter.addEventListener('change',async (data)=>
{
if(filter.value=="isResubmit")
{   
    startLoading()
    
    querySnapshot = await firestore.collection("death_records").where("isResubmit","==",true).get()
    stopLoading()
    
    setUI(querySnapshot)
    console.log("isResubmit")
    
}
else if(filter.value=="isApproved")
{
    
    
    startLoading()
    
    querySnapshot = await firestore.collection("death_records").where("isApproved","==",true).get()
    stopLoading()
    
    setUI(querySnapshot)
    console.log("isApproved")
 

}
else{
    
    startLoading()
    querySnapshot = await  firestore.collection("death_records").where("isResubmit","==",false).where("isApproved","==",false).get()
    stopLoading()
    
    setUI(querySnapshot)
    console.log("Pending")

}

})

  
  

}
function startLoading()
{   
    
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

    if(querySnapshot.docs.length)
    {
        // console.log(querySnapshot.docs.length)
    querySnapshot.forEach((doc) => {

       
       
        console.log(doc.data)
        if(doc.data().isResubmit)
        {
          
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
           
            <input type="number" id="age" name="age" value=${doc.data().age} required />
            <h6>Sex</h6>
           
            <input type="text" id="sex" name="sex" value=${doc.data().sex} required />
         
            
           </p>

       
      
           <button class="btn green darken-2 z-depth-0 approve" value="" style="display:inline">Approve</button>
          
       
           </form>
        
       
        </div>
      </li>
    </ul>`
    
        }
        else if(doc.data().isApproved){
          
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
           
            <input type="number" id="age" name="age" value=${doc.data().age} required />
            <h6>Sex</h6>
           
            <input type="text" id="sex" name="sex" value=${doc.data().sex} required />
         
            
           </p>

       
      
          
       
           </form>
        
       
        </div>
      </li>
    </ul>`
            
        }
       else{
 
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
             
              <input type="number" id="age" name="age" value=${doc.data().age} required />
              <h6>Sex</h6>
             
              <input type="text" id="sex" name="sex" value=${doc.data().sex} required />
           
              
             </p>

             <button class="btn green darken-2 z-depth-0 approve" value="" style="display:inline">Approve</button>
             <button class="btn red darken-2 z-depth-0 resubmit modal-trigger"  data-target="modal-resubmit-reason" value="" style="display:inline">Resubmit</button>
        
             
         
             </form>
          
         
          </div>
        </li>
      </ul>`
    

        }
        var approve = document.querySelector('.approve')
        var resubmit = document.querySelector('.resubmit')
        var resubmit_btn = document.querySelector('.resubmit_btn')
        var resubmission_reason_form = document.querySelector('#resubmission_reason_form')
        approve?.addEventListener('click',(e)=>
        { 
            e.preventDefault()
            approve.disabled = true
            approve.innerHTML = `  <div class="preloader-wrapper small active">
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
        firestore.collection("death_records").doc(doc.id).update({
    isApproved:true
    
        }).then(()=>{

        window.location.reload()

        }).catch((err)=>
            {
                approve.disabled = false
                approve.innerHTML = 'APPROVE'
            })
            
    
        })
        resubmission_reason_form?.addEventListener('submit',(e)=>
        {
            e.preventDefault()
            var resubmissionReason = document.querySelector('#resubmission_reason').value
            resubmit_btn.innerHTML = `  <div class="preloader-wrapper small active">
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
            firestore.collection("death_records").doc(doc.id).update({
    isResubmit:true,
    resubmissionReason
    
            }).then(()=>{
                
                const modal= document.querySelector('#modal-resubmit-reason');
                M.Modal.getInstance(modal).close();
                resubmissionReason.value = ""
                window.location.reload()

            }).catch((err)=>
            {
                resubmit_btn.disabled = false
                resubmit_btn.innerHTML = 'Submit'
            })
    
        })
             
    
    
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
    
    });
}
    else{
        var ul = deathRecord.querySelector('ul')
deathRecord?.removeChild(ul)
        deathRecord.innerHTML = `<h5>Not Available</h5>`  

    }
}
