module.exports=function(grunt){

     //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    //All configuration goes here
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        clean: {
            //all: ['dist/*.*'],
            image: 'dist/img',
            //css: 'dist/html/css',
            html: 'dist',
            all: 'dist/views',
        },
          copy: {
          src: {
                files: [
                  {expand: true, cwd: 'src/views', src: ['**'], dest: 'dist/views'}
                ]
              }
        },
        uglify:{
            bulid:{
                src:'src/js/perfmatters.js',
                dest:'dist/js/perfmatters.js'
            }
        },
        imagemin: {
            dist: {
                options: {
                  optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                },{
                    expand: true,
                    cwd: 'src/views/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/views/images/'
                }]
            }
        },

          htmlmin: {
              options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
              },
              html: {
                files: [
                  {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist'}
                ]
              }
        }

    });

    //Tell grunt we plan to use this plug-in
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //Tell grunt what to do when we type "grunt" into the terminal
    //grunt.registerTask('default',['uglify']);

    grunt.registerTask('default', [
    'clean',
    'copy',
    'imagemin',
    //'cssmin',
    'uglify',
    'htmlmin'
  ]);

  //grunt.registerTask('publish', ['default']);
}