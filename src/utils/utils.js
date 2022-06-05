//генератор уникальных ключей для метода map
export const generateID = () => Date.now().toString(36) + Math.random().toString(36).substr(2);