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
    theme_color: "#fff",
    icons: [
      {
        src: "/logo.svg",
        sizes: "540x540",
        type: "image/svg"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
