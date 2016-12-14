module.exports=function(grunt){

    //All configuration goes here
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify:{
            bulid:{
                src:'js/perfmatters.js',
                dest:'js/perfmatters.min.js'
            }
        }
    });

    //Tell grunt we plan to use this plug-in
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Tell grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default',['uglify']);
}