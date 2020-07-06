const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const nodeMailGun = require('nodemailer-mailgun-transport');

const User = require('../models/user');

// const maiiGunAuth = {
//     auth: {
//         api_key: '',
//         domain: ''
//     }
// }
// const transporter = nodemailer.createTransport(nodeMailGun(maiiGunAuth));

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '498da553c69536',
        pass: 'd0d381b3c4cebc'
    }
})

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid email or password.');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash(
                    'error',
                    'E-Mail exists already, please pick a different one.'
                );
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        from: 'eshop@node.com',
                        to: email, // An array if you have multiple recipients.
                        subject: 'Hey you, awesome!',
                        'h:Reply-To': 'reply2this@company.com',
                        //You can use "html:" to send HTML email content. It's magic!
                        html: '<b>Wow Big powerful letters</b>',
                        //You can use "text:" to send plain-text content. It's oldschool!
                        text: 'Mailgun rocks, pow pow!'
                    }, (err, info) => {
                        if (err) {
                            console.log(`Error: ${err}`);
                        } else {
                            console.log(`Response: ${info}`);
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};