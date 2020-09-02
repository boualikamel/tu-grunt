module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
        my_target: {
          files: {
            'dest/main.min.js': ['src/main.js']
          }
        }
      }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask("default", [ "uglify" ]);
};
