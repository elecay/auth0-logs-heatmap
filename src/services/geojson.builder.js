import Auth0Api from "./auth0.api";
import IPApi from "./ip.api";

class GeoJSONBuilder {
  async buildLogsHeatmap() {
    let logs = await Auth0Api.getLogs();
    let features = [];
    let response = {
      type: "FeatureCollection"
    };
    for (let index = 0; index < logs.length; index++) {
      let log = logs[index];
      let ipData = await IPApi.getLatLng(log.ip);
      features.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [ipData.lon, ipData.lat]
        }
      });
    }
    response.features = features;
    return response;
  }
}

export default new GeoJSONBuilder();
