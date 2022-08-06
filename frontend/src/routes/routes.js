const apiPath = '/api/v1';

const getRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  chatPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
};

export default getRoutes;
