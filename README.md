# Auth0 Logs activity heatmap

This app shows all logs activity, from Auth0, on a map as a heatmap. The information is got from `/api/v2/logs`. From the IP of the user, and using a third-party service ([http://ip-api.com](http://ip-api.com)), we obtain an approximation of the latitude and longitude.

For retrieving the tiles and for drawing the map we use Mapbox and `mapbox-gl` library, respectively.

## Note

Since this is considered a hacking exercise, some liberties have been taken:

- API token is passed as a parameter in a `.env` file (in the future this will be handled from a backend app, using Machine to Machine flow).
- To avoid banning from the third-party service (there's a limit of 150 requests per minute), a fake cache on the frontend side was created using `localStorage`. This cache should be handle also from a backend app (1).
- `Map.jsx` file has a lot of style information. This will be moved to an external file.
- Pagination should be added: we are getting only the first page of logs, using the maximum limit of 100 rows (since we only take the IP from the response, `fields` param is being used for some performance improvement).

## How to execute the project

Edit `.env` file in the root of the project.

- **REACT_APP_DOMAIN**: Auth0 domain.
- **REACT_APP_AUTH0_TOKEN**: Auth0 token from an API with `read:logs` permission.
- **REACT_APP_MAPBOX_TOKEN**: Mapbox token.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Disclaimer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

(1). If your IP gets banned, go to [http://ip-api.com/docs/unban](http://ip-api.com/docs/unban)
