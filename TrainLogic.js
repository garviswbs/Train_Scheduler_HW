/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between first and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDanvx0j8J6oLfOgZWaDTlATKZtQE12unc",
    authDomain: "the-project-project.firebaseapp.com",
    databaseURL: "https://the-project-project.firebaseio.com",
    projectId: "the-project-project",
    storageBucket: "the-project-project.appspot.com",
    messagingSenderId: "6776828715"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
 // var currentTime = moment().format('H:mm');
  //$(".currentTime").append(currentTime);

  console.log(moment().format('hh:mm'));
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-input").val().trim(), "hh:mm").format("X");
    var tFrequency = moment($("#rate-input").val().trim(), "hh:mm").minutes();
    //var repeat = firstTime += tFrequency;
    
    
    // Creates local "temporary" object for holding train data
    var newEmp = {
      name: trainName,
      destination: trainDestination,
      first: firstTime,
      rate: tFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.destination);
    console.log(newEmp.first);
    console.log(newEmp.rate);
  
    // Alert
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#rate-input").val("");
  
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var tFrequency = childSnapshot.val().rate;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTime);
    console.log(tFrequency);
  
   

    // Prettify the train first
    var firstTimePretty = moment.unix(firstTime).format("H:mm");

    var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  
      // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = moment(tFrequency - tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    var nextTrain = moment().add(tMinutesTillTrain, "hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    firstTimePretty + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });
  
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume train first date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use mets this test case
  //var ttFrequency = 3;
 //   var firstTime = "03:35"; // Time is 3:30 AM

   