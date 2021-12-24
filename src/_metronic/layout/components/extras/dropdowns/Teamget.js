import API_URL from "../../../../../config";

const teamGet = (email) => {
    fetch(API_URL + '/team/get', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
      .then(res => res.json())
      .then(data => {
        return data
      })
      .catch(err => console.log(err))
}
export default teamGet;