var Specialty = require('./../js/specialty.js').specialtyModule;

var dropDown = function(specialties) {

  specialties.forEach(function(specialty) {
    console.log(`<option>${specialty.actor}</option>`);
    $('#specialty').append(`<option>${specialty.actor}</option>`);
  });
};

$(document).ready(function() {
  var specialDocs = new Specialty();
  specialDocs.specializations(dropDown);
});
