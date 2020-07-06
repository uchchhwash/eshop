const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '498da553c69536',
        pass: 'd0d381b3c4cebc'
    }
})