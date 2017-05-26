var apiKey = require('./../.env').apiKey;

function DoctorName(){
}

DoctorName.prototype.nameSearch = function(first_name, last_name, searchResults) {
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${first_name}&last_name=${last_name}&location=37.773%2C-122.413%2C20&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`)
   .then(function(response) {
      console.log(response);
      searchResults(response.data);
    })
   .fail(function(error){
     $('.docResults').text("Unfortunately no doctors were found in this query");
    });
};

exports.doctorNameModule = DoctorName;
