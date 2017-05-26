var Doctor = require('./../js/doc.js').doctorModule;

var displayDocs = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`<p>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}</p>
      <img class="bio-pics" src="${doctor.profile.image_url}" alt="dr image"/>`);
  });
};

$(document).ready(function() {
  var doctor = new Doctor();
  $("#condition-form").submit(function(e){
    e.preventDefault();
    condition = $('#condition').val();
    doctor.doctorSearch(condition, displayDocs);
    $('.results').show();
  });
});
