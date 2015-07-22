module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      // 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          "src/assets/js/jquery-2.1.1.min.js",
          "src/assets/js/jquery.mask.min.js",
          "src/assets/js/scrollReveal.js",
          "src/assets/js/unslider.min.js",
          "src/assets/js/spells.js",
        ],
        dest: '.tmp/spells.js'
      }
    },

    uglify: {
      build: {
        src: '.tmp/spells.js',
        dest: 'build/assets/js/spells.<%= pkg.version %>.min.js'
      }
    },

    less: {
      development: {
        files: {
          ".tmp/style.css": "src/assets/css/style.less"
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 versions', 'ie 8', 'ie 9']
      },

      single_file: {
        src: '.tmp/style.css'
      }
    },

    cssmin: {
      target: {
        files: {
          'build/assets/css/style.<%= pkg.version %>.min.css': '.tmp/style.css'
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['assets/fonts/**'],
          dest: 'build/',
          filter: 'isFile'
        }, {
          src: ['src/fav.ico'],
          dest: 'build/fav.<%= pkg.version %>.ico'
        }, {
          expand: true,
          cwd: 'src/',
          src: ['assets/img/**'],
          dest: 'build/',
          filter: 'isFile'
        }],
      },
    },

    includeSource: {
      options: {
        basePath: 'build',
        baseUrl: '',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
            fav: '<link href="{filePath}" rel="icon" type="image/x-icon">',
            path: '{filePath}'
          }
        }
      },
      myTarget: {
        files: {
          'build/index.html': 'src/index.html'
        }
      }
    },

    clean: {
      before: ['build'],
      after: ['.tmp']
    },

    watch: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: true
      },

      index: {
        files: 'src/index.html',
        tasks: ['includeSource']
      },

      js: {
        files: 'src/assets/js/**/*.js',
        tasks: ['concat', 'uglify', 'clean:after']
      },

      less: {
        files: 'src/assets/css/**/*.less',
        tasks: ['less', 'autoprefixer', 'cssmin', 'clean:after']
      }
    }


  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-include-source');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('build', [
    'clean:before',
    'concat',
    'uglify',
    'less',
    'autoprefixer',
    'cssmin',
    'copy',
    'includeSource',
    'clean:after'
  ]);

  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

};
