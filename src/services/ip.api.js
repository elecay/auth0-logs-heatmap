let fakeCache = {};

class IPApi {
  static API_BASE = "http://ip-api.com/json/";

  async getLatLng(ipAddress) {
    // We do this to avoid being banned from http://ip-api.com
    // If your IP gets banned, go to http://ip-api.com/docs/unban
    let ipLatLngCache = JSON.parse(localStorage.getItem("ipLatLngCache"));
    if (ipLatLngCache && ipLatLngCache[ipAddress]) {
      return ipLatLngCache[ipAddress];
    }
    let users = await fetch(IPApi.API_BASE + ipAddress);
    let data = await users.json();
    fakeCache[ipAddress] = data;
    localStorage.setItem("ipLatLngCache", JSON.stringify(fakeCache));
    return data;
  }
}

export default new IPApi();
