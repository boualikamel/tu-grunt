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
 we add this line to load the library from node modules into our grunfile `grunt.loadNpmTasks('grunt-contrib-uglify');`
 and we add the task to the default task of grunt for the execution
 `grunt.registerTask("default", [ "uglify" ]);`


