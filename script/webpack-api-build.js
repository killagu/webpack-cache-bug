'use strict';

const webpack = require('webpack');
const path = require('path');

const webpackConfig = process.argv[2] !== 'new' ?
  {
    cache: {
      type: 'filesystem',
      compression: false,
      buildDependencies: {},
    },
  } : {
    cache: {
      type: 'filesystem',
      compression: false,
      buildDependencies: {
        foo: [ path.join(__dirname, '../build-dep-foo.json') ],
      },
    },
  };

(async () => {
  const compiler = webpack([ webpackConfig ]);
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    compiler.close(err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('build succeed');
      process.exit(0);
    });
  });
})();
