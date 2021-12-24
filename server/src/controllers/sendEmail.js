const sgMail = require('@sendgrid/mail')
let sgApiKey = process.env.sgApiKey
console.log(sgApiKey)
sgMail.setApiKey(sgApiKey)
const sendEmail = async (to, from, content) => {
  const contacts = {
    to,
    from,
  }
  const email = Object.assign({}, content, contacts)
  return await sgMail.send(email).then(() => {
    console.log("Message Sent")
    return "success"
  }).catch((error) => {
    console.log(error.response.body)
    return "error"
  })
}

module.exports = sendEmail;