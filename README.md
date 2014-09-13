Botanic NG
==========

**Angular JS Sample Application**

[![Build Status](https://travis-ci.org/ghillert/botanic-ng.svg)](https://travis-ci.org/ghillert/botanic-ng)

## Requirements

* Please make sure you have **Redis** running. Redis is used to store the session information.
* Currently, the project relies on a SNAPSHOT release of [Spring Session](https://github.com/spring-projects/spring-session).
* You will need either **Java 8** or **Java 7**.

## How to Run

	$ mvn clean spring-boot:run

The easiest way to run solely the UI is to use Spring Boot.

    $ spring run app.groovy

and visit [http://localhost:9900](http://localhost:9900). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)

## How to Build

You can also serve the UI using Grunt. As a prerequisite you need to have NPM and Bower installed. Go into the `ui` directory:

	$ cd ui/

Next, install all dependencies needed (try with `sudo` and `-g` if this doesn't work):

	$ npm install
	$ bower install

Now you can start the UI using:

	$ grunt serve

No you can visit [http://localhost:9000](http://localhost:9000). Please make sure that the backend is running (`com.hillert.botanic.MainApp`)
