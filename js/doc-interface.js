var Doctor = require('./../js/doc.js').doctorModule;

var displayDocs = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`<li>${doctor.profile.last_name}</li>`);
  });
};

$(document).ready(function() {
  var doctor = new Doctor();
  $("#condition-form").submit(function(e){
    e.preventDefault();
    condition = $('#condition').val();
    doctor.doctorSearch(condition, displayDocs);
  });
});
