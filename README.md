# cf-grunt-config

Common Grunt tasks for [Capital Framework](https://github.com/cfpb/capital-framework) components.

## Using these tasks

1. Install this package and save it as a component dependency, eitehr by running
   `npm install --save-dev git://github.com/cfpb/cf-grunt-config.git`,
   or by manually adding it to `package.json` and then running `npm install`.
   ```json
   "devDependencies": {
     ...
     "cf-grunt-config": "git://github.com/cfpb/cf-grunt-config.git",
     ...
   }
   ```
2. Load the newly installed tasks into the Gruntfile:
   ```js
   grunt.loadTasks('node_modules/cf-grunt-config/tasks/');
   ```
3. Access the tasks as you normally would, either individually or by creating
   compound tasks in the component's Gruntfile.


## Contributing

We welcome your feedback and contributions.

- [Find out about contributing](https://github.com/cfpb/cf-grunt-config/blob/master/CONTRIBUTING.md)
- [File a bug](https://github.com/cfpb/cf-grunt-config/issues/new?body=%23%23%20URL%0D%0D%0D%23%23%20Actual%20Behavior%0D%0D%0D%23%23%20Expected%20Behavior%0D%0D%0D%23%23%20Steps%20to%20Reproduce%0D%0D%0D%23%23%20Screenshot&labels=bug)
