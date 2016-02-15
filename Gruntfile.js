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
    },
    concat: {
      bower: {
        src: ['browser-header.js', 'main.js', 'browser-footer.js'],
        dest: 'dist/a..z.js'
      }
    },
    uglify: {
      bower: {
        files: {
          'dist/a..z.min.js': ['dist/a..z.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint:all', 'nodeunit']);

};