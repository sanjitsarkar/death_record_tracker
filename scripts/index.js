
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    
  });
