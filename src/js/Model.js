const MODEL = {
  errorMsg: 'Unfortunately, an error occurred on the API side. Try again, please!',
  imageBackgroundAPIUrl:
    'https://api.unsplash.com/photos/random?query=weather,nature,evening,snow&client_id=jevIz2yqJ8V1u2sS0HIqHs0SnCgCsrKavmqTcR1Av6s',
  geolocationAPIUrl: 'https://ipinfo.io/json?token=c2e6ca672c9bef',
  // openWeatherMapAPIUrl: `https://api.openweathermap.org/data/2.5/forecast?q=MIORY, BELARUS&lang=[en,ru,by]&units=metric&APPID=0bf8348d5aae47b1557879b3282e99e8`,
  openWeatherMapAPIUrl: `https://api.weatherbit.io/v2.0/current?&&lang=be&key=1effa426610641d39c6979358387c99f`,
  // opencagedataAPIUrl: `https://api.opencagedata.com/geocode/v1/json?q={location}&language={language}&key=1d94abfb3a1c4cddaf174403a74c55c5&pretty=1&no_annotations=1`,
  opencagedataAPIUrl: `https://api.opencagedata.com/geocode/v1/json?q={location}&language={language}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`,
};

export default MODEL;
