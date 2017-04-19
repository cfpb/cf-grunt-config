# cf-grunt-config

⚠️ **This project has been deprecated** ⚠️

[![Build Status](https://travis-ci.org/cfpb/cf-grunt-config.svg)](https://travis-ci.org/cfpb/cf-grunt-config)

Common Grunt task configurations for
[Capital Framework](https://github.com/cfpb/capital-framework) components.
Capital Framework is a front end framework developed at the
[Consumer Financial Protection Bureau](https://cfpb.github.io/).

The current version number can be found in [package.json](package.json#L3)
and follows [Semantic Versioning 2.0](http://semver.org/).
Release notes are recorded in the [CHANGELOG](CHANGELOG.md).

If you're new to Capital Framework, we encourage you to
[start here](https://cfpb.github.io/capital-framework/).


## How to use these tasks

1. Install this package and save it as a component dependency, either by running
   `npm install --save-dev git://github.com/cfpb/cf-grunt-config.git`,
   or by manually adding it to `package.json` and then running `npm install`.

   ```json
   "devDependencies": {
     ...
     "cf-grunt-config": "git://github.com/cfpb/cf-grunt-config.git",
     ...
   }
   ```
2. Reorganize your component's Gruntfile.
   Use the [cf-buttons Gruntfile](https://github.com/cfpb/cf-buttons/blob/gh-pages/Gruntfile.js) for guidance.
3. Access the tasks as you normally would, either individually or by creating
   compound tasks in the component's Gruntfile.


## Getting involved

We welcome your feedback and contributions. Run `npm test` prior to submitting a
pull request to check for regressions.

- [Find out about contributing](CONTRIBUTING.md)
- File a bug using this [handy template](https://github.com/cfpb/cf-grunt-config/issues/new?body=%23%23%20URL%0D%0D%0D%23%23%20Actual%20Behavior%0D%0D%0D%23%23%20Expected%20Behavior%0D%0D%0D%23%23%20Steps%20to%20Reproduce%0D%0D%0D%23%23%20Screenshot&labels=bug)


---

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)


---

## Credits and references

Thanks to [Thomas Boyt](https://github.com/thomasboyt) for the
[inspiration](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html)!
