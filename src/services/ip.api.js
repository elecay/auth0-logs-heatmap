class IPApi {
  static API_BASE = "http://ip-api.com/json/";

  constructor() {
    this.fakeCache = JSON.parse(localStorage.getItem("ipLatLngCache")) || {};
  }

  async getLatLng(ipAddress) {
    // We do this to avoid being banned from http://ip-api.com
    // If your IP gets banned, go to http://ip-api.com/docs/unban
    if (this.fakeCache[ipAddress]) {
      return this.fakeCache[ipAddress];
    }
    let users = await fetch(IPApi.API_BASE + ipAddress);
    let data = await users.json();
    this.fakeCache[ipAddress] = data;
    localStorage.setItem("ipLatLngCache", JSON.stringify(this.fakeCache));
    return data;
  }
}

export default new IPApi();
