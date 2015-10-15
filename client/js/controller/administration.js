(function () {
	'use_strict';

	angular.module('app')
		.controller('projectController', ['$scope', 'ScoreType', 'QuestionType', 'EventType', 'Project', '$log', '$window',
						projectController]);

	function projectController($scope, ScoreType, QuestionType, EventType, Project, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			project: {},
		};

		/*--------ส่วนการจัดการตารางโครงการ---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					name: 'EDIT',
					displayName: ' แก้ไข',
					cellTemplate: ' <button class="btn btn-success">แก้ไข &nbsp;<i class="fa fa-pencil"></i></button>',
					width: '7%'
				},
				{
					field: 'PROJECT_NAME',
					displayName: 'โครงการ'
				},
				{
					field: 'PROJECT_NAME',
					displayName: 'ปี'
				},
				{
					field: 'PROJECT_START_DATE',
					displayName: 'วันที่เริ่มต้นโครงการ'
				},
				{
					field: 'PROJECT_END_DATE',
					displayName: 'วันที่สิ้นสุดโครงการ'
				},
				{
					field: 'ACTIVE',
					displayName: 'สถานะ'
				}
			]
		};
		$scope.gridOptions.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				var msg = 'row selected ' + row.isSelected;
				$log.log(row.entity);
			});

			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				var msg = 'rows changed ' + rows.length;
				$log.log(rows);
			});
		};
		/*-------------------------------------*/

		/*---------ส่วนการจัดการตารางกิจกรรม---------*/
		$scope.eventList = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'data.events.EVENT_TYPE_PK',
					displayName: 'กิจกรรม'
				},
				{
					field: 'data.events.data.events.EVENT_DETAIL',
					displayName: 'คำอธิบาย'
				},
				{
					field: 'data.events.EVENT_START_DATE',
					displayName: 'วันที่เริ่มต้น'
				},
				{
					field: 'data.events.EVENT_END_DATE',
					displayName: 'วันที่สิ้นสุด'
				},
				{
					field: 'data.events.MAX_SEAT',
					displayName: 'จำนวนที่นั่งสูงสุด'
				},
				{
					field: 'data.events.CURRENT_SEAT',
					displayName: 'จำนวนที่นั่งปัจจุบัน'
				}
			]
		};
		$scope.eventList.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				var msg = 'row selected ' + row.isSelected;
				$log.log(row.entity);
			});

			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				var msg = 'rows changed ' + rows.length;
				$log.log(rows);
			});
		};
		/*-------------------------------------*/

		/*-----ส่วนการจัดการตารางรูปแบบเกณฑ์การวัดผล---*/
		$scope.gradingList = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'EVENT_TYPE_PK',
					displayName: 'กิจกรรม'
				},
				{
					field: 'SCORE_TYPE_PK',
					displayName: 'รูปแบบการวัดผล'
				}
			]
		};
		$scope.gradingList.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				var msg = 'row selected ' + row.isSelected;
				$log.log(row.entity);
			});

			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				var msg = 'rows changed ' + rows.length;
				$log.log(rows);
			});
		};
		/*-------------------------------------*/

		/*----------ส่วนการจัดการตารางคำถาม---------*/
		$scope.questionList = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'PROJECT_NAME',
					displayName: 'โครงการ'
				},
				{
					field: 'PROJECT_NAME',
					displayName: 'ปี'
				},
				{
					field: 'PROJECT_START_DATE',
					displayName: 'วันที่เริ่มต้นโครงการ'
				},
				{
					field: 'PROJECT_END_DATE',
					displayName: 'วันที่สิ้นสุดโครงการ'
				},
				{
					field: 'ACTIVE',
					displayName: 'สถานะ'
				}
			]
		};
		$scope.questionList.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				var msg = 'row selected ' + row.isSelected;
				$log.log(row.entity);
			});

			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				var msg = 'rows changed ' + rows.length;
				$log.log(rows);
			});
		};
		/*-------------------------------------*/


		/*--------------ส่วนจัดการข้อมูล------------*/
		$scope.resetData = resetData;
		$scope.getProject = getData;
		$scope.addProject = addData;
		$scope.changeState = changeState;
		/*-------------------------------------*/

		/*--------- function definition -------*/
		function resetData() {
			$scope.data = {};
		}

		function getData(data) {
			Project.find({
				filter: {
					where: data,
				}
			}).$promise.then(function (result) {
				//				$scope.myValues = result;
				//				$scope.tableParams = new NgTableParams({
				//					sorting: {
				//						SCORE_TYPE_PK: 'asc'
				//					},
				//					count: 5
				//				}, {
				//					data: $scope.myValues,
				//					counts: [],
				//					paginationMaxBlocks: 5,
				//					paginationMinBlocks: 3,
				//				});

				$scope.gridOptions.data = result;
				$scope.eventList.data = result.events;
				$scope.gradingList.data = result.gradingCriteria;
				$scope.questionList.data = result.questions;
				$log.info(result);
			});
		}

		function addData(data) {
			Project.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data = {
			state: 'SEARCH',
			project: {},
		};
		}
		/*-------------------------------------*/

		/*--------- function แบบเรียกใช้ทันที -------*/
		(function getEventType() {
			EventType.find().$promise.then(function (result) {
				$scope.eventTypeList = result;
			});
		})();
		(function getQuestionType() {
			QuestionType.find().$promise.then(function (result) {
				$scope.questionTypeList = result;
			});
		})();
		(function getScoreType() {
			ScoreType.find().$promise.then(function (result) {
				$scope.scoreTypeList = result;
			});
		})();
		/*-------------------------------------*/
	}
})();
