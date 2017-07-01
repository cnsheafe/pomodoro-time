function parseCookieString(cookieString, state) {
  console.log(cookieString);
  if (typeof cookieString === 'string') {
    if (cookieString.length > 0) {
      cookieString.split(';').forEach(pair => {
        let items = pair.split('=');
        if(items[0] === 'pomodoro') {
          state.cookie = {
            name: items[0],
            val: items[1]
          };
        }
      });
    }
  }
}

module.exports = parseCookieString;
