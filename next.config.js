const withLess = require("next-with-less");

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "primary-color": "#A32A29",
        "border-radius-base": "2px",
      },
    },
  },
});
