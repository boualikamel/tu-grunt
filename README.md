# harmo-grunt
a tutorial grunt for the team
### initialize your node project with npm init
### Creation Gruntfile file
`module.exports = function (grunt) {
  grunt.initConfig({
  });
};`
### installing grunt and grunt-cli into devDependency and adding the CMD to package.json
`npm i -d grunt grunt-cli`
`"start": "grunt"`
### adding the commende to execute the tasks
```shell grunt.registerTask("default", [  ]);```

## Adding and configuring our tasks !
### Adding the source code
here we create the src folder and the main js file to test a task before
### Adding the first task :o to uglify the code
we install the uglify code
```shell npm i -d grunt-contrib-uglify ```
 we add this line to load the library from node modules into our gruntfile `grunt.loadNpmTasks('grunt-contrib-uglify');`
 and we add the task to the default task of grunt for the execution
 `grunt.registerTask("default", [ "uglify" ]);`
 ### Adding the other tasks of libraries css minify, concat, babel and sass and build html, clean
`npm i -d grunt-sass grunt-babel grunt-contrib-cssmin grunt-contrib-concat grunt-html-build`
 
  grunt sass is for compiling the sass code to css code
  grunt babel is for compîling the ecmascript advanced version to a es5 code
  grunt cssmin for minifying a css code
  grunt concat is for concatening many source file into one output file
  grunt html is for building html code

we add a code below for loading the library from node modules
```js
 grunt.loadNpmTasks("grunt-contrib-concat");
 grunt.loadNpmTasks("grunt-contrib-uglify");
 grunt.loadNpmTasks("grunt-contrib-cssmin");
 grunt.loadNpmTasks('grunt-concat-css');
 grunt.loadNpmTasks("grunt-sass");
 grunt.loadNpmTasks("grunt-html-build");
 grunt.loadNpmTasks('grunt-babel');
```
### building our html file
we add a html file, index.html
and than we add a link balise referencing to our destination file css after minify and concat we call it style.min.css
`<link rel="stylesheet" href="style.min.css">`

Than we configure our second task for building html we define the source file and destination folder and some option to beautify for example our html file 
`
     htmlbuild: {
        dist: {
          src: "src/index.html",
          dest: "dist/",
          options: {
            beautify: true
            data: {
              // Data to pass to templates
              version: "0.1.0",
              title: "Harmo Grunt",
            },
          },
        },
      },
      `

### compile our sass file
we add a first sass file, call it main.scss in sass folder
we install `node-sass` and import it into our gruntfile

then we add the config of sass task here we define the sources and destination files

`sass: {
        options: {
          implementation: sass,
          sourceMap: false,
        },
        dist: {
          files: {
            "dist/style.min.css": "src/sass/main.scss",
          },
        },
      },`

### compile our babel code file
we add @babel/core and @babel/preset-env libraries into our project this libraries is necessary to babel task for building our code

we define the source file here and the destination file like that and we will change the order of tasks and start from babel to uglify, it means we compile our code into ecmascript 5 and after that we uglify it
`    babel: {
        options: {
          sourceMap: true,
          presets: ["@babel/preset-env"],
        },
        dist: {
          files: {
            "dist/main.min.js": ["src/main.js"],
          },
        },
      },`

      and the uglify config will be like ( the source file will change and become the result of babel compiling )
      `
        uglify: {
        my_target: {
          files: {
            "dist/main.min.js": ["dist/main.min.js"],
          },
        },
      },
      `
    the order of the tasks will be 
    `grunt.registerTask("default", ["htmlbuild", "sass","babel","uglify"]);`
  
### concat our js libraries and concat our css libraries and file code file

the configuration is very clear and after adding two libraries bootstrap and chart.js 

`     concat_css: {
        all: {
          src: [
            "dist/style.min.css",
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/chart.js/dist/Chart.min.css",
          ],
          dest: "dist/style.min.css",
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
      
      `
### minify our css file 
after adding the library we will use it and minify the result file `grunt-contrib-cssmin`
`
cssmin: {
  options: {
    mergeIntoShorthands: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      'dist/style.min.css': ['dist/style.min.css']
    }
  }
}
`
 ### preparing the dev server and hot reload

installation du connect pour activer l'auto-load dans un serveur de développement et le watch pour reloader les tasks qu'on veut reloader

`npm i -d grunt-contrib-connect grunt-contrib-watch`

 `grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");`

here we add 

   ` watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ["src/*.scss"],
        tasks: ["sass"],
      },
      js: {
        files: ["src/*.js"],
        tasks: ["concat","babel","uglify"],
      },
      htmlbuild: {
        files: ["src/index.html"],
        tasks: ["htmlbuild"],
      },
 
    },`

here we added a server and the base for detecting any changes to reload a page
    `
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
    `

    and finally we add a personalized task for developpement server
