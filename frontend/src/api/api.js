// Static class tying together methods used to get/send to the API.
// There shouldn't be any frontend-specific stuff here, and there shouldn't be any API-aware stuff elsewhere in the frontend.
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class JoblyApi {
  // The token for interactive with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // There are multiple ways to pass an authorization token, this is how you pass it in the header.
    // This has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // API Routes:
  // Get details on a company by handle
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Authenticates user, stores the token received for subsequent API requests
  static async login(username, password) {
    let res = await this.request('auth/token', { username, password }, 'post');
    JoblyApi.token = res.token; // Save the token internally for future use
    return res.token;
  }

  // Registers a new user and stores the authentication token received
  static async register(userData) {
    let res = await this.request('auth/register', userData, 'post');
    JoblyApi.token = res.token; // Save the token internally
    return res.token;
  }

  // Retrieves job listings, can apply filters like job title or salary range
  static async getJobs(filters = {}) {
    let res = await this.request('jobs', filters);
    return res.jobs;
  }
}


// For now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;
