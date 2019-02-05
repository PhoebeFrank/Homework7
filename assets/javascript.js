


// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1iHANd1eTs_ipUjw8_rEpjX8NjlDoCCk",
    authDomain: "homework7-c7e91.firebaseapp.com",
    databaseURL: "https://homework7-c7e91.firebaseio.com",
    storageBucket: ""
};

firebase.initializeApp(config);
var dataRef = firebase.database();


$(document).ready(function() {
   

     $("#addTrain").on("click", function() {
     	var trainName = $('#trainNameInput').val().trim();
     	var destination = $('#destinationInput').val().trim();
     	var firstTrainTime = $('#firstTrainInput').val().trim();
        var frequency = $('#frequencyInput').val().trim();
         
         console.log(trainName);
         console.log(destination);
         console.log(firstTrainTime);
         console.log(frequency);

        var firstTimeMath = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        // var currentTime = moment();
         var newTime = moment().diff(moment(firstTimeMath), "minutes");
          var timeRemain = newTime % frequency;
          var minsUntilTrain = frequency - timeRemain;
          var nextTrain = moment().add(minsUntilTrain, "minutes");
          var nextTrainFormatted = moment(nextTrain).format("hh:mm");

          var newTrain = dataRef.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
            frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minsUntilTrain: minsUntilTrain
        });
          console.log(newTrain.path.u[0]);
          var key =newTrain.path.u[0];
          console.log(key);

          $('#trainNameInput').val('');
          $('#destinationInput').val('');
          $('#firstTrainInput').val('');
          $('#frequencyInput').val('');
        
          return false;

     	
     	
     	});

       
     
         dataRef.ref().on("child_added", function(childSnapshot) {
         console.log(childSnapshot.val().trainName);
         console.log(childSnapshot.val().destination);
         console.log(childSnapshot.val().firstTrainTime);
         console.log(childSnapshot.val().frequency);
         console.log(childSnapshot.val().nextTrainFormatted);
         console.log(childSnapshot.val().minsUntilTrain);

		$('new-train').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td>" + childSnapshot.val().trainName +
               "</td>" +
               "<td>" + childSnapshot.val().destination +
               "</td>" +
               "<td>" + childSnapshot.val().frequency +
               "</td>" +
               "<td>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td>" + childSnapshot.val().minsUntilTrain + 
               "</td>" +
               "<td>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

        });

});