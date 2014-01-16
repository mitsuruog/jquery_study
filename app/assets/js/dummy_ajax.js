$.mockjax({
	url: '/api/search',
	type: 'get',
	responseTime: 1000,
	response: function(settings) {

		if(settings.keyword){
			this.responseText = '';
			return;
		}

		var results = [{
			"create_at": "2009-06-27T19:53:14.339Z",
			"country": "Saint Barthélemy",
			"user_id": 0,
			"email": "Max.Bernier@mollie.me",
			"fullname": "Marty Parisian"
		}, {
			"create_at": "1984-10-01T13:18:43.346Z",
			"country": "Chile",
			"user_id": 1,
			"email": "Ivy.Collins@leonie.biz",
			"fullname": "Trystan Emard II"
		}, {
			"create_at": "2010-11-04T18:05:22.386Z",
			"country": "Japan",
			"user_id": 2,
			"email": "Sydni.Bartoletti@yadira.biz",
			"fullname": "Noelia Smitham Jr."
		}, {
			"create_at": "1988-03-25T04:17:29.718Z",
			"country": "Niger",
			"user_id": 3,
			"email": "Antonina@aurore.tv",
			"fullname": "Jamie Little II"
		}, {
			"create_at": "2013-02-05T12:35:05.998Z",
			"country": "Niue",
			"user_id": 4,
			"email": "Rodrigo@virgie.tv",
			"fullname": "Fredy Strosin DVM"
		}, {
			"create_at": "1989-12-31T13:31:27.826Z",
			"country": "Djibouti",
			"user_id": 5,
			"email": "Hassie@vickie.org",
			"fullname": "Ryleigh Lang"
		}, {
			"create_at": "1983-12-15T03:54:29.860Z",
			"country": "Switzerland",
			"user_id": 6,
			"email": "Theodora@rylan.ca",
			"fullname": "Aliyah Keebler"
		}, {
			"create_at": "1988-11-24T14:54:39.067Z",
			"country": "Bolivia",
			"user_id": 7,
			"email": "Alvena@brandon.co.uk",
			"fullname": "Tia Bergnaum"
		}, {
			"create_at": "1991-03-15T01:16:17.127Z",
			"country": "Samoa",
			"user_id": 8,
			"email": "Kameron_Bergnaum@melody.biz",
			"fullname": "Lura Gaylord"
		}, {
			"create_at": "1996-10-10T13:04:02.627Z",
			"country": "Cape Verde",
			"user_id": 9,
			"email": "Blanche@ciara.biz",
			"fullname": "Jermain Koelpin"
		}];

		this.responseText　= results;
	}
});

$.mockjax({
	url: '/api/midBunrui',
	type: 'get',
	response: function(settings) {

		var data = [{
			key: '',
			value: ''
		}, {
			key: '00' + 　settings.data.largeBunrui,
			value: '中分類' + 　settings.data.largeBunrui
		}];

		this.responseText = data;

	}
});

$.mockjax({
	url: '/api/create',
	type: 'post',
	dataType: 'json',
	response: function(settings) {

		this.responseText = settings.data;

	}
});