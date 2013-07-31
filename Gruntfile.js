module.exports = function (grunt)
{
    'use strict';

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-tagrelease');

    grunt.initConfig({
        bumpup: {
            files: ['package.json', 'bower.json']
        },

        tagrelease: {
            file: 'package.json',
            commit:  true,
            message: 'Marks v%version%.',
            prefix:  '',
            annotate: true
        }
    });

    grunt.registerTask('release', function (type)
    {
        if (!type)
        {
            type = 'patch';
        }

        grunt.task.run('bumpup:' + type);
        grunt.task.run('tagrelease');
    });
};