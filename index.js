const express = require('express');
const bodyParser = require('connect-multiparty')();
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
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
        from: remitente,
        to: 'lvilches21@gmail.com',
        subject: 'Formulario de contacto web',
        html: template
    };

    let transporter = NodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            //user: 'no.reply.videomanias@gmail.com',
            //pass: 'videomanias2017'
            user: 'lvilches21@gmail.com',
            pass: 'andres3190'
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
    console.log('server running in port 5000');
});
