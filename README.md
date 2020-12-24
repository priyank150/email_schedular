# email_schedular

In app.js
Insert sender email id and password. line 19, 20

Routes: 

POST - http://localhost:8080/schedule

post request body : 
{
    "from_emailId": "user1@gmail.com",
    "to_emailId": "user2@gmail.com",
    "shceduled_time": "24-12-2020 18:36",
    "email_subject": "Testing Nodemailer update",
    "email_text": "Some"
}

GET - http://localhost:8080/schedule


PUT - http://localhost:8080/schedule/13

put request body
{
    "from_emailId": "user1@gmail.com",
    "to_emailId": "user2@gmail.com",
    "shceduled_time": "24-12-2020 18:36",
    "email_subject": "Testing Nodemailer update",
    "email_text": "Some"
}



database name - booking

Database query

CREATE TABLE `email_schedule` (
  `idemail_schedule` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` varchar(45) NOT NULL,
  `status` int(11) NOT NULL,
  `from_emailId` varchar(45) NOT NULL,
  `to_emailId` varchar(45) NOT NULL,
  `shceduled_time` varchar(45) NOT NULL,
  `email_subject` varchar(100) DEFAULT NULL,
  `email_text` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idemail_schedule`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1



**This Service is configured for gmail only. In case you get security alert in sender's gmail account. Go to google account and in security tab turn on access to less secure app access.


