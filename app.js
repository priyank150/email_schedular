const express = require('express');
const dbQuery = require("./dbconnection");

let app = express()
let nodemailer = require('nodemailer');
let cron = require('node-cron');
let bodyParser = require('body-parser');

app.use(bodyParser.json());


let port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server is listening on port ', port));

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Insert sender email address',
        pass: 'Insert sender email password'
    }
});

// Status [1 - scheduled, 2- sent, 3 -failed]

cron.schedule('* * * * *', async () => {
    // console.log('running a task every minute', Date.now());
    const emailV = `SELECT * FROM email_schedule WHERE status = 1`;
    const res = await dbQuery(emailV);
    let status = 0;
    if (res && res.length > 0) {
        for (let s of res) {
            let shceduled_time = Math.floor(parseInt(s.shceduled_time) / 1000);
            let currentTime = Math.floor(Date.now() / 1000);

            if (shceduled_time === currentTime) {
                console.log('shced ==', shceduled_time, "dat now====", currentTime);
                // console.log("========================================");
                let mailOptions = {
                    from: s.from_emailId,
                    to: s.to_emailId,
                    subject: s.email_subject,
                    text: s.email_text
                }
                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        status = 3;
                        console.log(error);
                    } else {
                        // update status in db
                        status = 2;
                    }
                    let updateArray = [status, s.idemail_schedule]
                    const update = await dbQuery(`UPDATE email_schedule SET status = ? WHERE idemail_schedule = ?`, updateArray);
                });
            }


        }
    }
    // console.log('res', res);

});



app.post('/schedule', async (req, res) => {
    // console.log('body', req.body);
    let body = req.body;
    let { from_emailId, to_emailId, email_subject, email_text, shceduled_time } = body;
    let dateTimeParts = shceduled_time.split(' ')
    let timeParts = dateTimeParts[1].split(':')
    let dateParts = dateTimeParts[0].split('-')
    let date;

    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

    let currentTimestamp = Date.now()
    let scheduled = date.getTime();

    let email_data = {
        created_time: currentTimestamp,
        status: 1,
        from_emailId,
        to_emailId,
        shceduled_time: scheduled,
        email_subject,
        email_text,
    }

    const save_schedule = await dbQuery(`INSERT INTO email_schedule SET ? `, email_data);
    if (save_schedule) {
        res.json("Email Scheduled Successfully")
    } else {
        res.json("Some error occured")
    }

})

app.get('/schedule', async (req, res) => {
    let select = `SELECT * FROM email_schedule`
    let resp = await dbQuery(select);
    res.json(resp);
})

app.put('/schedule/:id', async (req, res) => {

    try {
        let body = req.body;
        let { from_emailId, to_emailId, email_subject, email_text, shceduled_time } = body;
        let idemail_schedule = parseInt(req.params.id);
        let scheduled;;

        if (idemail_schedule > 0) {
            if (shceduled_time) {
                // console.log('shceduled_time', shceduled_time)
                let dateTimeParts = shceduled_time.split(' ')
                let timeParts = dateTimeParts[1].split(':')
                let dateParts = dateTimeParts[0].split('-')
                let date;

                date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

                scheduled = date.getTime();
            }

            const selectQ = `SELECT * FROM email_schedule WHERE idemail_schedule = ${idemail_schedule}`
            const selRes = await dbQuery(selectQ);
            // console.log('sel ====', selRes);
            if (selRes && selRes.length > 0) {
                let obj = selRes[0];
                if (!from_emailId) from_emailId = obj.from_emailId
                if (!to_emailId) to_emailId = obj.to_emailId
                if (!shceduled_time) scheduled = obj.shceduled_time
                if (!email_subject) email_subject = obj.email_subject
                if (!email_text) email_text = obj.email_text

            }
            let saveData = [from_emailId, to_emailId, scheduled, email_subject, email_text, idemail_schedule];
            // console.log('save data ', saveData)
            const update_schedule = await dbQuery(`UPDATE email_schedule SET from_emailId = ?, to_emailId = ?, shceduled_time= ?, email_subject = ?, email_text = ? WHERE idemail_schedule = ?`, saveData);

            // console.log('update_schedule============', update_schedule)
            res.json(update_schedule)


        }
    } catch (error) {
        console.log('error', error)
    }
})
