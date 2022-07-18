const apiPath = '/api/v1';

const getRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  createPath: () => [apiPath, 'signup'].join('/'),
}

export default getRoutes;