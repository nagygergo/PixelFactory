# PixelFactory
## Prequisites
To be able to build and run the project, the following need to be installed:
* Node ^4.2.0
* Npm ^3.5.0
* Gulp ^3.9.0 `npm install -g gulp`

Also you need to run the following commands in the root directory for the dependecies to pull:
```sh
npm install && bower install
```
---
## Buid system

The build system has the following top-level scripts. Lower level scripts are also reachable, but it is unadvised to use them since they can't do many things on their own.

#### Build

```sh
gulp build
```
Builds the app to the `build` directory. Also runs eslint to check code style.

#### Serve

```sh
gulp serve
```
Builds the app to the `build` directory, then serves it on `localhost:8080`. It reloads if any file is modified. Also runs eslint to check code style.

#### Test
**NOT WORKING YET**

```sh
gulp test
```
Runs linting and unit tests once. Should be used mostly by Travis.
*This starts multiple browsers.*

#### TDD
**NOT WORKING YET**


Not really TDD, but no better idea for name

```sh
gulp tdd
```
Runs linting and unit tests every time code is modified.*This starts multiple browsers.*

#### Github pages
```sh
gulp deploy
```
Builds and depolys the currently checked out branch to github pages.

---
## Git flow

For every task a new branch should be created from the `dev` branch. If task is completed you should make a pull request to the `dev` branch. resolved,

* Feature tasks should be made on branches with `feature/` prefix.
* Bugfix branches should be made on branches with `fix/` prefix.

There is no strict naming policy for the pull request names.
In the description of the pull request you should include at least following: `resolve #1` where the number is a reference to the number of the task.

Pushing to `gh-pages` is not permitted, that is basicly the production branch of the app. Only stable and well tested versions can be pushed there. (In the future it might be done by travis)

The `master` branch should be kept for only versioning of the app. Pushing is permitted for keeping versions, and it should always be pulled form the `dev` branch.

## Coding style

Coding style should comply to the [John Papas Angular styleguilde](https://github.com/johnpapa/angular-styleguide). The ESLint plugin should enforce these rules. You can check it by running `gulp eslint`, or any of the build commands. Also most IDE-s have an ESLint parsing plugin. If you need template snippets in the styleguide you can find for most IDE-s.
