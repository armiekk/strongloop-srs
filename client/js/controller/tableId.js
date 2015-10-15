(function () {
	'use_strict';

	angular.module('app')
		.controller('titleController', ['$scope', 'Title', 'NgTableParams', '$log', '$window',
						 titleController])
		.controller('universityController', ['$scope', 'University', 'NgTableParams', '$log', '$window',
						 universityController])
		.controller('facultyController', ['$scope', 'Faculty', 'University', 'NgTableParams', '$log', '$window',
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
		$scope.data = {
			state: 'SEARCH',
			title: {},
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [10, 20, 30],
			paginationPageSize: 10,
			columnDefs: [
				{
					field: 'TITLE_CODE',
					displayName: 'รหัสคำนำหน้า'
				},
				{
					field: 'TITLE_NAME',
					displayName: 'ชื่อคำนำหน้า'
				},
				{
					field: 'TITLE_NAME_ENG',
					displayName: 'ชื่อคำนำหน้า (En)'
				}
			]
		};
		$scope.gridOptions.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.TITLE_CODE !== row.entity.TITLE_CODE;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/


		$scope.resetData = resetData;
		$scope.getTitle = getData;
		$scope.addTitle = addData;
		$scope.deleteTitle = deleteData;
		$scope.updateTitle = updateData;
		$scope.saveEditTitle = saveEditData;
		$scope.changeState = changeState;
		

		function resetData() {
			$scope.data.title = {};
		}

		function getData(data) {
			Title.find({
				filter: {
					where: {
						or: [
							{
								TITLE_NAME: {
									like: data.TITLE_NAME
								}
							},
							data
							 ]
					}
				}
			}).$promise.then(function (result) {
				//				$scope.myValues = result;
				//				$scope.tableParams = new NgTableParams({
				//					sorting: {
				//						TITLE_PK: 'asc'
				//					},
				//					count: 5
				//				}, {
				//					data: $scope.myValues,
				//					counts: [],
				//					paginationMaxBlocks: 5,
				//					paginationMinBlocks: 3,
				//				});
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			Title.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}

		function deleteData(data) {
			for (var i in data) {
				Title.deleteById({
						id: data[i].TITLE_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}

		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.title = data[0];
		}
		
		function saveEditData(data){
			Title.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.title = {};
		}
	}

	function universityController($scope, University, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			university: {},
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [10, 20, 30],
			paginationPageSize: 10,
			columnDefs: [
				{
					field: 'UNIVERSITY_NAME',
					displayName: 'ชื่อมหาวิทยาลัย',
					width: '28%'
				},
				{
					field: 'UNIVERSITY_NAME_ENG',
					displayName: 'ชื่อมหาวิทยาลัย(En)',
					width: '20%'
				},
				{
					field: 'UNIVERSITY_ADDRESS',
					displayName: 'ที่อยู่',
					width: '20%'
				},
				{
					field: 'UNIVERSITY_EMAIL',
					displayName: 'E-mail',
					width: '15%'
				},
				{
					field: 'ACTIVE',
					displayName: 'สถานะ',
					width: '10%',
					editableCellTemplate: 'ui-grid/dropdownEditor',
					editDropdownOptionsArray: [{
						id: 1,
						ACTIVE: 'ใช้งาน'
					}, {
						id: 0,
						ACTIVE: 'ไม่ใช้งาน'
					}],
					editDropdownValueLabel: 'ACTIVE'
				}
			]
		};
		$scope.gridOptions.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.UNIVERSITY_NAME !== row.entity.UNIVERSITY_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/

		$scope.resetData = resetData;
		$scope.getUniversity = getData;
		$scope.addUniversity = addData;
		$scope.deleteUniversity = addData;
		$scope.updateUniversity = updateData;
		$scope.saveEditUniversity = saveEditData;
		$scope.changeState = changeState;

		function resetData() {
			$scope.data.university = {};
		}

		function getData(data) {
			University.find({
				filter: {
					where: {
						or: [
							{
								UNIVERSITY_NAME: {
									like: data.UNIVERSITY_NAME
								}
							},
							data
							 ]
					}
				}
			}).$promise.then(function (result) {
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			University.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
		
		function deleteData(data) {
			for (var i in data) {
				University.deleteById({
						id: data[i].UNIVERSITY_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}
		
		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.university = data[0];
		}
		
		function saveEditData(data){
			University.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.university = {};
		}
	}

	function facultyController($scope, Faculty, University, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			faculty: {},
			universityList: undefined
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'FACULTY_NAME',
					displayName: 'ชื่อคณะ/ภาควิชา'
				},
				{
					field: 'FACULTY_NAME_ENG',
					displayName: 'ชื่อคณะ/ภาควิชา (En)'
				},
				{
					field: 'university.UNIVERSITY_NAME',
					displayName: 'ชื่อมหาวิทยาลัย',
				},
				{
					field: 'ACTIVE',
					displayName: 'สถานะ',
					width: '10%'
				}
			],
			enableRowSelection: true
		};
		$scope.gridOptions.onRegisterApi = function (gridApi) {
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.FACULTY_NAME !== row.entity.FACULTY_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/

		$scope.resetData = resetData;
		$scope.getFaculty = getData;
		$scope.addFaculty = addData;
		$scope.deleteFaculty = deleteData;
		$scope.updateFaculty = updateData;
		$scope.saveEditFaculty = saveEditData;
		$scope.changeState = changeState;

		function resetData() {
			$scope.datafaculty = {};
		}

		function getData(data) {
			Faculty.find({
				filter: {
					where: {
						or: [
							{
								FACULTY_NAME: {
									like: data.FACULTY_NAME
								}
							},
							{
								UNIVERSITY_NAME: {
									like: data.UNIVERSITY_NAME
								}
							},
							data
							 ]
					},
					include: 'university'
				}
			}).$promise.then(function (result) {
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			Faculty.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
		
		function deleteData(data) {
			for (var i in data) {
				Faculty.deleteById({
						id: data[i].FACULTY_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}
		
		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.faculty = data[0];
		}
		
		function saveEditData(data){
			Faculty.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.faculty = {};
		}
		/*-------------------------------------*/



	}

	function majorController($scope, Major, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			major: {},
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'university.UNIVERSITY_NAME',
					displayName: 'ชื่อมหาวิทยาลัย'
				},
				{
					field: 'faculty.FACULTY_NAME',
					displayName: 'ชื่อคณะ/ภาควิชา'
				},
				{
					field: 'MAJOR_NAME',
					displayName: 'ชื่อวิชาเอก'
				},
				{
					field: 'MAJOR_NAME_ENG',
					displayName: 'ชื่อวิชาเอก(En)'
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
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.MAJOR_NAME !== row.entity.MAJOR_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/

		$scope.resetData = resetData;
		$scope.getMajor = getData;
		$scope.addMajor = addData;
		$scope.deleteMajor = deleteData;
		$scope.updateMajor = updateData;
		$scope.saveEditMajor = saveEditData;
		$scope.changeState = changeState;

		function resetData() {
			$scope.data.major = {};
		}

		function getData(data) {
			Major.find({
				filter: {
					where: data,
					include: ['university', 'faculty']
				}
			}).$promise.then(function (result) {
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			Major.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
		
		function deleteData(data) {
			for (var i in data) {
				Major.deleteById({
						id: data[i].MAJOR_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}

		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.major = data[0];
		}
		
		function saveEditData(data){
			Major.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.major = {};
		}
	}

	function scoreTypeController($scope, ScoreType, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			scoreType: {},
		};
		$scope.selectedList = [];


		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'SCORE_TYPE_NAME',
					displayName: 'ชื่อประเภทคะแนน'
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
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.SCORE_TYPE_NAME !== row.entity.SCORE_TYPE_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/

		/*--------------ส่วนจัดการข้อมูล------------*/
		$scope.resetData = resetData;
		$scope.getScoreType = getData;
		$scope.addScoreType = addData;
		$scope.deleteScoreType = deleteData;
		$scope.updateScoreType = updateData;
		$scope.saveEditScoreType = saveEditData;
		$scope.changeState = changeState;
		/*-------------------------------------*/

		/*--------- function definition -------*/
		function resetData() {
			$scope.data.scoreType = {};
		}

		function getData(data) {
			ScoreType.find({
				filter: {
					where: data
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
			});
		}

		function addData(data) {
			ScoreType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
		
		function deleteData(data) {
			for (var i in data) {
				ScoreType.deleteById({
						id: data[i].SCORE_TYPE_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}

		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.scoreType = data[0];
		}
		
		function saveEditData(data){
			ScoreType.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.scoreType = {};
		}
		/*-------------------------------------*/

	}

	function eventTypeController($scope, EventType, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			eventType: {},
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'EVENT_TYPE_NAME',
					displayName: 'ชื่อเหตุการณ์'
				},
				{
					field: 'CONFIRM',
					displayName: 'ยืนยัน'
				},
				{
					field: 'SCORE',
					displayName: 'คะแนน'
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
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.EVENT_TYPE_NAME !== row.entity.EVENT_TYPE_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/

		$scope.resetData = resetData;
		$scope.getEventType = getData;
		$scope.addEventType = addData;
		$scope.deleteEventType = deleteData;
		$scope.updateEventType = updateData;
		$scope.saveEditEventType = saveEditData;
		$scope.changeState = changeState;

		function resetData() {
			$scope.data = {};
		}

		function getData(data) {
			EventType.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			EventType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}
		
		function deleteData(data) {
			for (var i in data) {
				EventType.deleteById({
						id: data[i].EVENT_TYPE_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}

		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.eventType = data[0];
		}
		
		function saveEditData(data){
			EventType.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.eventType = {};
		}
	}

	function questionTypeController($scope, QuestionType, NgTableParams, $log, $window) {
		$scope.data = {
			state: 'SEARCH',
			questionType: {},
		};
		$scope.selectedList = [];

		/*--------------ส่วนการจัดการตาราง---------*/
		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 25,
			columnDefs: [
				{
					field: 'QUESTION_TYPE_NAME',
					displayName: 'ชื่อประเภทคำถาม'
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
			//set gridApi on scope
			$scope.gridApi = gridApi;
			//select 1 row
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if (row.isSelected) {
					$scope.selectedList.push(row.entity);
				} else {
					$scope.selectedList = $scope.selectedList.filter(function (el) {
						return el.QUESTION_TYPE_NAME !== row.entity.QUESTION_TYPE_NAME;
					});
				}

			});
			//select all row
			gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				if (!rows[0].isSelected) {
					$scope.selectedList = [];
				} else {
					$scope.selectedList = rows;
				}
				$log.info($scope.selectedList);
			});
		};
		/*-------------------------------------*/


		$scope.resetData = resetData;
		$scope.getQuestionType = getData;
		$scope.addQuestionType = addData;
		$scope.deleteQuestionType = deleteData;
		$scope.updateQuestionType = updateData;
		$scope.saveEditQuestionType = saveEditData;
		$scope.changeState = changeState;

		function resetData() {
			$scope.data = {};
		}

		function getData(data) {
			QuestionType.find({
				filter: {
					where: data
				}
			}).$promise.then(function (result) {
				$scope.gridOptions.data = result;
			});
		}

		function addData(data) {
			QuestionType.create(data).$promise.then(function (result) {
				getData({});
			}, function (err) {
				$window.alert('ไม่สามารถเพิ่มข้อมูลได้');
			});
		}

		function deleteData(data) {
			for (var i in data) {
				QuestionType.deleteById({
						id: data[i].QUESTION_TYPE_PK
					})
					.$promise
					.then(function () {
						$log.info('delete successful');
					});
			}
			getData({});
			$scope.selectedList = [];
		}

		function updateData(data) {
			$scope.data.state = 'EDIT';
			$scope.data.questionType = data[0];
		}
		
		function saveEditData(data){
			QuestionType.prototype$updateAttributes(data)
				.$promise
				.then(function(){
				$window.alert('แก้ไขข้อมูลสำเร็จ');
			});
		}

		function changeState(state, e) {
			e.preventDefault();
			$scope.data.state = state;
			$scope.data.questionType = {};
		}
	}
})();
