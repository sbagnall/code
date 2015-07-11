/*global module:false*/
'use strict';

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        strict: true,
        node: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      shared: {
        src: ['src/shared/**/*.js']
      },
      app: {
        src: ['src/app/**/*.js']
      },
      www: {
        src: ['src/www/**/*.js']
      }
    },
    browserify:{
      public: {
        src: ['<%= jshint.www.src %>', '<%= jshint.shared.src %>'],
        dest: 'public/app.bundle.js',
        options: {
          // browserifyOptions: {
          //   debug: true
          // }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  // Default task.
  grunt.registerTask('default', ['jshint', 'browserify']);

};
