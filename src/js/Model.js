const MODEL = {
  errorMsg: 'Unfortunately, an error occurred on the API side. Try again, please!',
  imageBackgroundAPIUrl:
    'https://api.unsplash.com/photos/random?query={keywords},nature,sky,landscape&client_id=jevIz2yqJ8V1u2sS0HIqHs0SnCgCsrKavmqTcR1Av6s',
  // geolocationAPIUrl: 'https://ipinfo.io/json?token=c2e6ca672c9bef', мой
  geolocationAPIUrl: 'https://ipinfo.io/json?token=eb5b90bb77d46a',
  // openWeatherMapAPIUrl: `https://api.openweathermap.org/data/2.5/forecast?q=MIORY, BELARUS&lang=[en,ru,by]&units=metric&APPID=0bf8348d5aae47b1557879b3282e99e8`,
  dailyForecastAPIUrl: `https://api.weatherbit.io/v2.0/current?&lat={location}&lon={additionalLocation}&lang={language}&key=1effa426610641d39c6979358387c99f`,
  threeDayForecastAPIUrl: `https://api.weatherbit.io/v2.0/forecast/daily?&lat={location}&lon={additionalLocation}&days=5&units=M&lang={language}&key=1effa426610641d39c6979358387c99f`,
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
         <img class="icon" src="https://www.weatherbit.io/static/img/icons/{icon}.png">
        </div>
      </>
    </div>`,
  loader: `
    <div class="loader">
    <div>
      <ul>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
        <li>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
          </svg>
        </li>
      </ul>
    </div><span>Loading</span>`,

  modal: `
  <div class="modal">
    <div class="modal__button-close"></div>
    <p class="modal__message">{message}</p>
  </div>`,
  messageKeys: {
    ru: ['Город не найден', 'К сожалению, на стороне сервера возникли ошибки. Попробуйте снова!'],
    en: ['Сity not found', 'Unfortunately, server-side errors have occurred. Try it again!'],
    be: ['Горад не знойдзены', 'На жаль, на боку сервера паўсталі памылкі. Паспрабуйце зноў!'],
  },
  info: {
    ru: `
    <p class="modal__title">Информация</p>
    <p class="modal__description"><span class="modal__subtitle">ПОГОДА, ПРОГНОЗ</span> - голосовые уведомления о прогнозе погоды</p>
    <p class="modal__description"><span class="modal__subtitle">ГРОМЧЕ, ТИШЕ</span> - кодовые фразы управления громкостью</p>`,
    en: `
    <p class="modal__title">Information</p>
    <p class="modal__description"><span class="modal__subtitle">WEATHER, FORECAST</span> - weather voice commands</p>
    <p class="modal__description"><span class="modal__subtitle">LOUDLY, QUIETLY</span> - volume control code phrases</p>`,
    be: `
    <p class="modal__title">Iнфармацыя</p>
    <p class="modal__description"><span class="modal__subtitle">НАДВОР'Е, ПРАГНОЗ</span> - галасавыя паведамлення аб прагнозе надвор'я</p>
    <p class="modal__description"><span class="modal__subtitle">ГУЧНЕЙ, ЦIШЭЙ</span> - кодавыя фразы кіравання гучнасцю</p>`,
  },
};

export default MODEL;
