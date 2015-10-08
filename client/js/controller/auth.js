(function () {

	'use_strict';

	angular.module('app')
		.controller('AuthSigninController', ['AuthService', '$scope', '$state', '$log', '$window', '$localStorage',
		function (AuthService, $scope, $state, $log, $window, $localStorage) {
				$scope.user = {};
				$scope.login = function () {
					AuthService.login($scope.user.email, $scope.user.password, function(response){
						$localStorage.token = {
								email: response.user.email,
								admin: response.user.admin,
							};
						$state.go('dashboard');
					}, function(err){
						$log.info(err);
						$state.go('signin-fail');
					});
				};
		}])
		.controller('AuthLogoutController', ['AuthService', '$scope', '$state', '$log', '$location',
		function (AuthService, $scope, $state, $log, $location) {
				$scope.logout = function () {
					AuthService.logout()
						.then(function(value, resHeader) {
							$log.info(value);
							$state.go('index');
						});
				};
		}])
		.controller('AuthSignupController', ['AuthService', '$scope', '$state',
		function (AuthService, $scope, $state) {
				$scope.user = {};
				$scope.signup = function () {
					AuthService.register($scope.user.email, $scope.user.password)
						.then(function (err) {
							if (err) $state.go('signup-fail');
							$state.transitionTo('signup-success');
						});
				}
		}]);

})();
