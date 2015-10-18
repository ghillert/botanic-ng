'use strict';

describe('Controller: AboutController', function () {

	// load the controller's module
	beforeEach(module('botanicApp'));

	var AboutController, $httpBackend, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
		scope = $rootScope.$new();
		AboutController = $controller('AboutController', {
			$scope: scope
		});
		$httpBackend = _$httpBackend_;
	}));

	it('should have a AboutController', inject(function($rootScope, $controller) {
		expect(AboutController).toBeDefined();
	}));

	it('should have the correct message in scope', function () {
		expect(scope.message).toBe('Spring Rocks');
	});
});
