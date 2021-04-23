Commerce
Here is a working link to our application https://spring21commerce.herokuapp.com/login <br>

*User Login <br>
username = user <br>
password = password <br>

*Admin Login <br>
username = admin <br>
password = password <br>

Below is detailed information in regards to the project details and requirements. <br>

# Commerce Bank Alert System
Commerce Bank - UCM Spring 2021 Project

-Alert Tracking and Acknowledgement System (ATAS)
The application will present the user with a list of 'alerts' that need to be acknowledged and possibly acted upon in other systems. These alerts will be generated from a server when someone or something modifies a 'sensitive' file. The only way to add an 'alert' to the system will be via a HTTP REST API with a JSON payload. 

# Spring Packages Used:

* Spring Boot
* Spring Web
* Spring Thymeleaf
* Spring Security
* Spring Data JPA
* Spring Devtools
* MySQL Connector
* frontend-maven-plugin for React development

# JS Packages Used:

* Babel
* Webpack
* React
* react-router-dom

# Frontend Build

* React Framework
* React Bootstrap

There are 3 maven rules that are used to build the frontend:

     mvn frontend:install-node-and-npm

If this is executed from the command line (or your IDE maven interface)
it will install Node.js and npm in your project directory.  This only
needs to be rerun after the first time if you change the version of node
specified in your pom.xml file.

     mvn frontend:npm

If this is executed from the command line (or your IDE maven interface)
it will the javascript packages specified in your package.json file.  This
only needs to be rerun if that file is changed.

     mvn frontend:webpack

If this is executed from the command line (or your IDE maven interface)
it will compile and package your javascript files into a single javascript
file which will run on older as well as current browsers.  It should be rerun
each time your frontend application is changed, before rerunning the backend
server project.

# Tests
* JEST Testing
* POSTMAN API Testing

Users must be pre-established and authenticate with a simple login page. Credentials can be stored in a database
<img width="1440" alt="Login" src="https://user-images.githubusercontent.com/46074688/115801747-1f983e80-a3a3-11eb-8b43-23a6ece915cf.png">


The application will present the user with a list of 'alerts' that need to be acknowledged and possibly acted upon in other systems. These alerts will be generated from a server when someone or something modifies a 'sensitive' file. The only way to add an 'alert' to the system will be via a HTTP REST API with a JSON payload. An 'alert' will contain the following information: <br>
{ <br>
"timestamp": "the timestamp of the file access", <br>
"hostname": "the fully qualified domain name of the server hosting the file", <br>
"application_id": "3 character id representing the owning application", <br>
"file": "the fully qualified path of the file that has been modified", <br>
"change_agent": "who changed the file, local system account, user id, etc", <br>
"change_process": "the process that changed the file" <br>
}
<img width="1440" alt="User_Index" src="https://user-images.githubusercontent.com/46074688/115801849-58d0ae80-a3a3-11eb-95ce-9d35845ab797.png">

The main page will display the list of alerts with filters that for un-acknowledged and acknowledged alerts. The user can select one and update it on another screen ( or pop up page).
Was is a known change or unknown? Meaning was the change as a part of a server
update (manual or automated)?
Was it maliciously changed? If so, the IT Security department needs to be
notified of a possible issue.
When the results are saved the user making the acknowledgement needs to be
recorded, along with the current timestamp and the comments and state.
<img width="1440" alt="User_Acknowledge_Alert" src="https://user-images.githubusercontent.com/46074688/115801797-3e96d080-a3a3-11eb-9c4e-3e97c1815206.png">

User Acknowledged Alerts
<img width="1440" alt="User_Acknowledged_Alerts" src="https://user-images.githubusercontent.com/46074688/115801878-69812480-a3a3-11eb-81d6-a9365a77bd64.png">

----------------------------------------------------------------------------------------------

Admin Can view Users_Unacknowledged Alerts
<img width="1440" alt="Admin_Unacknowledged" src="https://user-images.githubusercontent.com/46074688/115909741-86643900-a431-11eb-954e-2ccadd2d321b.png">

Admin may also view User_Acknowledged Alerts
<img width="1440" alt="Admin_Acknowledged" src="https://user-images.githubusercontent.com/46074688/115909777-954aeb80-a431-11eb-9ade-f9bde3dc6376.png">

Also needed is an administration page that shows all alerts and allows for sorting on un- acknowledged alerts over the 2 day threshold. To solve this issue we created a separate Navbar tab labeled as Urgent Alerts, that will record alerts passed the two day thresold.
<img width="1440" alt="Admin_Urgent" src="https://user-images.githubusercontent.com/46074688/115909805-a3007100-a431-11eb-8a43-a0762a2d07f8.png">


The application will need to associate a user with an application id and a user can be associated with multiple application ids. Commerce will get this information from our AD Domain. You will need to create a simple association in the database.

Professor Grebe's class:
The system will send out emails when alerts have not been acknowledged in 2 days and
as new alerts arrive. A tool like FakeSMTP can be used to emulate an SMTP server (http://nilhcem.com/FakeSMTP/) to simplify the email sending process.
Professor Kang's class the email is a stretch goal.
