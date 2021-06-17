


const deathRecord = document.querySelector('.death-record');
const filter = document.querySelector('#filter');
async function init()
{
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
        console.log(querySnapshot.docs.length)
    querySnapshot.forEach((doc) => {

        content.innerHTML=`<li>
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
  
               
              
                   <button class="btn green darken-2 z-depth-0 approve" value="" style="display:none">Approve</button>
                   <button class="btn red darken-2 z-depth-0 resubmit" value="" style="display:none">Resubmit</button>
               
                   </form>
                
               
                </div>
              </li>
            </ul>`
       
        var approve = document.querySelector('.approve')
        var resubmit = document.querySelector('.resubmit')
      
        if(doc.data().isResubmit)
        {
            resubmit.style.display = "none"
    
        }
        else{
            resubmit.style.display = "inline"
            
        }
        if(doc.data().isApproved)
        {
    approve.style.display = "none"
    resubmit.style.display = "none"
    

        }
        else{
            approve.style.display = "inline"
    
        }
        approve.addEventListener('click',(e)=>
        { 
            e.preventDefault()
    
        firestore.collection("death_records").doc(doc.id).update({
    isApproved:true
    
        }).then(()=>{}).catch((err)=>
            {
            })
            
    
        })
        resubmit.addEventListener('click',(e)=>
        {
            e.preventDefault()
    
            firestore.collection("death_records").doc(doc.id).update({
    isResubmit:true
    
            }).then(()=>{}).catch((err)=>
            {
    
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
init()