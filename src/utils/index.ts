export const getJwtToken = () => document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];
