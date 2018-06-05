module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!__test__/**/*.spec.js',
      'index.js', 
      'index.html',
      'public/**/*.html',
    ],

    tests: [
      '__test__/**/*.spec.js',
    ],

    testFramework: 'jest',
    env: {
      type: 'node',
    },
  };
};