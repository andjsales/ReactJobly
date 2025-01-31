// Static class tying together methods used to get/send to the API.
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// MARK: class JoblyApi
class JoblyApi {
  // The token for interactive with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API ROUTES:

  // MARK: getCompany(handle)
  // Get details on a company by handle
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // MARK: getCompanies()
  // Get all companies
  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }

  // MARK: login()
  // Authenticates user, stores the token received for subsequent API requests
  static async login(username, password) {
    let res = await this.request('auth/token', { username, password }, 'post');
    JoblyApi.token = res.token; // Save the token internally for future use
    return res.token;
  }

  // MARK: signup()
  // Registers a new user and stores the authentication token received
  static async signup(signupData) {
    let res = await this.request('auth/register', signupData, 'post');
    JoblyApi.token = res.token; // Save the token internally
    return res.token;
  }

  // MARK: getJobs()
  // Retrieves job listings, can apply filters like job title or salary range
  static async getJobs(filters = {}) {
    let res = await this.request('jobs', filters);
    return res.jobs;
  }

  // MARK: getCurrentUser()
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

}

// For now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
