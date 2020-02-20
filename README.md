# PayPal-VAP

## Mid-VAP Assignment

### Porto
A simple application to make course selection and registration a click-away

### Technology Stack
* NodeJS
* HTML
* Bootstrap
### Application Goals
The application revolves around the logic of eventcreation and subscriber. In this case the creatorof event being the professor and the subscriberbeing students. This application provides aback-end logic and interface for the following entities carrying out the following tasks:
* Professor
  * SignUp
  * Login
  * Add courses
  * View courses
  * View students registered
* Student
  * SignUp
  * Login
  * View courses which he/she can take
  * Choose courses
  * View Registered courses

The application is planned in such a way that it covers maximum concepts taught in class to accomplish various tasks. To do so, instead of databases the use of file system is adopted where in data is stored in the format of JSON files. The next section explains the details of other concepts used in the code such as pug-templates, callbacks, promises, middlewares, express, nodemon etc.
### Concepts
#### Promises
Promises are useful when a synchronized structure is required in an application. For the scenarios posed in creation of this application there were many such instances where a sequential approach was neccessary, a few are listed below:
* Check the presence of a user in the file system the following steps need to be performed in order:
    1. Reading the records
    2. Checking for the user in the loaded records
    3. Notifying the user and perform the action based on 2
* Add a new user to the file system
    1. Reading the records
    2. Checking if user already exists
    3. Add user if does'nt already exist else notify user
* Adding a new course
    1. Reading the records
    2. Checking if another course exists with the same course ID
    3. Add course if new
* Choosing a course
    1. Reading the records of both Student and Professor
    2. If a course with same course ID taken under a different or the same Professor then it is not to be displayed
    3. after processing the choice updating the Professor and Student files