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

export const removeTokens = () => {
  setCookie('token', '');
  localStorage.removeItem('refreshToken');
}

//функция подсчета цены заказа
export const calculateTotalPrice = (ingredients, orderIngredients) => {
    //массив для подсчета цены заказа
    const ingredientsForTotalPrice = orderIngredients.filter((ingredient) => ingredient)
    .map((orderIngredient) =>
    ingredients.find((ingredient) => ingredient._id === orderIngredient));

    const bun = ingredientsForTotalPrice.find(ingredient => ingredient.type === 'bun');
    const middleIngredients = ingredientsForTotalPrice.filter(ingredient => ingredient.type !== 'bun');

    const total = (bun ? bun.price * 2 : 0) + middleIngredients.reduce((sum, ingredient) => {
        return sum + ingredient.price
    }, 0);

    return total;
};

//функция приведения времени в читаемый вид
export const formatDate = (date) => {
    const orderDate = Number(
      date
        .split('T')[0]
        .split('-')[2]
    );
    const orderHours = date.split('T')[1].split('.')[0].split(':',2)[0];
    const orderMinutes = date.split('T')[1].split('.')[0].split(':',2)[1];
  
    const orderTime = `${Number(orderHours) + 3 >= 24 ? Number(orderHours) - 21 : Number(orderHours) + 3}:${orderMinutes}`;
    const dateNow = new Date().getDate();
    let formattedDate = '';

    if (orderDate === dateNow) {
        formattedDate = `Сегодня, ${orderTime} i-GMT+3`;
    }

    if (orderDate === dateNow - 1) {
        formattedDate = `Вчера, ${orderTime} i-GMT+3`;
    }

    if (orderDate < dateNow - 5) {
        formattedDate = `${dateNow - orderDate} дней назад, ${orderTime} i-GMT+3`;
    }

    if (orderDate < dateNow - 1) {
        formattedDate = `${dateNow - orderDate} дня назад, ${orderTime} i-GMT+3`;
    }

    return formattedDate;
};