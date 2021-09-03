const express = require('express');
const router = express.Router();
const Data = require('../models/data');
require('dotenv').config({path: __dirname + '/.env'});
const db = process.env.MONGODBATLASCONNECTION;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
 
mongoose.connect(db, err => {
    if(err) {
       console.error('Error: ' + err);
       throw err;
    }
    else {
       console.log('Connected to mongodb');
    }
});

router.get('/getalldata', (req, res) => {
    Data.find({})
        .then(data => {
           let arr = [];
           data.forEach(r => {
             arr.push(r);
           }); 
           let obj = {
              h: arr[0].h,
              n: arr[0].n,
              podaci: arr[0].podaci,
              counter: arr[0].counter
           }
           res.send({statusObj: obj});
        })
        .catch(err => {
           console.log('Error: ' + err);
           res.status(401).send('Error occurred');
        }); 
});

router.put('/counter', (req, res) => {
    Data.findOne({r: req.body.r})
        .then(u => {
                let counter = u.counter + 1;
                Data.updateOne( { r: req.body.r }, { $set: { counter: counter }})
                .then(res => {
                    
                })
                .catch(err => {
                    console.log('Error: ' + err);
                    res.status(401).send('Error occurred');
                });
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});

router.post('/sendemail', (req, res) => {
    let data = req.body;
    let subject;
    let email = process.env.EMAIL;
    let html;
    if(data.hf = 'f') {
        html =
        `
        <div style="text-align: center; font-size: 14px; font-weight: 700; color: rgb(60, 60, 60);">FLP</div><br>
        <div style="text-align: center; font-size: 14px; font-weight: 700; color: rgb(60, 60, 60);">Pitanje</div><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Ime</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.name}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Broj telefona</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.phoneNumber}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">E-mail</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.email}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Komentar</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.comment}</span><br>
        `;
    }
    if(data.hf = 'h') {
        html =
        `
        <div style="text-align: center; font-size: 14px; font-weight: 700; color: rgb(60, 60, 60);">FLP</div><br>
        <div style="text-align: center; font-size: 14px; font-weight: 700; color: rgb(60, 60, 60);">Narudžbina</div><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Ime</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.name}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Broj telefona</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.phoneNumber}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">E-mail</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.email}</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Iznos</div>
        <span style="margin-right: 5px; font-size: 12px; color: rgb(118, 118, 118);">${data.total}</span><span style="font-size: 12px; color: rgb(118, 118, 118);">€</span><br>
        <div style="font-size: 12px; font-weight: 700; color: rgb(60, 60, 60);">Paketi</div>
        <span style="font-size: 12px; color: rgb(118, 118, 118);">${data.packages}</span><br>
        `;
    }

        subject = 'Podaci';
    let transporter = nodemailer.createTransport({
       service: 'gmail',
       secure: false,
       port: 25,
       auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
       },
       tls:{
          rejectUnauthorized: false
        }
     });
    let mailOptions = {
        from: '"www.flp.rs" <filip.klasan.333@gmail.com>',
        to: email,
        subject: subject,
        text: 'Pozdrav',
        html: html
    }
    transporter.sendMail(mailOptions, (error, info) => {
       if(error) {
           console.log('Error: ' + error);
           res.status(401).send('Error occurred');
           throw error;
       }
       else {
           console.log('Message sent');
           res.send({statusObj: 'Message sent'});
       }
    });
});

module.exports = router;