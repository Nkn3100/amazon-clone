import axios from "axios";

const instance =  axios.create({
    //THE API (cloud function) URL
    baseURL:'https://us-central1-challenge-afe06.cloudfunctions.net/api'
    // baseURL: 'http://localhost:5001/challenge-afe06/us-central1/api' 

});

export default instance;