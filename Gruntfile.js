const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    sass: {
      dist: {
          options: {
              implementation: sass,
              sourceMap: true,
          },
          files: {
            'dist/css/styles.css' : 'src/scss/styles.scss'
          }
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['copy']
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist/' },
          { expand: true, cwd: 'src/css/', src: ['**/*.css'], dest: 'dist/css/' },
          { expand: true, cwd: 'src/js/', src: ['**/*.js'], dest: 'dist/js/' }
        ]
      }
    }
  });

  grunt.registerTask('default', ['sass', 'copy', 'connect', 'watch']);
};
