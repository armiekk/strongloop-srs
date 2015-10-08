(function () {
	'use_strict';

	angular.module('app')
		.controller('navigation', navigation);

	function navigation($scope,  NavSection) {
		
		$scope.nav = NavSection.find({
			filter: {include: 'NavList'}
		});
	}
})();
