const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
  {
    appointmentType: {
      type: String,
      enum: ['In-Clinic-Appointment', 'Virtual-Appointment'],
      required: [true, 'Appointment type is a required field'],
    },
    fname: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email is invalid',
      ],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[1-9][0-9]{9}$/, 'Mobile number should be 10 digit long'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
      validate: [
        {
          validator: function (value) {
            const dayOfWeek = value.getDay();
            return dayOfWeek !== 0;
          },
          message: 'Appointment day cannot be a sunday',
        },
        {
          validator: function (value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return value >= today;
          },
          message: 'Appointment date cannot be before today',
        },
      ],
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    message: {
      type: String,
    },
    agreement: {
      type: String,
      required: [true, 'Privacy policy agreement is required'],
      enum: ['agreed-to-privacy-policy'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
