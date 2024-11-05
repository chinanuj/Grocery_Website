const path = require('path');

module.exports = {
  // Other configuration...
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, '../Backend'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  // Additional Webpack settings
};
