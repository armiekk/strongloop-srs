(function () {
	'use_strict';

	angular.module('app')
		.controller('titleController', ['$scope', 'Title', 'NgTableParams', '$log', titleController]);

	function titleController($scope, Title, NgTableParams, $log) {
		Title.find().$promise.then(function (title) {
			$scope.myValues = title;
			$scope.tableParams = new NgTableParams({
				sorting: {
					TITLE_NAME_ENG: 'asc'
				}
			}, {
				data: $scope.myValues
			});
		});

	};
})();
