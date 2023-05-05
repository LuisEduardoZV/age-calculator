function checkErrorStyle(element) {
	if (element.classList.contains('input-style-error')) {
		element.classList.remove('input-style-error');
	}
	const labels = document.querySelectorAll('form div div label');
	labels.forEach((label) => {
		if (label.getAttribute('for') === element.getAttribute('name')) {
			label.classList.remove('label-error');
		}
	});
	const labelsError = document.querySelectorAll('#text-error');
	labelsError.forEach((labelError) => {
		if (labelError.getAttribute('for') === element.getAttribute('name')) {
			labelError.innerHTML = '';
			labelError.style.display = 'none';
		}
	});
}

function checkInput(id, text) {
	const input = document.querySelector(id);
	input.classList.add('input-style-error');
	const labels = document.querySelectorAll('form div div label');
	labels.forEach((label) => {
		if (label.getAttribute('for') === input.getAttribute('name') && label.getAttribute('id') !== 'text-error') label.classList.add('label-error');
	});
	const labelsError = document.querySelectorAll('#text-error');
	labelsError.forEach((labelError) => {
		if (labelError.getAttribute('for') === input.getAttribute('name')) {
			labelError.innerHTML = text;
			labelError.style.display = 'block';
		}
	});
}

function validDate(dayUser, monthUser, yearUser) {
	var date = styleDateUser(dayUser, monthUser, yearUser);
	var dateDays = dayjs(date);
	let day = dateDays.date(),
		month = dateDays.month() + 1,
		year = dateDays.year();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	if (dayUser != day || monthUser != month || yearUser != year) {
		const inputs = document.querySelectorAll('.input-style');
		inputs.forEach((input) => {
			input.classList.add('input-style-error');
		});
		const labels = document.querySelectorAll('form div div label');
		labels.forEach((label) => {
			label.classList.add('label-error');
		});
		const labelError = document.querySelector('#text-error');
		labelError.innerHTML = 'Must be a valid date';
		labelError.style.display = 'block';
		return false;
	}
	return true;
}

function getDate() {
	var dayUser = document.getElementById('day').value;
	var monthUser = document.getElementById('month').value;
	var yearUser = document.getElementById('year').value;
	if (dayUser.trim() == '' || monthUser.trim() == '' || yearUser.trim() == '') {
		const inputs = document.querySelectorAll('.input-style');
		inputs.forEach((input) => {
			input.classList.add('input-style-error');
		});
		const labels = document.querySelectorAll('form div div label');
		labels.forEach((label) => {
			label.classList.add('label-error');
		});
		const labelsError = document.querySelectorAll('#text-error');
		labelsError.forEach((labelError) => {
			labelError.innerHTML = 'This field is required';
			labelError.style.display = 'block';
		});
	} else {
		const year = new Date().getFullYear();
		if (dayUser <= 0 || dayUser > 31) {
			checkInput('#day', 'Must be a valid day');
		} else if (monthUser <= 0 || monthUser > 12) {
			checkInput('#month', 'Must be a valid month');
		} else if (yearUser > year) {
			checkInput('#year', 'Must be in the past');
		} else {
			if (validDate(dayUser, monthUser, yearUser)) calculations(styleDateUser(dayUser, monthUser, yearUser));
		}
	}
}

function styleDateUser(dayUser, monthUser, yearUser) {
	if (monthUser.length < 2) monthUser = '0' + monthUser;
	if (dayUser.length < 2) dayUser = '0' + dayUser;
	return [yearUser, monthUser, dayUser].join('-');
}

function calculations(userInput) {
	let d = new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	d = [year, month, day].join('-');

	var today = new Date(d);
	var userDate = new Date(userInput);
	let age = today.getFullYear() - userDate.getFullYear();
	let m = today.getMonth() - userDate.getMonth();
	if (m < 0 || (m === 0) & (today.getDay() < userDate.getDate())) age--;

	var months = 0;
	if (today.getMonth() > userDate.getMonth()) {
		months = today.getMonth() - userDate.getMonth();
	} else if (today.getMonth() < userDate.getMonth()) {
		months = 12 - (userDate.getMonth() - today.getMonth());
	} else if (today.getMonth() == userDate.getMonth() && today.getDate() > userDate.getDate()) {
		if (today.getMonth() - userDate.getMonth() == 0) {
			months = 0;
		} else {
			months = 11;
		}
	}
	let days = today.getDate() - userDate.getDate();
	if (days < 0) {
		months = months - 1 < 0 ? 11 : months - 1;
		days = 30 + days;
	}
	if (age >= 18) {
		document.getElementById('yearResult').innerHTML = age;
		document.getElementById('monthResult').innerHTML = months;
		document.getElementById('dayResult').innerHTML = days;
	} else {
		let ageF = 18 - age;
		let monthsF = 12 - (months + 1);
		if (monthsF > 0) ageF--;
		let daysF = 30 - days;
		document.getElementById('yearResult').innerHTML = ageF;
		document.getElementById('monthResult').innerHTML = monthsF;
		document.getElementById('dayResult').innerHTML = daysF;
	}
}
