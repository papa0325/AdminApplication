require("dotenv").config()
const server_url = process.env.SERVER_URL
const content = (accessKey) => {
  result = {
    'subject': 'Invitation to a canvas team',
    'html': `
      <div>
          <img style="width: 30%;" src="https://previews.123rf.com/images/iqoncept/iqoncept1308/iqoncept130800014/21531221-the-word-invitation-on-a-card-in-an-envelope-formally-inviting-you-to-a-party-or-other-special-event.jpg" >
          
      </div>
      <div>
        <a href='${server_url}/.netlify/functions/api/invite/confirm/${accessKey}' style="text-decoration: none;">
          <button style="border: none; padding: 15px 32px; text-align: center;">Accept invitation</button>
        </a>
        <a href='${server_url}/.netlify/functions/api/invite/decline/${accessKey}' style="text-decoration: none;">
          <button style="border: none; padding: 15px 32px; text-align: center;">Decline invitation</button>
        </a>
      </div>
    `
  }
  return result
}
module.exports = content