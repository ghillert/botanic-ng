Botanic NG
==========

**Angular 5 Sample Application**

[![Build Status](https://travis-ci.org/ghillert/botanic-ng.svg)](https://travis-ci.org/ghillert/botanic-ng)

## Requirements

* You will need **Java 8** and **`Maven**.

## How to Run

	$ mvn clean spring-boot:run -Pui

The easiest way to run solely the UI is to use Spring Boot.

    $ spring run app.groovy

and visit [http://localhost:9900](http://localhost:9900). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)

## How to Build

You can also serve the UI using Angular CLI. As a prerequisite you need to have NPM installed. Go into the `ui` directory:

	$ cd ui/

Next, install all dependencies needed:

	$ npm install

Now you can start the UI using:

	$ npm start

No you can visit [http://localhost:4200](http://localhost:4200). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)

## Resources

* [Blog post](http://hillert.blogspot.com/2014/09/secure-your-angularjs-apps-with-spring-session.html) on how I use Spring Session in botanic-ng 
* [Session slides](http://www.slideshare.net/hillert/angularjs-with-spring-s2gx2014) of the Spring One S2GX 2014 talk
