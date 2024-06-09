const Contact = require('../models/contactModel');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendMail');

// @desc get all contacts
// route GET/contacts
// public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get contacts route is working',
  });
});

// @desc get single contact by id
// route GET/contacts/:id
// public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get contact route is working',
  });
});

// @desc create single contact
// route POST/contacts
// public
const createContact = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    email,
    mobile,
    date,
    time,
    agreement,
    appointmentType,
    message,
  } = req.body;

  if (
    !appointmentType ||
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !date ||
    !agreement
  ) {
    res.status(400);
    throw new Error(
      'Appointment type, first name, last name, email, mobile, date and agreement to privacy policy is required'
    );
  }

  const contact = await Contact.create(req.body);

  const output1 = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        color: #333;
      }
      .header {
        text-align: center;
        padding: 10px 0;
        background-color: #1c4746;
        color: #ffffff;
      }
      .content {
        padding: 20px;
      }
      span{
        font-weight: bold;
        text-transform: Capitalize;
      }
      .heading{
        color: #f4891f;
      }
      .footer {
        text-align: center;
        padding: 10px 0;
        background-color: #f4891f;
        border-top: 1px solid #e2e2e2;
        font-size: 14px;
        color: #ffffff;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        <h2>You Have A New Appointment Request</h2>
        </div>
        <div class="content">
        <h3>Dear Dr. Bhavna,</h3>
        <h4>You have a new appointment request from : </h4>
        <p><span>Patient Name :</span> ${fname} ${lname}</p>
        <p><span>Patient Email :</span> ${email}</p>
        <p><span>Patient Mobile :</span> ${mobile}</p>
        <p><span>Appointment Date :</span> ${date}</p>
        <p><span>Appointment Time :</span> ${time}</p>
        <p><span>Appointment Type :</span> ${appointmentType}</p>
        <p><span>Agreement :</span> ${agreement}</p>
        <h4 class="heading">Message from patient :</h4>
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Bite An Apple. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  const output2 = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        color: #333;
      }
      .header {
        text-align: center;
        padding: 10px 0;
        background-color: #1c4746;
        color: #ffffff;
      }
      .content {
        padding: 20px;
      }
      span{
        font-weight: bold;
        text-transform: Capitalize;
      }
      h1,h2,h3,h4{
        line-height: 1;
      }
      .head1{
        color: #1c4746
      }
      .heading{
        color: #f4891f;
      }
      .footer {
        text-align: center;
        padding: 10px 0;
        background-color: #f4891f;
        border-top: 1px solid #e2e2e2;
        font-size: 14px;
        color: #ffffff;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        <h2>Welcome to Bite An Apple Dental Clinic</h2>
        </div>
        <div class="content">
        <h2 class="head1">Modern Dentistry</h2>
        <h3 class="heading">Conservative Approach</h3>
        <h4>We do what is required, No More and No Less</h4>
        <p>Dear ${fname} ${lname},</p>
        <p>We are glad you chose Bite An Apple Dental Clinic as your dental health partner.</p>
        <p>Your request for appointment on ${date} at ${time} has been registered. You will soon get a call from our clinic to finalize your appointment.</p>
        <p>In case you would like to speak to Dr. Bhavna then you may call her at +91 9818224097.</p>
        <p>We look forward to welcome you to our clinic and make your dental health journey pleasurable.</p>
        <br/>
        <br/>
        <p>Thank you,</p>
        <p>With best regards,</p>
        <h4 class="heading">Bite An Apple Team</h4>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Bite An Apple. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  const drMailResult = sendEmail({
    email: ['suribhavna@yahoo.com', 'bhavna@biteanapple.com'],
    subject: 'New Appointment',
    html: output1,
  });

  const patientMailResult = sendEmail({
    email: email,
    subject: 'Appointment Confirmation',
    html: output2,
  });

  res.status(200).json({
    success: true,
    data: contact,
    message: 'New Appointment request registered',
  });
});

// @desc update single contact by id
// route PUT/contacts/:id
// public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update contact route is working',
  });
});

// @desc delete single contact by id
// route DELETE/contacts/:id
// public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete contact route is working',
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
