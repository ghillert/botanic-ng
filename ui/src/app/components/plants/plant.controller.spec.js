
'use strict';

describe('Controller: Plant Controller', function () {

	// load the controller's module
	beforeEach(module('botanicApp'));

	var PlantController, $httpBackend, $scope, $rootScope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, _$rootScope_, $controller) {
		$scope = _$rootScope_.$new();
		$rootScope = _$rootScope_;
		PlantController = $controller('PlantController', {
			$scope: $scope
		});
		$httpBackend = _$httpBackend_;

		debugger;

		jasmine.getJSONFixtures().fixturesPath='/base/mocks';

		$httpBackend.whenGET('http://localhost:9876/api/plants').respond(
			getJSONFixture('plants.json')
		);
		$httpBackend.whenGET('app/components/plants/plants.html').respond('');
		$httpBackend.flush();

	}));

	it('should have a PlantController', inject(function($rootScope, $controller) {
		expect(PlantController).toBeDefined();
	}));

	it('should have 9 plants in scope', function () {
		expect($scope.plants.length).toBe(9);
	});
});
