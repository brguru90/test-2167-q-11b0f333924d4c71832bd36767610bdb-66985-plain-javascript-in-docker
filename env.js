var API_URL='http://restapi:8080';

const getdata=()=>{
    return fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1458/data.json")
    .then(r=>r.json())
}

