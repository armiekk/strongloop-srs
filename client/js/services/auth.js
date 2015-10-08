(function () {
	'use_strict';

	angular.module('app')
		.factory('AuthService', ['SrsUser', '$q', '$rootScope', '$http', '$log', '$localStorage',
			function (User, $q, $rootScope, $http, $log, $localStorage) {

				function login(email, password, callbackSuccess, callbackError) {
					return User
						.login({
							email: email,
							password: password
						},
					function(value, resHeader){
						callbackSuccess(value);
					}, function(resHeader){
						callbackError('authentication fail');
					});
				}

				function logout() {
					return User
						.logout()
						.$promise
						.then(function (err) {
							delete $localStorage.token;
						});
				}

				function register(email, password) {
					return User
						.create({
							email: email,
							password: password
						})
						.$promise;
				}
				
				function getCurrentUser(){
					var deferred = $q.defer();
					User.getCurrent(function(value, resHeader){
						deferred.resolve(value);
					}, function(httpHeader){
						deferred.reject(httpHeader);
					});
					
					return deferred.promise;
				}

				return {
					login: login,
					logout: logout,
					register: register,
					Authenticated: User.isAuthenticated,
					getCurrentUser: getCurrentUser
				};

		}]);
})();
