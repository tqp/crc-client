# TQP App Using CoreUI

## Issues Encountered and Solutions

#### Two or more projects are using identical roots
Issue:  
Two or more projects are using identical roots. Unable to determine project using current working directory. Using default workspace project instead.  
Solution:    
Update angular.json as follows: 
```text
    "ng-e2e": {
      "root": "e2e",
```

#### Flex Layout Errors
Must install the version that matches the Angular version. By default, it's installing v10, but CoreUI is running Angular 9.

## Custom Additions

#### Packages Added to Template
- giojs (for interactive-globe) `npm install giojs`
- leaflet (for maps) `npm install leaflet@^1.4.0`
- leaflet @types `npm install @types/leaflet@^1.4.3 --save-dev`
- leaflet.heat `npm install leaflet.heat`
- leaflet.heat @types `npm install @types/leaflet.heat@0.2.0 --save-dev`
- ngx-leaflet `npm install @asymmetrik/ngx-leaflet@^5.0.1`
- highcharts `npm install highcharts`
- flex-layout `npm install @angular/flex-layout@^9.0.0-beta.31`
- ngx-toaster `npm install ngx-toastr`'
- moment `npm install moment`

Unsure about: mini-css-extract-plugin

#### Angular.json Updates
Add to Styles:  
"node_modules/ladda/dist/ladda-themeless.min.css"  
"node_modules/leaflet/dist/leaflet.css"

#### Add-Ons Added To app.module.ts
- AngularMaterialModule
- HttpClientModule
- ToastrModule.forRoot()

#### Custom Theme
Add to styles.css: `@import '../../src/assets/themes/material-custom-theme';`

## Notes

#### Simplify Import Paths
Update tsconfig.json
```text
"baseUrl": "./src",
"paths": {
  "@tqp": [
    "@tqp/"
  ]
}
```

#### Code Formatting
To have IntelliJ add spaces in imports:  
File -> Settings -> Editor -> Code Style -> Typescript -> ES6 import/export braces

#### Install Angular Material Components
`ng add @angular/material`
- Custom theme
- No Typography Styles (default)
- Yes to Browser Animations (default)

#### Configure Terminal Command Aliases in IntelliJ
* File -> Settings -> Tools -> Terminal -> Application Settings -> Shell Path:  
`"cmd" /k ""C:\_TQP\Development\Support\cmdAliases\aliases.cmd""`

#### Regex for GPS ETL:  
To remove everything after second comma:  
Find: `^([^,]*,[^,]*),.*$`  
Replace: `\1`

#### Heat Map Option Definitions
minOpacity - the minimum opacity the heat will start at  
maxZoom - zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default  
max - maximum point intensity, 1.0 by default  
radius - radius of each "point" of the heatmap, 25 by default  
blur - amount of blur, 15 by default  
gradient - color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'} 

## AWS Deployment Considerations

#### amplify.yml
```text
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build --prod
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*

```
