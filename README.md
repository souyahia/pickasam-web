# Angular Template
This is the template that I use every time I need to generate a new Angular project. It uses many useful features
such as [ng-bootstrap](https://ng-bootstrap.github.io/#/home), yarn 3 etc...

This project does not include any tests because it is just a small template, but everything is ready and already
in place if you need to set up tests.

This template actually comes in 3 different versions, each in its own branch :

| Template | Branch                                                                                 | Description                                                                              |
|----------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Default  | [master](https://github.com/souyahia/angular-template)                                 | Default template, with a navbar, language switch and an example page                     |
| Blank    | [template/blank](https://github.com/souyahia/angular-template/tree/template/blank)     | Blank app with just a Hello World component, but with all the file structure implemented |
| Minimal  | [template/minimal](https://github.com/souyahia/angular-template/tree/template/minimal) | Minimal app with only the required files                                                 |


# Customization
## App name, prefixes, etc...
In order to customize the app name and the prefix of the components etc you need to do the following :

- Change the default prefixes (`my-app`) in the `.eslintrc.json` (line 30 & 38)
- Change the default project name (`my-app`) in the `angular.json` (line 6)
- Change the default prefix (`my-app`) in the `angular.json` (line 15)
- Change the default output path (`dist/my-app`) in the `angular.json` (line 20)
- Change the default project names (`my-app`) for the browser in the `angular.json` (line 78, 81 & 89)
- Change the default coverage output path (`./coverage/my-app`) in the `karma.conf.js` (line 28)
- Change the default project name in the `package.json` (line 2)
- Change the default NgxWebstorage prefix (`my-app`) in `src/app/app.module.ts` (line 20)
- Change the title of the App in `src/index.html` (line 5)
- Change the prefix of all components !
