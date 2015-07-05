// gruntfile.js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        node: true,
        jasmine: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      mainjs: {
        src: 'main.js'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      node_scripts: {
        src: ['app/**/*.js', 'spec/**/*[sS]pec.js']
      }
    },
    jasmine_node: {
      options: {
        forceExit: true,
      },
      all: []
    },
    watch: {
      mainjs: {
        files: '<%= jshint.mainjs.src %>',
        tasks: ['jshint:mainjs']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      node_scripts: {
        files: '<%= jshint.node_scripts.src %>',
        tasks: ['jshint:node_scripts', 'jasmine_node']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node']);

};
