# Change Log

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.


## 1.0.3 - 2015-10-13

### Added
- Added `@cf-icon-path` to Less's `modifyVars` option to restore correct path
  for cf-icons font files when compiling a component's docs.


## 1.0.2 - 2015-10-13

### Added
- Added `modifyVars` option to Less config so that component contributors paths
  for importing other Less files will be correct (after each component is
  updated to use the `@baseurl` variable in its imports).


## 1.0.1 - 2015-06-01

### Fixed
- Failing tests at 1.0.0.


## 1.0.0 - 2015-06-01

### Changed
- Removed `concat` and `bower` tasks.


## 0.3.1 - 2015-01-06

### Added
- `modernizr` option added to `templateData` in topdoc task options


## 0.3.0 - 2014-09-05

### Added
- Added support for cf-core.
- Updated open source docs.

### Fixed
- Sourcemaps, but they still only work for local testing since we aren't
  committing vendor files.
