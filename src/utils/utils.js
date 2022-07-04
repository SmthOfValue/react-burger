//генератор уникальных ключей для метода map
export const generateID = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

//обработчик нажатия на кнопку
export const onButtonClick = (form) => {
    form.requestSubmit();
}

//установщик cookie
export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value + '; path=/';
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
} 

export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } 

export const setTokens = (res) => {
    let accessToken;
    accessToken = res.accessToken.split('Bearer ')[1];
    if (accessToken) {                  
        setCookie('token', accessToken);
    }
    localStorage.setItem('refreshToken', res.refreshToken);
};