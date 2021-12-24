import {API_URL} from '../../config'
const imageUpload = ( fileName,filePath, endpoint ) => {
    fetch(API_URL + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: fileName, path: filePath})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

export default imageUpload;