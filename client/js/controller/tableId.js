(function () {
	'use_strict';

	angular.module('app')
		.controller('titleController', ['$scope', 'Title', 'NgTableParams', '$log', '$window',
						 titleController])
		.controller('universityController', ['$scope', 'University', 'NgTableParams', '$log', '$window',
						 universityController])
		.controller('facultyController', ['$scope', 'Faculty', 'NgTableParams', '$log', '$window',
						 facultyController])
		.controller('majorController', ['$scope', 'Major', 'NgTableParams', '$log', '$window',
						 majorController])
		.controller('scoreTypeController', ['$scope', 'ScoreType', 'NgTableParams', '$log', '$window',
						 scoreTypeController])
		.controller('eventTypeController', ['$scope', 'EventType', 'NgTableParams', '$log', '$window',
						 eventTypeController])
		.controller('questionTypeController', ['$scope', 'QuestionType', 'NgTableParams', '$log', '$window',
						 questionTypeController]);

	function titleController($scope, Title, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getTitle = getData;
		$scope.addTitle = addData;


		function resetData() {
			$scope.data = {};
		}

		function getData(data) {
			Title.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						TITLE_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}

		function addData(data) {
			Title.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function universityController($scope, University, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getUniversity = getData;
		$scope.addUniversity = addData;


		function resetData() {
			$scope.data = {};
		}

		function getData(data) {
			University.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						UNIVERSITY_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}

		function addData(data) {
			University.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function facultyController($scope, Faculty, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getFaculty = getData;
		$scope.addFaculty = addData;


		function resetData() {
			$scope.data = {};
		}
		function getData(data) {
			Faculty.find({
				filter: {
					where: data,
					include: 'university'
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						FACULTY_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}
		function addData(data) {
			Faculty.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function majorController($scope, Major, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getMajor = getData;
		$scope.addMajor = addData;


		function resetData() {
			$scope.data = {};
		}
		function getData(data) {
			Major.find({
				filter: {
					where: data,
					include: ['university', 'faculty']
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						MAJOR_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}
		function addData(data) {
			Major.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function scoreTypeController($scope, ScoreType, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getScoreType = getData;
		$scope.addScoreType = addData;


		function resetData() {
			$scope.data = {};
		}
		function getData(data) {
			ScoreType.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						SCORE_TYPE_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}
		function addData(data) {
			ScoreType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function eventTypeController($scope, EventType, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getEventType = getData;
		$scope.addEventType = addData;


		function resetData() {
			$scope.data = {};
		}
		function getData(data) {
			EventType.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						EVENT_TYPE_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}
		function addData(data) {
			EventType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}

	function questionTypeController($scope, QuestionType, NgTableParams, $log, $window) {
		$scope.data = {};

		$scope.resetData = resetData;
		$scope.getQuestionType = getData;
		$scope.addQuestionType = addData;


		function resetData() {
			$scope.data = {};
		}
		function getData(data) {
			QuestionType.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.myValues = result;
				$scope.tableParams = new NgTableParams({
					sorting: {
						QUESTION_TYPE_PK: 'asc'
					},
					count: 5
				}, {
					data: $scope.myValues,
					counts: [],
					paginationMaxBlocks: 5,
					paginationMinBlocks: 3,
				});
			});
		}
		function addData(data) {
			QuestionType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
	}
})();
