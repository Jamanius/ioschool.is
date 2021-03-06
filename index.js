var Metalsmith = require('metalsmith');
var plugins = require('load-metalsmith-plugins')();

var m = Metalsmith(__dirname)
.clean(false);

if (process.argv[2] === '-w') {
  m.use(plugins.watch({
    livereload: true,
  }));
}

m
.use(plugins.markdown())
.use(plugins.inPlace('handlebars'))
.use(plugins.layouts({
  engine: 'handlebars',
  partials: {
    analytics: 'partials/analytics',
    footer: 'partials/footer',
  },
}))
.build(function (err, files) {
  if (err) {
    console.error("message:", err.message);
    console.error("object:", JSON.stringify(err, null, 2));
    console.error("stack:", err.stack);
    throw err;
  }
  //console.log(files)
})
;
