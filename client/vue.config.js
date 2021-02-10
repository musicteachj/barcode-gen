const path = require('path');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
}