import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        // Added auth token to header for requests
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthToken;