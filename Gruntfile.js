/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
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
        src: ['src/*.js']
      } 
    },
    browserify:{
      public: {
        src: ['<%= jshint.shared.src %>'],
        dest: 'public/app.bundle.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  // Default task.
  grunt.registerTask('default', ['jshint', 'browserify']);

};
