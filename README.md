# Train-Schedule

https://smprov22.github.io/Train-Schedule/

![Train-Schedule](/assets/images/screenshot/train-screenshot.PNG)

This is a website/application that displays the schedule for arriving/departing trains.  The User can enter train information and the app takes the data they entered and calculates what time the next train is arriving and how many minutes away that is.  The information entered persists through page reloads with the use of the firebase database.  The trains can also be deleted by clicking on the red X at the end of each row. 

I used html, css, javascript/jquery, firebase, and moment.js to make this work.  The train info is dynamically added to the table using jquery when the user presses the submit button.  The only real blocker I had during this assignment was to get the train information to delete from firebase when the "x" was clicked.  For a long time it was deleting all the trains from firebase instead of just the train that was clicked on.  With a lot of trial and error and some expert help, I got it working.
