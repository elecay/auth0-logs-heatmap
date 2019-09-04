class Auth0Api {
  async getLogs() {
    let users = await fetch(
      process.env.REACT_APP_DOMAIN + "/api/v2/logs?per_page=100&fields=ip",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.REACT_APP_AUTH0_TOKEN
        }
      }
    );
    let data = await users.json();
    return data;
  }
}

export default new Auth0Api();
