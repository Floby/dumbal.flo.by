/* eslint-env node */

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Dumbal League",
    short_name: "Dumbal",
    description: "Compteur de score pour le Dumbal",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#9c27b0",
    icons: [
      {
        src: '/assets/icons/appicon-32.png',
        sizes: `32x32`,
        targets: ['favicon']
      },
      ...[192, 280, 512].map((size) => ({
        src: `/assets/icons/appicon-${size}.png`,
        sizes: `${size}x${size}`
      }))
    ],
    ms: {
      tileColor: '#9c27b0'
    },
    apple: {
      statusBarStyle: 'black'
    }
  };
}
