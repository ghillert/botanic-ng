Botanic NG
==========

**Angular JS Sample Application**

[![Build Status](https://travis-ci.org/ghillert/botanic-ng.svg)](https://travis-ci.org/ghillert/botanic-ng)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/ghillert/botanic-ng?branch=master&svg=true)](https://ci.appveyor.com/project/ghillert/botanic-ng)
[![Dependency Status](https://gemnasium.com/ghillert/botanic-ng.svg)](https://gemnasium.com/ghillert/botanic-ng)

## Requirements

* You will need **Java 8**.
* [Redis](http://redis.io/) is used to store the session information. However, [embedded-redis](https://github.com/kstyrc/embedded-redis) is used, and thus you should not need to have Redis  running locally.

## How to Run

	$ mvn clean spring-boot:run

The easiest way to run solely the UI is to use Spring Boot.

    $ spring run app.groovy

and visit [http://localhost:9900](http://localhost:9900). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)

## How to Build

You can also serve the UI using [Gulp](http://gulpjs.com/). As a prerequisite you need to have [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/) installed. Go into the `ui` directory:

	$ cd ui/

Next, install all dependencies needed (try with `sudo` and `-g` if this doesn't work):

	$ npm install
	$ bower install

Now you can start the UI using:

	$ gulp serve

No you can visit [http://localhost:9000](http://localhost:9000). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)

## Resources

* [Blog post](http://hillert.blogspot.com/2014/09/secure-your-angularjs-apps-with-spring-session.html) on how I use Spring Session in botanic-ng
* [Session slides](http://www.slideshare.net/hillert/angularjs-with-spring-s2gx2014) of the Spring One S2GX 2014 talk
