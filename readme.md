# XML Editor
This is a HTML5 app for writing XSLT. See the (demo)[[http://chrisusick.github.io/xml-editor/](http://chrisusick.github.io/xml-editor/)] for more information.

# technologies:
- [yeoman generator gulp-webapp](https://github.com/yeoman/generator-gulp-webapp)
- ES6 Javascript
- [gulp](http://gulpjs.com/) for development pipelining
- [ace editor](http://ace.c9.io/#nav=about)
- [web components](http://webcomponents.org/)

# building production site
- commit app when `gulp serve:dist` workds
- switch to branch `gh-pages-test`
- merge `master` into `gh-pages-test`
- copy the `dist/` directory files into the root
  - `cp -r dist/* .`

- commit `gh-pages-test` after it works
- merge `gh-pages-test` to `gh-pages`
