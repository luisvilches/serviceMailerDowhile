const express = require('express');
const bodyParser = require('connect-multiparty')();
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Emailer = require('google-zoho-node-mailer');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5005;

app.use(cors());

app.post('/send',bodyParser, (req,res) => {

    let remitente = req.body.mail
    let telefono = req.body.telefono
    let nombre = req.body.name
    let asunto = req.body.asunto
    let mensaje = req.body.mensaje

    let template = '<section>'+'<br><h3>Mensaje desde el formulario de contacto!!</h3>'+
                    '<h4><b>Remitente: </b>'+nombre+' < '+remitente+ '> </h4>'+
                    '<h4><b>Telefono: </b>'+telefono+'</h4>'+
                    '<h4><b>Asunto: </b>'+asunto+'</h4>'+
                    '<h4><b>Mensaje:</b></h4>'+
                    '<hr>'+
                    '<h4>'+mensaje+'</h4>'+
                    '</section>';


    let mailOptions = {
        from: remitente + "<" + remitente + ">",
        to: 'luis@valadigital.cl',
        subject: 'Formulario de contacto web',
        html: template
    };
    /*
    Emailer.UseZohoSMTPTransport({
        username: 'luis@valadigital.cl',
        password: 'andres3190'
    });

    var message = new Emailer.Email(mailOptions)
     
    message.send(function(status){
        console.log(status);
    })*/

    /*let transporter = NodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            //user: 'no.reply.videomanias@gmail.com',
            //pass: 'videomanias2017'
            user: 'lvilches21@gmail.com',
            pass: 'andres3190'
        }
    }));

    let smtpConfig = {
        pool:true,
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true, // upgrade later with STARTTLS,
        requireTLS: true,
        //authMethod:'AUTH PLAIN',
        auth: {
            user: 'luis@valadigital.cl',
            pass: 'andres3190'
        }
        host: 'smtp.zoho.com',
        port: 587,
        //secure: true, // use SSL
        //tls: {rejectUnauthorized: true},
        debug:true,
        //authMethod:'SSL',
        auth: {
            user: 'hola@valadigital.cl',
            pass: 'andres2230'
        }
    };*/
    //var transporter = NodeMailer.createTransport('SMTP',smtpConfig);
    //var transporter = NodeMailer.createTransport("SMTP", smtpConfig);
    /*var transporter = NodeMailer.createTransport("SMTP",{
        service: "Zoho",
        auth: {
            user: "hola@valadigital.cl", // Cambialo por tu email
            pass: "andres2230" // Cambialo por tu password
        }
    });*/

    let transporter = NodeMailer.createTransport(smtpTransport({
        service: "Gmail",
        auth: {
            user: "lvilches21@gmail.com", // Cambialo por tu email
            pass: "andres3190" // Cambialo por tu password
        }
    }));

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.status(500).json({error:error});
        } else {
            console.log("Email sent");
            res.status(200).json({message:"Email Send"});
        }
    })
})


app.listen(port, function(err){
    if(err) throw err;
    console.log('server running in port ' + port);
});
