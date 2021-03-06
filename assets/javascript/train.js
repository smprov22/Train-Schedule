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
  
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstStart").val("");
  $("#frequency").val("");

});

//   Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  
  var firstStartConverted = moment(sv.firstStart, "HH:mm").subtract(1, "years");
    
    // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstStartConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % sv.frequency;

  // Minute Until Train
  var tMinutesTillTrain = sv.frequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var arrivalTime = moment(nextTrain).format("hh:mm A");
  
  // Change the HTML to reflect
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(sv.name),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(arrivalTime),
    $("<td>").text(tMinutesTillTrain),
    $("<button>").text("X").addClass("remove-button").attr("id", snapshot.key).attr("title", "Delete Train")
    );

  // Append the new row to the table
  $("#info").append(newRow);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

$(document).on("click", ".remove-button", function(event){
  database.ref(event.target.id).remove()
  $(this).closest("tr").remove();

})
