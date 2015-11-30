'use strict';

module.exports = function(ngModule) {
    require('./plant-controller')(ngModule);
    require('./plant-details-controller')(ngModule);
};
