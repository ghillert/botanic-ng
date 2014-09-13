#!/bin/bash

BASE_DIR=.

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

karma start test/karma.conf.js $*
