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
           
           <span>

         
           </span>
          
            
           
            </div>
            <button class="btn green darken-2 z-depth-0" value="">Approve</button>
            <button class="btn red darken-2 z-depth-0" value="">Resubmit</button>
          </li>
        `
        
    }
    )

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});

