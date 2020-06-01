const MODEL = {
  errorMsg: 'Unfortunately, an error occurred on the API side. Try again, please!',
  imageBackgroundAPIUrl:
    'https://api.unsplash.com/photos/random?query=nature,sky,{keywords}&client_id=jevIz2yqJ8V1u2sS0HIqHs0SnCgCsrKavmqTcR1Av6s',
  // geolocationAPIUrl: 'https://ipinfo.io/json?token=c2e6ca672c9bef', мой
  geolocationAPIUrl: 'https://ipinfo.io/json?token=c2e6ca672c9bef',
  // openWeatherMapAPIUrl: `https://api.openweathermap.org/data/2.5/forecast?q=MIORY, BELARUS&lang=[en,ru,by]&units=metric&APPID=0bf8348d5aae47b1557879b3282e99e8`,
  dailyForecastAPIUrl: `https://api.weatherbit.io/v2.0/current?&lat={location}&lon={additionalLocation}&lang={language}&key=1effa426610641d39c6979358387c99f`,
  threeDayForecastAPIUrl: `https://api.weatherbit.io/v2.0/forecast/daily?&lat={location}&lon={additionalLocation}&days=4&units=M&lang={language}&key=1effa426610641d39c6979358387c99f`,
  // weatherbitAPIUrl: `https://api.weatherbit.io/v2.0/current?&&lang=be&key=1effa426610641d39c6979358387c99f`, мой ключ //619b6dd131094859b162bb2577321b2a

  // opencagedataAPIUrl: `https://api.opencagedata.com/geocode/v1/json?q={location}&language={language}&key=1d94abfb3a1c4cddaf174403a74c55c5&pretty=1&no_annotations=1`,
  opencagedataAPIUrl: `https://api.opencagedata.com/geocode/v1/json?q={location}&language={language}&key=1d94abfb3a1c4cddaf174403a74c55c5&pretty=1&no_annotations=1`,
  // c6b6da0f80f24b299e08ee1075f81aa5 my
  weatherDescription: {
    en: ['FEELS LIKE:', 'WIND:', 'M/S', 'HUMIDITY:'],
    ru: ['ОЩУЩАЕТСЯ КАК:', 'ВЕТЕР:', 'М/С', 'ВЛАЖНОСТЬ:'],
    be: ['АДЧУВАЕЦЦА ЯК:', 'ВЕЦЕР:', 'М/С', 'ВІЛЬГОТНАСЦЬ:'],
  },
  weatherImageTemplate: `<img class="image" src="https://www.weatherbit.io/static/img/icons/{icon_code}.png">`,
  threeDayForecastTemplate: `
    <div class="weather__card">
      <p class="weather__day">{day}</p>
      <div class="wrapper">
        <p class="weather__temperature">
         <span class="temp-value">{temperature}</span>°</p>
        <div class="weather__icon">
         <img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/{icon}.png">
        </div>
      </>
    </div>`,
};

export default MODEL;
