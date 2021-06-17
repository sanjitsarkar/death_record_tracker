const deathRecord = document.querySelector('.death-record');

var firestore = firebase.firestore()


firestore.collection("death_records").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        deathRecord.innerHTML=`

        <ul class="collapsible">
          <li>
            <div class="collapsible-header">${doc.data().name}</div>
            <div class="collapsible-body"><span>
              <form id="death-record-form">
                <div class="input-field">
               <p>I hereby certify that the 
                <input type="text" name="title" id="title" value=${doc.data().title} placeholder="Title" readonly>
      
                </div>
                 <input type="text" name="name" id="name" value=${doc.data().name} placeholder="Name" readonly>
                 <div class="input-field">
                  <input type="text" name="relation" id="relation" value=${doc.data().relation} placeholder="Relation" readonly>
                
             
                
                of
              </div>
                <input type="text" name="relative_name" id="relative_name" value=${doc.data().relative_name} placeholder="Relative name" readonly>
                resident of <input type="text" name="resident" id="resident" value=${doc.data().resident} placeholder="Resident" readonly>
                was under my treatment from <input type="text" value=${doc.data().from} name="from" id="from" placeholder="From" readonly>
                to <input type="text" name="to" id="to" value=${doc.data().to} placeholder="To" readonly>
                and he/she died on <input type="text" name="date" value=${doc.data().date} id="date" readonly>
                at <input type="text" name="time" value=${doc.data().time} id="time" readonly>
             
                <h6>Resaon of death</h6>
                <input type="text" name="reason" id="reason" value=${doc.data().reason} placeholder="Resaon of death" readonly>
        
               </p>
            </span></div>
          
            <button class="btn green darken-2 z-depth-0" value="">Approve</button>
            <button class="btn red darken-2 z-depth-0" value="">Resubmit</button>
           
          
          </li>
        </ul>
        `
    });
});

