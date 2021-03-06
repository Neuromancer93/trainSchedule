var config = {
  apiKey: "AIzaSyAyW-K5sVcltrCcfIkFZ7LRzaSxvD9XdXk",
  authDomain: "coding-bootcamp-52fa0.firebaseapp.com",
  databaseURL: "https://coding-bootcamp-52fa0.firebaseio.com",
  projectId: "coding-bootcamp-52fa0",
  storageBucket: "coding-bootcamp-52fa0.appspot.com",
  messagingSenderId: "382484346354"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-user").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  var train = $("#trainName").val().trim();
  var destination = $("#trainDestination").val().trim();
  var firstTrain = $("#firstDeparture").val().trim();
  var frequency = $("#trainFrequency").val().trim();

  // Code for handling the push


  var newEntry = {
    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newEntry);

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#firstDeparture").val("");
  $("#trainFrequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrain = childSnapshot.val().train;
  var newDest = childSnapshot.val().destination;
  var newFirst = childSnapshot.val().firstTrain;
  var newFreq = childSnapshot.val().frequency;


  var tFrequency = Number(newFreq);

  // Time is set to snapshotval
  var firstTime = newFirst;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log(nextTrain);

  
  // create new row and append data
  var newRow = $("<tr>").append(
    $("<td>").text(newTrain),
    $("<td>").text(newDest),
    $("<td>").text(newFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
    
  );
    // append data to table
  $("#train-table > tbody").append(newRow);


});


setInterval(function() {
  window.location.reload();
}, 60000);