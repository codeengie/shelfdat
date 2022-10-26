# ShelfDat

## Overview
An app I created to help manage and track my massive media library. Of course, it can be used to manage other items (this will be implemented in phase 2).

## Technology
+ AWS
  + API Gateway
  + CloudFront
  + Cognito
  + DynamoDB
  + Lambda
  + Route 53
  + S3
+ CSS3
+ HTML5
+ JavaScript
+ Node.js
+ NPM
+ Vue.js 4

## Prerequisites
In order to build and run the app you'll need a minimum `node >= 14.15.0` and `vue-cli >= 5.0.8`. Also, I've been running this project with `https` enabled and configured my local environment with a tool called [mkcert](https://github.com/FiloSottile/mkcert). This tools creates locally-trusted development certificates.

The tool claims no configuration but unfortunately if you are using Firefox for development you will need an extra step [Trust The Local CA In Windows 10 Firefox](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8#windows-10-firefox). I used the simplest step to enable `security.enterprise_roots.enabled`. I'm also linking the command-line output I was seeing when I ran `mkcert -install`.

[Firefox Support Is Not Available On Your Platform](https://github.com/FiloSottile/mkcert/issues/266)

## Install
```bash
$ cd shelfdat
$ npm install
```

## Run
```bash
$ npm run servedevelop # Dev
$ npm run serveprod # Prod
$ npm run build # Build for Prod
```

## Lambda
The `convert-image` lambda function requires a Linux version of the library. If you are developing on a PC and do a typical `npm install sharp` you'll see errors in CloudWatch about not finding Sharp modules. In order to get the correct Sharp libraries that will work in a serverless environment you need to issue the following:
```bash
npm install --platform=linux --arch=x64 sharp
```

## Developer
[Cesar Villanueva Jr](https://codeengie.com)

## Credits
Designed and built by Ardent Forms.

## License
+ You do not have my written, implied or expressed permission to use.
+ Copyright 2022 @ Ardent Forms.