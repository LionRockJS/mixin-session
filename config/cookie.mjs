export default {
  salt:'theencryptsaltatleast32character',
  options: {
    secure: false,
    maxAge: 86400000,
    httpOnly: true,
    sameSite: 'Strict',
    path: '/',
  }
}