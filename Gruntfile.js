module.exports = function(grunt) {
  // Include all dependencies from package.json
  require('load-grunt-tasks')(grunt);

  // Package-specific configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      css: '<%= pkg.paths.global %><%= pkg.paths.css %>',
      img: '<%= pkg.paths.global %><%= pkg.paths.img %>',
      js: '<%= pkg.paths.global %><%= pkg.paths.js %>',
      sass: '<%= pkg.paths.global %><%= pkg.paths.sass %>',
      less: '<%= pkg.paths.global %><%= pkg.paths.less %>',
      fonts: '<%= pkg.paths.global %><%= pkg.paths.fonts %>',
      dist: '<%= pkg.paths.global %><%= pkg.paths.dist %>',
    },
    autoprefixer: {
      basic: {
        options: {
          browsers: ['Android 2.1', '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
        },
        expand: true,
        cwd: '<%= dirs.css %>',
        src: '*.css',
        dest: '<%= dirs.css %>'
      }
    },
    clean: ['<%= dirs.dist %>'],
    compass: {
      options: {
        basePath: '<%= pkg.paths.global %>',
        cssDir: '<%= pkg.paths.css %>',
        imagesDir: '<%= pkg.paths.img %>',
        sassDir: '<%= pkg.paths.sass %>',
        relativeAssets: true
      },
      basic: {}
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= dirs.css %>',
            src: ['*.min.css'],
            dest: '<%= dirs.dist %>css/'
          },
          {
            expand: true,
            cwd: '<%= dirs.js %>',
            src: ['**/*.min.js'],
            dest: '<%= dirs.dist %>js/'
          },
          {
            expand: true,
            cwd: '<%= pkg.paths.global %>fonts/',
            src: ['*'],
            dest: '<%= dirs.dist %>fonts/'
          }
        ]
      }
    },
    csscss: {
      basic: {
        expand: true,
        cwd: '<%= dirs.css %>',
        src: ['*.css', '!*.min.css']
      }
    },
    cssmin: {
      basic: {
        expand: true,
        cwd: '<%= dirs.css %>',
        src: ['*.css', '!*.min.css'],
        dest: '<%= dirs.css %>',
        ext: '.min.css'
      }
    },
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= dirs.img %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dirs.dist %>img/'
        }]
      }
    },
    less: {
      basic: {
        expand: true,
        cwd: '<%= dirs.less %>',
        src: ['*.less', '!_*.less'],
        dest: '<%= dirs.css %>',
        ext: '.css'
      }
    },
    uglify: {
      basic: {
        files: {
          '<%= dirs.js %>default.min.js': ['<%= dirs.js %>_plugins.js', '<%= dirs.js %>default.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['<%= dirs.sass %>*.scss'],
        tasks: ['compass:basic', 'newer:autoprefixer:basic']
      },
      less: {
        files: ['<%= dirs.less %>*.less'],
        tasks: ['less:basic', 'newer:autoprefixer:basic']
      },
      js: {
        files: ['<%= dirs.js %>**/*.js', '!<%= dirs.js %>*.min.js'],
        tasks: ['newer:uglify:basic']
      },
      livereload: {
        files: [
          'application/**/*.phtml',
          '<%= dirs.css %>*.min.css',
          '<%= dirs.img %>**/*.{png,jpg,gif}',
          '<%= dirs.js %>**/*.min.js'
        ],
        options: {
          livereload: true
        }
      }
    },
    build: {
      less: 'less',
      sass: 'compass'
    }
  });

  // Default tasks
  grunt.registerTask('default', ['watch']);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(['clean', this.data + ':basic', 'newer:autoprefixer:basic', 'newer:cssmin:basic', 'newer:uglify:basic', 'copy:build', 'imagemin:build']);
  });
};