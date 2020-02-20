# PayPal-VAP

## Mid-VAP Assignment

### Porto
A simple application to make course selection and registration a click-away

### Run
clone the repository:
```
cd Mid-Vap-Assignment/
npm install
npm start
```

### Technology Stack
* NodeJS
* HTML
* Bootstrap
### Application Goals
The application revolves around the logic of event creation and subscriber. In this case the creator of event being the professor and the subscriber being students. This application provides a back-end logic and interface for the following entities carrying out the following tasks:
* Professor
  * SignUp
  * Login
  * Add courses
  * Delete Course
  * View courses
  * View students registered
* Student
  * SignUp
  * Login
  * View courses which he/she can take
  * Register courses
  * De-register course
  * View Registered courses

The application is planned in such a way that it covers maximum concepts taught in class to accomplish various tasks. To do so, instead of databases the use of file system is adopted where in data is stored in the format of JSON files. The next section explains the details of other concepts used in the code such as pug-templates, callbacks, promises, middlewares, express, nodemon etc.
### Concepts
#### Promises
Promises are useful when a synchronized structure is required in an application. For the scenarios posed in creation of this application there were many such instances where a sequential approach was necessary, a few are listed below:
* Check the presence of a user in the file system the following steps need to be performed in order:
    1. Reading the records
    2. Checking for the user in the loaded records
    3. Notifying the user and perform the action based on 2
* Add a new user to the file system
    1. Reading the records
    2. Checking if user already exists
    3. Add user if doesn't already exist else notify user
* Adding a new course
    1. Reading the records
    2. Checking if another course exists with the same course ID
    3. Add course if new
* Choosing a course
    1. Reading the records of both Student and Professor
    2. If a course with same course ID taken under a different or the same Professor then it is not to be displayed
    3. After processing the choice updating the Professor and Student files
* Deleting a course
    1. Reading the records of both Student and Professor
    2. Finding elements in student and professor to delete
    3. After Deletion updating the Professor and Student files


#### Middleware
Middleware has been used for the following tasks:
* Setting 'public' as a static directory
* Enable the webpages to use bootstrap, CSS, jquery and image files
* Sessions to check the username across the application session
#### Express
The application is built using express for easier routing and coding. It also helps in utilizing template engines like pug, static files like html, load styles from css, bootstrap and also provides capabilities like express-session.
#### Pug
It is a templating engine which makes life easier by allowing us to pass variables easily into the webpage with another js capabilities like loops and conditionals. It is being used for the following:
* Professor dashboard
* Student dashboard
* Alert pages
### Structure
The project follows the structure:

| Components    	| Usage                                                           	|
|---------------	|-----------------------------------------------------------------	|
| node_modules 	  | Consists of all the packages installed through npm              	|
| data          	| Consists of all the files containing Student and Professor data 	|
| public        	| Consists the style folders css, img and js.                     	|
| src           	| Consists the pug files                                          	|
| views         	| Consists the static files ie. html files                        	|
| index.js      	| The main file containing the source code                        	|
| backup        	| Files created during development for design and debugging       	|

### Pre-loaded Data

#### Students 
| Username   	| Password                                                           	|
|---------------	|-----------------------------------------------------------------	|
| Amrit  |  amrit	|
| Adarsh	|  adarsh	|
| Abhishek	|  abhishek	|
| Kriti	|  	kriti|  
| Shreyansh	|  shreyansh	|
| Harry	|  	harry|
| Perry	|  	perry|


#### Professors 
| Username   	| Password                                                           	|
|---------------	|-----------------------------------------------------------------	|
| Harini  |  harini	|
| Alok	|  alok	|
| Radhika	|  radhika	|
| Hemanth	|  	hemanth|  
| Rajesh	|  rajesh	|