module.exports = function (grunt) {
    'use strict';

    // Load Grunt plugins.
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-tagrelease');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bumpup: {
            files: ['package.json', 'bower.json']
        },

        compress: {
            main: {
                options: {
                    archive: 'dist/<%= pkg.name %>.v<%= pkg.version %>.zip'
                },
                files: [
                    {
                        expand: true,
                        src: ['*.textile', 'src/**', 'assets/**'],
                        dest: '<%= pkg.name %>/'
                    }
                ]
            }
        },

        tagrelease: {
            file: 'package.json',
            commit:  true,
            message: 'Marks v%version%.',
            prefix:  '',
            annotate: true
        }
    });

    /**
     * Register tasks.
     */

    grunt.registerTask('updatepkg', 'Reloads package.json to memory.', function ()
    {
        grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    });

    grunt.registerTask('release', 'Creates a new release. Usage:\ngrunt release[:patch | :minor | :major]', function (type)
    {
        if (!type)
        {
            type = 'patch';
        }

        grunt.task.run('bumpup:' + type);
        grunt.task.run('tagrelease');
        grunt.task.run('updatepkg');
        grunt.task.run('compress');
    });

    grunt.registerTask('default', ['compress']);
};
