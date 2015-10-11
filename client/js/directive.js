(function () {
	'use_strict';

	angular.module('app')
		.directive('inputBox', inputBox);

	function inputBox() {
		return {
			restrict: 'E',
			template: '<div class="form-group">' +
				'<label for="title-id">{{label}} :</label>' +
				'<input type="text" class="form-control" ng-model="ngModel" required="required">' +
				'</div>',
			scope: {
				label: '@',
				ngModel: '=',
				required: '='
			}
		};
	}
})();
