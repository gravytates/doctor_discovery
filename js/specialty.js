var apiKey = require('./../.env').apiKey;

function Specialty(){
}

Specialty.prototype.specializations = function(dropDown){
  $.get(`https://api.betterdoctor.com/2016-03-01/specialties?user_key=${apiKey}`)
  .then(function(response){
    console.log(response);
    dropDown(response.data);
  })
  .fail(function(error){
    $('.docResults').text("Darn, something went wrong!");
  });
};

Specialty.prototype.specialSearch = function(specialty, specialDocs) {
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=37.773%2C-122.413%2C20&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`)
  .then(function(response) {
    specialDocs(response.data);
  })
  .fail(function(error){
    $('.docResults').text("Unfortunately no doctors were found in this query");
  });
};

exports.specialtyModule = Specialty;
