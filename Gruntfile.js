const sass = require("node-sass");

module.exports = function (grunt) {
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            "dist/main.min.js": ["dist/main.min.js"],
          },
        },
      },
      sass: {
        options: {
          implementation: sass,
          sourceMap: false,
        },
        dist: {
          files: {
            "dist/style.min.css": "src/sass/main.scss",
          },
        },
      },
      htmlbuild: {
        dist: {
          src: "src/index.html",
          dest: "dist/",
          options: {
            beautify: true,
            relative: true,
            basePath: false,
            data: {
              // Data to pass to templates
              version: "0.1.0",
              title: "index",
            },
          },
        },
      },
      concat: {
        options: {
          separator: ";",
        },
        dist: {
          src: [
            "node_modules/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/chart.js/dist/Chart.min.js",
          ],
          dest: "dist/libraries.js",
        },
      },
      concat_css: {
        all: {
          src: [
            "dist/style.min.css",
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/chart.js/dist/Chart.min.css",
          ],
          dest: "dist/style.min.css",
        },
      },
  
      babel: {
        options: {
          sourceMap: false,
          presets: ["@babel/preset-env"],
        },
        dist: {
          files: {
            "dist/main.min.js": ["src/main.js"],
          },
        },
      },
      cssmin: {
        options: {
            keepSpecialComments: 0 
        },
        target: {
          files: {
            'dist/style.min.css': ['dist/style.min.css']
          }
        }
      },

      connect: {
        server: {
          options: {
            port: 9000,
            base: "./dist",
            hostname: "localhost",
            protocol: "http",
            livereload: true,
            open: true,
          },
        },
      },
      watch: {
        options: {
          livereload: true,
        },
        htmlbuild: {
            files: ["src/index.html"],
            tasks: ["htmlbuild"],
          },
   
        js: {
          files: ["src/*.js"],
          tasks: ["babel","uglify","concat"],
        },
        css:{
            files: ["src/**/*.scss"],
            tasks: ["sass","concat_css","cssmin"],
        }
     
   
      }
    });
  
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-html-build");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    

    grunt.registerTask("dev", ["htmlbuild", "connect","watch"]);
    grunt.registerTask("prod", ["htmlbuild", "sass","babel","uglify", "concat_css", "concat", "cssmin"]);
  };
  