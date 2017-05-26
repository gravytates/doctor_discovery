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

exports.specialtyModule = Specialty;
