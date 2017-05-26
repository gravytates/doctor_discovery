(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "67e1c6979fdd013c7b85f103db3bf259";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Doctor(){
}

Doctor.prototype.doctorSearch = function(issue, displayDocs) {
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
   .then(function(response) {
      console.log(response.data[1].profile.last_name);
      console.log(response);
      displayDocs(response.data);
    })
   .fail(function(error){
     $('.docResults').text("Unfortunately no doctors were found in this query");
    });
};


exports.doctorModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1}],4:[function(require,module,exports){
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

},{"./../.env":1}],5:[function(require,module,exports){
var Doctor = require('./../js/condition.js').doctorModule;

var displayDocs = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`
      <p class='doctor'><b>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}</b>, <em>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}
      </em></p>
    <div class='doctorInfo' id='id${doctor.practices[0].uid}'>
      <p>Specialty: ${doctor.specialties[0].name}</p>
      <p>Office: ${doctor.practices[0].name}</p>
      <p>Location: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</p>
      <p>Phone: ${doctor.practices[0].phones[0].number}</p>
      <p>Bio: ${doctor.profile.bio}</p><br>
      <img class="bio-pics" src="${doctor.profile.image_url}" alt="dr image"/><hr>
    </div>`
    );
    $('.doctor').last().click(function(){
      $(`#id${doctor.practices[0].uid}`).slideToggle();
    });
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

var DoctorName = require('./../js/name.js').doctorNameModule;

var searchResults = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`
      <p class='doctor'><b>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}</b>, <em>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</em>
      </p>
    <div class='doctorInfo' id='id${doctor.practices[0].uid}'>
      <p>Specialty: ${doctor.specialties[0].name}</p>
      <p>Office: ${doctor.practices[0].name}</p>
      <p>Location: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</p>
      <p>Phone: ${doctor.practices[0].phones[0].number}</p>
      <p>Bio: ${doctor.profile.bio}</p><br>
      <img class="bio-pics" src="${doctor.profile.image_url}" alt="dr image"/><hr>
    </div>`
    );
    $('.doctor').last().click(function(){
      $(`#id${doctor.practices[0].uid}`).slideToggle();
    });
  });
};

$(document).ready(function() {
  var doctorName = new DoctorName();
  $('#name-form').submit(function(e){
    e.preventDefault();
    first_name = $('#first_name').val();
    last_name = $('#last_name').val();
    doctorName.nameSearch(first_name, last_name, searchResults);
    $('.results').show();
  });
});

var Specialty = require('./../js/specialty.js').specialtyModule;

var dropDown = function(specialties) {
  specialties.forEach(function(specialty) {
    $('#specialty').append(`<option value='${specialty.uid}'>${specialty.actor}</option>`);
  });
};

var specialDocs = function(doctors) {
  doctors.forEach(function(doctor) {
    $('.docResults').append(`
    <p class='doctor'><b>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}</b>, <em>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}
    </em></p>
    <div class='doctorInfo' id='id${doctor.practices[0].uid}'>
      <p>Specialty: ${doctor.specialties[0].name}</p>
      <p>Office: ${doctor.practices[0].name}</p>
      <p>Location: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</p>
      <p>Phone: ${doctor.practices[0].phones[0].number}</p>
      <p>Bio: ${doctor.profile.bio}</p><br>
      <img class="bio-pics" src="${doctor.profile.image_url}" alt="dr image"/><hr>
    </div>`
    );
    $('.doctor').last().click(function(){
      $(`#id${doctor.practices[0].uid}`).slideToggle();
    });
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

},{"./../js/condition.js":2,"./../js/name.js":3,"./../js/specialty.js":4}]},{},[5]);
