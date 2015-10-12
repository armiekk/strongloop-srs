module.exports = function (app) {

	// gen title >> เพิ่มคำนำหน้าชื่อ
	/*app.dataSources.mongoDB.automigrate('Title', function (err) {
		if (err) throw err;

		app.models.Title.create(
				[
				{
					TITLE_CODE: '01',
					TITLE_NAME: 'นาย',
					TITLE_NAME_ENG: 'MR.',
					TITLE_SEX: 'ชาย'
				},
				{
					TITLE_CODE: '02',
					TITLE_NAME: 'นางสาว',
					TITLE_NAME_ENG: 'MRS.',
					TITLE_SEX: 'หญิง'
				}
				],
			function (err, title) {
				if (err) console.log(err);

				console.log('create title', title);
			});
	});
	*/

	// gen university faculty and major >>> เพิ่มมหาลัย คณะ และ ภาควิชา
	/*app.dataSources.mongoDB.automigrate('University', function (err) {
		if (err) throw err;

		app.models.University.create(
			[
				{
					UNIVERSITY_NAME: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
					UNIVERSITY_NAME_ENG: 'King Mongkut\'s institue of Technology Ladkrabang',
					UNIVERSITY_ADDRESS: 'เขตลาดกระบัง จังหวัดกรุงเทพฯ',
					UNIVERSITY_EMAIL: 'info@kmitl.ac.th',
					ACTIVE: 1
				},
				{
					UNIVERSITY_NAME: 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา',
					UNIVERSITY_NAME_ENG: 'Kasetsart University',
					UNIVERSITY_ADDRESS: 'อำเภอศรีราชา จังหวัดชลบุรี',
					UNIVERSITY_EMAIL: 'info@ku.ac.th',
					ACTIVE: 1
				}
			],
			function (err, university) {
				if (err) console.log(err);

				console.log('create university', university);
				app.models.Faculty.create(
					[
						{
							FACULTY_NAME: 'วิทยาศาสตร์',
							FACULTY_NAME_ENG: 'Faculty of Science',
							UNIVERSITY_PK: university[0].UNIVERSITY_PK,
							ACTIVE: 1
						},
						{
							FACULTY_NAME: 'วิทยาศาสตร์',
							FACULTY_NAME_ENG: 'Faculty of Science',
							UNIVERSITY_PK: university[1].UNIVERSITY_PK,
							ACTIVE: 1
						}
					],
					function (err, faculty) {
						if (err) console.log(err);

						console.log('create faculty', faculty);
						app.models.Major.create(
							[
								{
									MAJOR_NAME: 'วิทยาการคอมพิวเตอร์',
									MAJOR_NAME_ENG: 'Computer Science',
									UNIVERSITY_PK: university[0].UNIVERSITY_PK,
									FACULTY_PK: faculty[0].FACULTY_PK,
									ACTIVE: 1
								},
								{
									MAJOR_NAME: 'วิทยาการคอมพิวเตอร์',
									MAJOR_NAME_ENG: 'Computer Science',
									UNIVERSITY_PK: university[1].UNIVERSITY_PK,
									FACULTY_PK: faculty[1].FACULTY_PK,
									ACTIVE: 1
								}
							],
							function (err, major) {
								if (err) console.log(err);

								console.log('create major', major);
							});
					});
			});
	}); */

	app.dataSources.mongoDB.automigrate('QuestionType', function (err) {
		if (err) throw err;

		app.models.QuestionType.create(
			[
				{
					QUESTION_TYPE_NAME: 'จริงหรือเท็จ',
					ACTIVE: 1
				},
				{
					QUESTION_TYPE_NAME: 'ข้อความ',
					ACTIVE: 1
				},
				{
					QUESTION_TYPE_NAME: 'วันที่',
					ACTIVE: 1
				},
				{
					QUESTION_TYPE_NAME: 'ช่วงวันที่',
					ACTIVE: 1
				}
			],
			function (err, questionType) {
				if (err) console.log(err);

				console.log('create questionType', questionType);
			});
	});
	app.dataSources.mongoDB.automigrate('ScoreType', function (err) {
		if (err) throw err;

		app.models.ScoreType.create(
			[
				{
					SCORE_TYPE_NAME: 'Score',
					ACTIVE: 1
				},
				{
					SCORE_TYPE_NAME: 'Grade',
					ACTIVE: 1
				},
				{
					SCORE_TYPE_NAME: 'Pass/NotPass',
					ACTIVE: 1
				}
			],
			function (err, scoreType) {
				if (err) console.log(err);

				console.log('create scoreType', scoreType);
			});
	});
	app.dataSources.mongoDB.automigrate('EventType', function (err) {
		if (err) throw err;

		app.models.EventType.create(
			[
				{
					EVENT_TYPE_NAME: 'Score',
					CONFIRM: 2,
					SCORE: 1,
					ACTIVE: 1
				},
				{
					EVENT_TYPE_NAME: 'Grade',
					CONFIRM: 2,
					SCORE: 1,
					ACTIVE: 1
				},
				{
					EVENT_TYPE_NAME: 'Pass/NotPass',
					CONFIRM: 2,
					SCORE: 1,
					ACTIVE: 1
				}
			],
			function (err, eventType) {
				if (err) console.log(err);

				console.log('create eventType', eventType);
			});
	});
};
