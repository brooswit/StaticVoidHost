module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files: ['**/*', '!**/node_modules/**', '!**/.git/**'],
            tasks: ['shell']
        },
        shell: {
            command: 'npm run update',
            options: {
                stdout: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['watch']);
};
