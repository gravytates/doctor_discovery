var apiKey = require('./../.env').apiKey;

function Doctor(){
}

Doctor.prototype.doctorSearch = function(issue, displayDocs) {
  // alert(medicalIssue);
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
   .then(function(response) {
      console.log(response.data[1].profile.last_name);
      console.log(response);
      displayDocs(response.data);
    })
   .fail(function(error){

    });
};


exports.doctorModule = Doctor;
