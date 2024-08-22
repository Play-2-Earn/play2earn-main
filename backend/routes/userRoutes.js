const express = require('express');
const UserModel = require('../models/User');
// mit prajapati (auth)
const nodemailer = require("nodemailer");
const { request } = require("http");
require("dotenv").config();
const crypto = require("crypto");

// logout fuctionality
// const session = require('express-session');
const jwt = require('jsonwebtoken');


const { getUserProfile, updateUserProfile, deleteUser, getAllUsers, sign_up, log_in, requestUserPasswordReset, passwordSet } = require('../controllers/userController');
const { error } = require('console');

const router = express.Router();
// router.use(express.json());

router.get('/:id', getUserProfile);
router.patch('/:id', updateUserProfile);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

// mit prajapati (authentication system)
const app = express();



// code for generating the reference code...
function generateReferralCode(firstName, lastName) {
    const data = `${firstName}-${crypto.randomInt(100000, 999999)}-${lastName}`;
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    // Truncate the hash to the first 8 characters (you can choose a different length)
    const referralCode = hash.substring(0, 10);
    return referralCode;
}


router.post("/sign_up", (request, response) => {
    const { firstName, lastName, email, username, password, refBy } = request.body;
    // this code if for the functionality to generate the usename by itself with the firstname of a user
    // const username = firstName + crypto.randomInt(100000, 999999);

    // Checking that if a user with the given email already exists
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // If the user is found, send a response indicating the email is already in use
                return response.status(400).json({ error: "Email already exists" });

                //  checking that the username is arleady exists
                // UserModel.findOne({username : username})
            }

            else {
                return UserModel.findOne({ username: username })
            }
        })
        .then(ifSimilarUsername => {
            if (ifSimilarUsername) {
                response.status(401).json({ error: "Username is already taken! Enter unique username." })
            }
            // Generate the referral code and create the new user
            const userRefNum = generateReferralCode(firstName, lastName);

            return UserModel.create({ firstName, lastName, username, email, password, userRefNum, refBy })

        })
        .then(newUser => {
            return response.status(201).json({ message: "User created successfully", user: newUser });
        })
        .catch(err => {
            if (response.headersSent) {
                // If headers are already sent, do not attempt to send another response
                console.error("Headers already sent. Cannot send another response.");
                return;
            }

            if (error.code === "11000") {
                response.status(300).json({ error: "Either the username or the email address already exist" })

            }
            console.error("Error finding user:", err);
            response.status(500).json({ error: "Error finding user" });
        });
});

// logout
// app.use(session({
//     secret: '123',  // Replace with a secure key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }  
// }));


router.post("/log_in", (request, response) => {
    const { email, password } = request.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const JWT_SECRET = process.env.JWT_SECRET || 'your-hardcoded-secret-key';
                    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
                    response.json("success");
                } else {
                    response.json("The credentials are incorrect");
                }
            } else {
                response.json("User doesn't exist");
            }
        });
});



router.post("/requestUserPasswordReset", (request, response) => {
    const { email } = request.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                const otp = crypto.randomInt(100000, 999999);
                user.otp = otp;
                user.otpExpires = Date.now() + 3600000; // 1 hour

                user.save();
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "playearnai.noreply@gmail.com",
                        pass: "htcspcsiaiykuklx"
                    }
                });

                const mailOptions = {
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: "Password Reset",
                    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                    Here is the code which you need to enter:${otp}\n\n
                    This code will be expire in one hour, and please make sure that you do not share with anyone else for security reason.
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };

                transporter.sendMail(mailOptions, (err, res) => {
                    if (err) {
                        console.error("There was an error: ", err);
                        return response.status(500).json({ error: "Failed to send email" });
                    } else {
                        return response.status(200).json({ message: "Password reset email sent" });
                    }
                });
            } else {
                return response.status(404).json({ error: "User is not found" });
            }
        })
        .catch(err => response.status(500).json({ error: err.message }));
});

router.post("/passwordSet", (request, response) => {
    const { otp, newPassword } = request.body
    UserModel.findOne({ otp: otp })
        .then(user => {
            if (otp) {
                user.password = newPassword;
                user.save()
                response.json("correct");
                response.json(user.password)
            }
            else {
                response.json("OTP is incorrect. Try again!")
            }
        })
        .catch(err => {
            response.status(500).json({ message: "Error finding user.", error: err });
        });
})

// logout function

router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to logout', error: err });
            }
            res.clearCookie('connect.sid');  // Clears the session cookie on logout
            return res.status(200).json({ message: 'Successfully logged out' });
        });
    } else {
        return res.status(400).json({ message: 'No active session to log out' });
    }
});
module.exports = router;