# email_schedular

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



**This Service is configured for gmail only. In case you get security alert in gmail. Go to google account and in security tab turn on access to less secure app access.


