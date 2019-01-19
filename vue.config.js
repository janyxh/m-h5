module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/mobile" : "/",
  devServer: {
    host: "0.0.0.0",
    port: 8080
  },
  configureWebpack: {
    externals: {
      wx: "wx"
    },
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views"
      }
    }
  }
};
