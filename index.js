//(function () {
	'use strict';

	const REGIONS =  {'GR' : {currency: 'EURO', flags: {includeSaturdays: false, includeCurrency: false, includeSchool: false}},
			  'UK' : {currency: 'GBP' , flags: {includeSaturdays: false, includeCurrency: false, includeSchool: false}}
	};
	
	const isSunday = aDate => aDate.getDay() === 0 ;
	const isSaturday = aDate => aDate.getDay() === 6;
	const isLeapYear = year => (new Date(year, 1, 29)).getDay()===29 ; //Javascript will create a valid date either 29/02 or 1/3.
	

	// check if a date is a public holiday in a given region
	
	const isPublicHoliday = (aDate, region,flags) => { 
		console.log(aDate.toLocaleString());
		console.log(region);
		console.log(Object.prototype.hasOwnProperty.call(REGIONS, region));
		console.log(flags);



		return false; }
//	return {REGIONS};
//})();

	REGIONS['Italy'] = { a:1, b:2, c:3};

	console.dir(REGIONS);
	console.dir(REGIONS.GR);
	
	isPublicHoliday(new Date(2020,8,30),'GR');
	isPublicHoliday(new Date(2020,8,30),'GR',{includeSaturdays: true});
	isPublicHoliday(new Date(2020,8,30),'KR');

