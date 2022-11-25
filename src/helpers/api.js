export const getUserToken = async () => {
  const requestResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await requestResponse.json();
  return data.token;
};

const ENDPOINT = 'https://opentdb.com/api.php?amount=5&token=';

export const getQuests = async (token, Endy = ENDPOINT) => {
  // const ENDPOINT = 'https://opentdb.com/api.php?amount=5&token=';
  const requestResponse = await fetch(Endy + token);
  const data = await requestResponse.json();
  return data;
};

export const getCategories = async () => {
  const requestResponse = await fetch('https://opentdb.com/api_category.php');
  const data = await requestResponse.json();
  const arrCategories = [];
  data.trivia_categories.forEach((element) => {
    arrCategories.push(element.name);
  });
  const categories = ['Any category', ...arrCategories];
  return categories;
};
