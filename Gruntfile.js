module.exports = function(grunt) {
  // Include all dependencies from package.json
  require('load-grunt-tasks')(grunt);

  // Package-specific configs
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // LESS / CSS
    autoprefixer: {
      basic: {
        options: {
          browsers: ['Android 2.1', '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
        },
        expand: true,
        cwd: 'www/css/',
        src: '*.css',
        dest: 'www/css/'
      }
    },

    cssmin: {
      basic: {
        expand: true,
        cwd: 'www/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'www/css/',
        ext: '.min.css'
      }
    },

    less: {
      basic: {
        expand: true,
        cwd: 'www/less/',
        src: ['**/*.less', '!**/_*.less'],
        dest: 'www/css/',
        ext: '.css'
      }
    },

    // JS
    uglify: {
      basic: {
        files: {
          'js/default.min.js': ['js/default.js']
        }
      },
      bower: {
        files: {
          'www/js/dist/angular.min.js' : ['www/bower_components/fastclick/lib/fastclick.js',
                                          'www/bower_components/angular/angular.js',
                                          'www/bower_components/angular-route/angular-route.js',
                                          'www/bower_components/angular-animate/angular-animate.js',
                                          'www/bower_components/angular-sanitize/angular-sanitize.js',
                                          'www/bower_components/angular-timer/dist/angular-timer.min.js']
        }
      }
    },

    // Spriting
    sprite: {
      basic: {
        'src': ['www/img/sprite/*.png'],
        'destImg': 'www/img/sprite.png',
        'destCSS': 'www/less/_sprite.less'
      }
    },

    // watching
    watch: {
      less: {
        files: ['www/less/*.less'],
        tasks: ['less:basic', 'newer:autoprefixer:basic', 'cssmin:basic']
      },

      // js: {
      //   files: ['js/default.js'],
      //   tasks: ['newer:uglify:basic']
      // },

      // sprite: {
      //   files: ['img/sprite/*'],
      //   tasks: ['sprite:basic']
      // },

      livereload: {
        files: [
          'www/index.html',
          'www/css/*.min.css',
          // 'www/js/**/*.min.js'
        ],
        options: {
          livereload: true
        }
      }
    }

  });

  // Default tasks
  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('build', ['uglify:bower', 'less:basic', 'newer:autoprefixer:basic', 'cssmin:basic']);
};