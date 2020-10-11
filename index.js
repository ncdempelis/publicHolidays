const REGIONS = {
  GR: {
    currency: 'EURO',
    flags: {
      includeSundays: true, includeSaturdays: false, includeCurrency: false, includeSchool: false,
    },
    fixed: { // 0 => Ιανουάριος ...
      0: [1, 6],
      2: [25],
      4: [1],
      7: [15],
      11: [25, 26],
    },
    movable: { // relative to orthodox easter
      cleanMonday: -48,
      greatFriday: -2,
      greatSaturday: -1,
      easterMonday: 1,
      holySpirit: 50,
    },
    easter: 'ORTHODOX',

  },
  UK: {
    currency: 'GBP',
    flags: { includeSaturdays: false, includeCurrency: false, includeSchool: false },
  },
  EURO: {
    currency: 'EURO',
    flags: { includeSundays: true, includeSaturdays: true },
    fixed: {
      0: [1],
      11: [25, 26],
    },
    movable: { // relative to catholic easter
      cleanMonday: -48,
      greatFriday: -2,
      easterMonday: 1,
    },
    easter: 'CATHOLIC',
  },

};

// Keep each REGIONS entry from changing
for (const [key] of Object.entries(REGIONS)) {
  Object.freeze(key.fixed);
  Object.freeze(key.movable);
  Object.freeze(key.flags);

  Object.seal(key); // Γιατί seal και όχι freeze;
}

const isSunday = (aDate) => aDate.getDay() === 0;
const isSaturday = (aDate) => aDate.getDay() === 6;
// Javascript will create a valid date either 29/02 or 1/3.
const isLeapYear = (year) => (new Date(year, 1, 29)).getDay() === 29;
// πηγή : https://karamatskos.blogspot.com/2012/04/blog-post_07.html
// valid : 1900 - 2099
const orthodoxEasterDate = (year) => {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = ((a * 19) + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  const easterDay = d + e + 4;
  // 1η απριλίου του ζητούμενου έτους. Το πάσχα πέφτει πάντα Απρίλιο ή Μαΐο
  const easterDate = new Date(year, 3, 1);
  easterDate.setDate(easterDay);

  return easterDate;
};

// https://www.assa.org.au/edm
const catholicEasterDate = (year) => {
  const catholicEaster = new Date();
  let tA;
  let tC;

  const firstTwoDigitsOfYear = Math.trunc(year / 100);
  const remainder19 = year % 19;

  let tmp = Math.trunc(firstTwoDigitsOfYear - 15 / 2) + 202 + 11 * remainder19;

  switch (firstTwoDigitsOfYear) {
    case 21: case 24: case 25: case 27: case 28: case 29:
    case 30: case 31: case 32: case 34: case 35: case 38:
      tmp--;
      break;
    case 33: case 36: case 37: case 39: case 40:
      tmp -= 2;
      break;
    default: // do nothing
      break;
  }
  tmp %= 30;

  tA = tmp + 21;

  if (tA === 29) tA=tA-1;
  if (tA === 28 && remainder19 > 10) tA--;

  // find the next Sunday
  const tB = (tA - 19) % 7;

  tC = (40 - firstTwoDigitsOfYear) % 4;
  if (tC === 3) tC+=1;
  if (tC > 1) tC+=1;

  tmp = year % 100;
  const tD = (year + Math.trunc(year / 4)) % 7;

  const tE = ((20 - tB - tC - tD) % 7) + 1;

  tmp = tA + tE;

  catholicEaster.setFullYear(year, 2, 1); // March 1st of given year
  catholicEaster.setDate(tmp);

  return catholicEaster;
};

// check if a date is a public holiday in a given region

const isPublicHoliday = (aDate, region, flags) => {
  console.log(aDate.toLocaleString());
  console.log(region);
  console.log(Object.prototype.hasOwnProperty.call(REGIONS, region));
  console.log(flags);

  if (!Object.prototype.hasOwnProperty.call(REGIONS, region)) throw 'Invalid Region';

  console.log('mpel');
  return false;
};

//
//

// playground
REGIONS.Italy = { a: 1, b: 2, c: 3 };
REGIONS.GR.currency = 'USD';
// console.dir(REGIONS);

console.table(REGIONS.GR);
console.table(Object.entries(REGIONS));
isPublicHoliday(new Date(2020, 8, 30), 'GR');
isPublicHoliday(new Date(2020, 8, 30), 'GR', { includeSaturdays: true });
isPublicHoliday(new Date(2020, 8, 30), 'Lola');
