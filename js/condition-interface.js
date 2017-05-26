var Doctor = require('./../js/condition.js').doctorModule;

var displayDocs = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`<p><b>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}</b></p>
      <p>Specialty: ${doctor.specialties[0].name}</p>
      <p>Office: ${doctor.practices[0].name}</p>
      <p>Location: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</p>
      <p>Phone: ${doctor.practices[0].phones[0].number}</p>
      <p>Bio: ${doctor.profile.bio}</p><br>
      <img class="bio-pics" src="${doctor.profile.image_url}" alt="dr image"/>
      <hr>`);
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
