

const deathRecord = document.querySelector('.death-record');

var firestore = firebase.firestore()


firestore.collection("death_records").get().then((querySnapshot) => {
    var ul = document.createElement('ul')
    ul.classList=["collapsible"]
    deathRecord.appendChild(ul)

  querySnapshot.forEach((doc) => {
      
    deathRecord.querySelector('ul').innerHTML+=`<li>
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
        
               </p>
               </form>
           
          
            <button class="btn green darken-2 z-depth-0 approve" value="" style="display:none">Approve</button>
            <button class="btn red darken-2 z-depth-0 resubmit" value="" style="display:none">Resubmit</button>
          
           
            </div>
          </li>
        </ul>`
   
    var approve = document.querySelector('.approve')
    var resubmit = document.querySelector('.resubmit')
    if(doc.data().isApproved)
    {
approve.style.display = "none"
    }
    else{
        approve.style.display = "block"

    }
    if(doc.data().isResubmit)
    {
        resubmit.style.display = "none"

    }
    else{
        resubmit.style.display = "block"
        
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
         
}
)
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});

