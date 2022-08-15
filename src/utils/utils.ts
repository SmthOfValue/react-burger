import {
  TIngredient
} from './types';

//генератор уникальных ключей для метода map
export const generateID = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

//обработчик нажатия на кнопку
export const onButtonClick = (form: HTMLFormElement | null) => {
  if (form) {
    form.requestSubmit();
  }
}

//установщик cookie
export function setCookie(name: string, value: string, props?: Record<string, string | number | Date | boolean>) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp instanceof Date) {
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

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } 

export const setTokens = (accessTokenString: string, refreshTokenString: string) => {
    let accessToken;
    accessToken = accessTokenString.split('Bearer ')[1];
    if (accessToken) {                  
        setCookie('token', accessToken);
    }
    localStorage.setItem('refreshToken', refreshTokenString);
};

export const removeTokens = () => {
  setCookie('token', '');
  localStorage.removeItem('refreshToken');
}

//функция подсчета цены заказа
export const calculateTotalPrice = (ingredients: ReadonlyArray<TIngredient>, orderIngredients: ReadonlyArray<string>): number => {
    //массив для подсчета цены заказа
    const ingredientsForTotalPrice = orderIngredients.filter((ingredient) => ingredient)
    .map((orderIngredient) =>
    ingredients.find((ingredient) => ingredient._id === orderIngredient));

    const bun = ingredientsForTotalPrice.find(ingredient => ingredient?.type === 'bun');
    const middleIngredients = ingredientsForTotalPrice.filter(ingredient => ingredient?.type !== 'bun');

    const total = (bun ? bun.price * 2 : 0) + middleIngredients.reduce((sum, ingredient) => {
        return ingredient ? sum + ingredient.price : sum;
    }, 0);

    return total;
};

//функция приведения времени в читаемый вид
export const formatDate = (date: string): string => {
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