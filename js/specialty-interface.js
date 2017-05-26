var Specialty = require('./../js/specialty.js').specialtyModule;

var dropDown = function(specialties) {
  specialties.forEach(function(specialty) {
    $('#specialty').append(`<option value='${specialty.uid}'>${specialty.actor}</option>`);
  });
};

var specialDocs = function(doctors) {
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
  var specialDoctors = new Specialty();
  specialDoctors.specializations(dropDown);
  $('#specialty-form').submit(function(e){
    e.preventDefault();
    specialty = $('#specialty').val();
    specialDoctors.specialSearch(specialty, specialDocs);
    $('.results').show();
  });
});
