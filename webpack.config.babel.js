import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const devMode = nodeEnv === 'development';

console.log('nodeEnv ==> ', nodeEnv);
console.log('devMode ==> ', devMode);

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const config = {
  mode: nodeEnv,
  entry: {
    app: `${src}/js/app.js`
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${dist}/`,
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx?|vue)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { failOnError: false }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    'IE >= 11',
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    open: 'Google Chrome',
    inline: true,
    hot: true,
    port: 8080,
    contentBase: dist
  },
}
/*
npmとは

  ・NodePackageManegerの略で、Node.jsのパッケージを管理するツール
npm instalとは（する理由）
  ・package.jsonに書かれているパッケージをインストールするもので、dependenciceに追加されているパッケージをインストールする。また、実行した時、最新のリリースバージョンがdependenciceに書き込まれる。今回はトランスパイルに必要な＠babel/core,@babel/preset-env,@babel/registerをインストールするために実行したと思われる。
  参考文献
  [1]https://bagelee.com/programming/npm-package-json-dependencies/　閲覧日2019/10/21/23:15
npm scriptsとは（設定する理由）
  ・package.jsonの中のscriptに定義してあるコマンドを実行する事をさす。また、長くなるコマンドを短くまとめたり、package.jsonの中に定義されているバージョンで実行できるため開発では有効である。
webpackとは何か・何ができるか
  webpackはNode.jsで動くモジュールバンドラーで複数に渡るJavascriptファイルをい凸にまとめてくれるもの。また、新しいJavascriptで書かれた物をブラウザに対応したJavascriptの書き方にトランスパイルをしてくれたり、SassをCssにコンパイルしたり、ローカルサーバーを立ち上げられる。
  webpackではバンドルが一番の仕事であり、そのほかは別途設定が必要である。また、差分ビルドを行うため高速でバンドルが可能である。
設定ファイルの.babelという拡張子は何か
npm run watchは何を実行しているのか
  ・package.jsonの中のscriptで定義されているcross-env NODE_ENV=development webpack-dev-server --colorを実行している。cross-envはnpm scriptを実行時に任意の環境変数を設定できるようにし、NODE_ENV変数はdevelopmentのため、開発環境での実行を意味する。また、--colorはターミナルでログを色付き出してくれるものである。
npm run buildは何を実行しているか
  ・package.jsonの中のscriptで定義されているcross-env NODE_ENV=production webpack --progressを実行している。NODE_ENVがproductionなため、公開用を意味する。この場合バンドルした物をファイルに書き出す。
entryとは
  ・outputで基となるファイルまでのパスを指定するもの。
outputとは
  ・entryで指定したファイルをバンドルしてfilenameでファイルの名前を指定しpathでファイルを吐き出す場所を指定する。、今回のバンドルではapp.jsの中で呼び出されているtest.jsを1つにまとめてapp.bundle.jsにしている。
loaderとは
  ・sassをコンパイルしたり、ブラウザで動くコードにトランスパイルしたりするときに使う。
pluginsとは
  ・loaderではできない処理を行うときに使う。
resolveとは
  ・webpackの振る舞いを任意で変更するもの。
webpack-dev-servertとは
  ・ローカルサーバーを立ち上げつつ、webpackコマンドを実行するもの。
*/
export default config;
