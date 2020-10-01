//(function () {
	'use strict';

	const REGIONS =  {
		'GR' : {
			currency: 'EURO', 
			flags: {includeSundays: true, includeSaturdays: false, includeCurrency: false, includeSchool: false}, 
			fixed: { // 0 => Ιανουάριος ...
				0: [1,6],
				2: [25],
				4: [1],
				7: [15],
				11: [25,26] 
			}, 
			movable:{//relative to orthodox easter
				cleanMonday: -48,
				greatFriday: -2,
				greatSaturday: -1,
				easterMonday: 1,
				holySpirit:50
			},
			easter:'ORTHODOX'
				
		},
		'UK' : {
			currency: 'GBP', 
			flags: {includeSaturdays: false, includeCurrency: false, includeSchool: false}},
		'EURO': {
			currency: 'EURO',
			flags : { includeSundays:true, includeSaturdays: true},
			fixed : {
				0:[1],
				11:[25,26]
			},
			movable: { //relative to catholic easter
				cleanMonday: -48,
				greatFriday: -2,
				easterMonday: 1
			}, 
			easter:'CATHOLIC'
		}

	};

	for (const [key, value] of Object.entries(REGIONS)){
		Object.freeze(key.fixed);
		Object.freeze(key.movable);
		Object.freeze(key.flags);
	
		Object.seal(key);
	}
	// Object.freeze(REGIONS.GR.fixed);
	// Object.freeze(REGIONS.GR.movable);
	// Object.freeze(REGIONS.GR.flags);
	// Object.freeze(REGIONS.GR);

	
	
	const isSunday = aDate => aDate.getDay() === 0 ;
	const isSaturday = aDate => aDate.getDay() === 6;
	const isLeapYear = year => (new Date(year, 1, 29)).getDay()===29 ; //Javascript will create a valid date either 29/02 or 1/3.
	

	// check if a date is a public holiday in a given region
	
	const isPublicHoliday = (aDate, region,flags) => { 
		console.log(aDate.toLocaleString());
		console.log(region);
		console.log(Object.prototype.hasOwnProperty.call(REGIONS, region));
		console.log(flags);



		return false; 
	}

	REGIONS['Italy'] = { a:1, b:2, c:3};
	REGIONS.GR.currency='USD';
	// console.dir(REGIONS);
	 console.table(REGIONS.GR);
	console.table(Object.entries(REGIONS));
	isPublicHoliday(new Date(2020,8,30),'GR');
	isPublicHoliday(new Date(2020,8,30),'GR',{includeSaturdays: true});
	isPublicHoliday(new Date(2020,8,30),'KR');

