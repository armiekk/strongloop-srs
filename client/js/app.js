(function () {
	'use_strict';

	angular.module('app', ['lbServices', 'ui.router', 'ngRoute', 'ngStorage'])
		.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
			$urlRouterProvider.otherwise("/index");

			$stateProvider
				.state('index', {
					url: '/index',
					templateUrl: '../views/landing-page.html'
				})
				.state('signin-fail', {
					url: '/signin-fail',
					templateUrl: '../views/signin-fail.html'
				})
				.state('signin', {
					url: '/signin',
					templateUrl: '../views/signin-user.html',
					controller: 'AuthSigninController'
				})
				.state('signup-fail', {
					url: '/signupFail',
					templateUrl: '../views/signup-fail.html'
				})
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: '../views/dashboard.html',
					authenticate: true
				})
				.state('signup-user', {
					url: '/signup',
					templateUrl: '../views/signup-user.html',
					controller: 'AuthSignupController'
				})
				.state('verified', {
					url: '/verified',
					templateUrl: '../views/verified.html'
				})
				.state('signup-success', {
					url: '/signupSuccess',
					templateUrl: '../views/signup-success.html'
				})
				.state('forbidden', {
					url: '/forbidden',
					templateUrl: '../views/forbidden.html'
				})
				.state('dashboard.title', {
					url: '/table/title',
					templateUrl: '../views/tableId/title.html'
				})
				.state('dashboard.university', {
					url: '/table/university',
					templateUrl: '../views/tableId/university.html'
				})
				.state('dashboard.faculty', {
					url: '/table/faculty',
					templateUrl: '../views/tableId/faculty.html'
				})
				.state('dashboard.major', {
					url: '/table/major',
					templateUrl: '../views/tableId/major.html'
				})
				.state('dashboard.score', {
					url: '/table/score',
					templateUrl: '../views/tableId/score.html'
				})
				.state('dashboard.event', {
					url: '/table/event',
					templateUrl: '../views/tableId/event.html'
				});
			$locationProvider.html5Mode(true);

		})
		.run(['$rootScope', '$state', '$localStorage', '$log', 'AuthService',
			function ($rootScope, $state, $localStorage, $log, AuthService) {
				$rootScope.$on('$stateChangeStart', function (event, next) {
					AuthService
						.getCurrentUser()
						.then(function (value) {
							$rootScope.credentials = {
								email: value.email,
								admin: value.admin
							};
							if(next.url === '/signin'){
								$state.go('dashboard');
							}
							$log.info($rootScope.credentials);
						}, function (error) {
							$log.info(error);
							if (next.authenticate) {
								event.preventDefault(); //prevent current page from loading
								$state.go('forbidden');
							}
						});
					// redirect to login page if not logged in


				});
  }]);
})();
