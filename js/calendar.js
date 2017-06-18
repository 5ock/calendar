function monthDayCount(y, m){
    return 32-new Date(y, m-1, 32).getDate();
}

function weekOfCount(y, m) {
	var firstMonth = new Date(y, m - 1, 1),
		endMonth = new Date(y, m, 0),
		calPeriod = firstMonth.getDay() + endMonth.getDate();
	return Math.ceil(calPeriod/7);
}

function preMonth(y, m){
	return {y: m == 1 ? y-1 : y, m: m == 1 ? 12 : m-1};
}

function nextMonth(y, m){
	return {y: m == 12 ? y+1 : y, m: m==12 ? 1: m+1 };
}


function createMonthArr(date) {
	var y = date.y, m = date.m;
	var firstDayWeek = new Date (y, m - 1, 1).getDay(),
		monthCount = monthDayCount(y, m), 
	 	weekCount = weekOfCount(y, m);

	var pMonth = preMonth(y, m),
		pMonthCount = monthDayCount(pMonth.y, pMonth.m);

	var nMonth = nextMonth(y, m);

	var date = Array(weekCount);
	for(var i=0; i<date.length; i++){
		date[i] = Array(7);
		for(var j=0; j<7; j++){
			var day = i * 7 + j - firstDayWeek + 1,
				month = m,
				year = y,
				isMonth = true;
			if(day <= 0) {
				day = pMonthCount + day;
				month = pMonth.m;
				year = pMonth.y;
				isMonth = false;
			}
			if(month == m && day > monthCount){
				day = day - monthCount;
				month = nMonth.m;
				year = nMonth.y;
				isMonth = false;
			}
			isToday = (nowDate.y == year && nowDate.m == month && nowDate.d == day) ? true : false;
			var data = {
				y: year,
				m: month,
				d: day,
				l: isMonth,
				t: isToday
			} 
			console.log(nowDate.d);
			date[i][j] = data;
		} 
	}

	return date;
}

function renderMonth(date){
	//week
	var y = date.y, m = date.m;
	var _weeks = ['日','一','二','三','四','五','六'];
	var main = document.getElementById('main');
	main.innerHTML = '';
	var weeksDiv = createDom('div', 'weeks', '')
	for(var i = 0; i <_weeks.length; i++){
		var weekDiv = createDom('div', '', _weeks[i]);
		weeksDiv.appendChild(weekDiv);
	}

	main.appendChild(weeksDiv);

	//days
	var domData = createMonthArr(date);
	for(var i = 0; i <domData.length; i++) {
	var daysDiv = createDom('div', 'days', '');
		for(var j = 0 ; j<domData[0].length; j++){
			not_monthClassName = domData[i][j].l == true ? "" : 'not_month';
			var dayDiv = createDom('div', not_monthClassName , '');
			setAfterAttribute(dayDiv, domData[i][j])
			if(domData[i][j].t == true) dayDiv.setAttribute('class', 'today');
			daysDiv.appendChild(dayDiv);
		}
	main.appendChild(daysDiv); //render
	}

}

function setAfterAttribute(element, data) {
	element.setAttribute('data-y', data.y);
	element.setAttribute('data-m', data.m);
	element.setAttribute('data-d', data.d);
}

function createDom(element, className, text) {
	var e = document.createElement(element),
		t = document.createTextNode(text);
	e.appendChild(t);
	e.setAttribute('class', className);

	return e;
}
var todayDate = new Date();
var nowDate = {y: todayDate.getFullYear(), m: todayDate.getMonth() + 1, d: todayDate.getDate()};
renderMonth(nowDate);

var calendarDate = {y: todayDate.getFullYear(), m: todayDate.getMonth() + 1};

var title = document.getElementById('title');
title.innerHTML = nowDate.y + '/' + nowDate.m;
var tt = document.getElementById('today');
tt.onclick = function(){
	renderMonth(nowDate);
	title.innerHTML = nowDate.y + '/' + nowDate.m;
}

var next = document.getElementById('next');
next.onclick = function(){
	calendarDate = nextMonth(calendarDate.y, calendarDate.m);
	renderMonth(calendarDate);
	title.innerHTML = calendarDate.y + '/' + calendarDate.m
}

var pre = document.getElementById('pre');
pre.onclick = function(){
	calendarDate = preMonth(calendarDate.y, calendarDate.m);
	renderMonth(calendarDate);
	title.innerHTML = calendarDate.y + '/' + calendarDate.m
}