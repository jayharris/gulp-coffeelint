'use strict';
var PluginError;

PluginError = require('gulp-util').PluginError;

exports.isLiterate = function(file) {
  return /\.(litcoffee|coffee\.md)$/.test(file);
};

exports.createPluginError = function(message) {
  return new PluginError('gulp-coffeelint', message);
};

exports.formatOutput = function(errorReport, opt, literate) {
  var error, errors, errs, i, len, path, ref, warns;
  errs = 0;
  warns = 0;
  ref = errorReport.paths;
  for (path in ref) {
    errors = ref[path];
    for (i = 0, len = errors.length; i < len; i++) {
      error = errors[i];
      if (error.level === 'error') {
        errs++;
      }
      if (error.level === 'warn') {
        warns++;
      }
    }
  }
  return {
    success: errs === 0,
    results: errorReport,
    errorCount: errs,
    warningCount: warns,
    opt: opt,
    literate: literate
  };
};
