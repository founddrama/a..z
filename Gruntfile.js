/*jshint node:true */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {},
      source: ['main.js'],
      tests:  ['tests/*.js'],
      all:    ['main.js', 'Gruntfile.js', 'tests/*.js']
    },
    nodeunit: {
      all: ['tests/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint:all', 'nodeunit']);

};