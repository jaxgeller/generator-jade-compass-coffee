# Generator-jade-compass-coffee (angular)

## Install
```
npm install generator-jade-compass-coffee -g
```

## Use
```
yo jade-compass-coffee
$ gulp
```

### Comes With
+ Jade
+ Compass -- susy, breakpoint, modular-scale
+ Coffeescript (angular)
+ Browserify
+ Livereload
+ angular optional (build with browserify and coffeescript)
+ Gulp for tasks

### Directory structure
```
build/
  index.html ---- index.jade builds outside views for use with angular router. Otherwise all other .jade files build to views
  public/
    scripts/
      main.js
    style/
      main.css
  views/
    partials.html...

Gulpfile.js

jade/
  index.jade
  partials.html...

public/
  sass/
    main.scss
    others.scss...
  scripts/
    app.coffee
    others.coffee...
```
