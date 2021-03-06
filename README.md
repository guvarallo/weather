<h1 align="center">Weather</h1>

<h3 align="center">A Vue.js weather forecast app using OpenWeather API.</h3>

## Demo

![Weather Demo](src/assets/weather-demo.gif)

## Getting Started

1. Clone this repo.
2. Generate your own API Keys at OpenWeather, LocationIQ and Google APIs.
3. Inside src/services/, create a file named 'apiKeys.js' and add the following:

```
export const LOCATION_IQ_KEY = "YOUR_API_KEY_HERE";
export const OPEN_WEATHER_KEY = "YOUR_API_KEY_HERE";
export const GOOGLE_KEY = "YOUR_API_KEY_HERE";
```

4. Run `npm install`
5. Run `npm run serve`

## Notes

You will need to use Node.js v12 or later.

## Built With

- [Vue.js v3.x](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
