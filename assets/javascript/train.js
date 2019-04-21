var config = {
    apiKey: "AIzaSyCB4VEAwBSMEm-IDOxVwWJpB689WOMWn4Y",
    authDomain: "train-schedule-3dca5.firebaseapp.com",
    databaseURL: "https://train-schedule-3dca5.firebaseio.com",
    projectId: "train-schedule-3dca5",
    storageBucket: "train-schedule-3dca5.appspot.com",
    messagingSenderId: "642980037734"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
  
// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  var name = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstStart = $("#firstStart").val().trim();
  var frequency = $("#frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    firstStart: firstStart,
    frequency: frequency,
  });

  alert("Train Successfully Added");
  
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstStart").val("");
  $("#frequency").val("");

});

//   Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstStart);
  console.log(sv.frequency);
  
  var firstStartConverted = moment(sv.firstStart, "HH:mm").subtract(1, "years");
  console.log(firstStartConverted);
  
    // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstStartConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % sv.frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = sv.frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var arrivalTime = moment(nextTrain).format("hh:mm A");
  console.log("ARRIVAL TIME: " + arrivalTime);
  
  // Change the HTML to reflect
  $("#info").append('<tr><td>' + sv.name + '</td><td>' + sv.destination + '</td><td>Every ' + sv.frequency + ' minutes</td><td>' + arrivalTime + '</td><td>' + tMinutesTillTrain + '</td></tr>');
  

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child-added", function(snapshot) {
//       //change HTML
$("#info").append('<tr><td>' + sv.name + '</td><td>' + sv.destination + '</td><td>' + sv.frequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
})





