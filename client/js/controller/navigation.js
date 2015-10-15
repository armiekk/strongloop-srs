(function () {
	'use_strict';

	angular.module('app')
		.controller('navigation', navigation);

	function navigation($scope, NavSection) {

		$scope.adminNav = NavSection.find({
			filter: {
				include: 'NavList'
			}
		});

		$scope.userNav = NavSection.find({
			filter: {
				where: {
						SECTION_PK: 5
					},
				include: 'NavList'
				}
		});
	}
})();
