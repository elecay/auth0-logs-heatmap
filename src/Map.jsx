import React from "react";
import mapboxgl from "mapbox-gl";
import GeoJSONBuilder from "./services/geojson.builder";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: "map",
      zoom: 2,
      center: [-10, 30],
      style: "mapbox://styles/mapbox/dark-v10"
    });
    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    this.map.on("load", () => {
      GeoJSONBuilder.buildLogsHeatmap().then(geoJsonData => {
        this.map.addSource("auth0_logs", {
          type: "geojson",
          data: geoJsonData
        });

        this.map.addLayer(
          {
            id: "auth0_logs-heat",
            type: "heatmap",
            source: "auth0_logs",
            maxzoom: 9,
            paint: {
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0,
                0,
                6,
                1
              ],
              "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                9,
                3
              ],
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)"
              ],
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                2,
                9,
                20
              ],
              "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7,
                1,
                9,
                0
              ]
            }
          },
          "waterway-label"
        );
      });
    });
  }

  render() {
    return <div id="map" ref={this.mapRef} />;
  }
}

export default Map;
