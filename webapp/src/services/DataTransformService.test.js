import moment from 'moment';
import DataTransformService from './DataTransformService';

describe('DataTransformService', () => {
  
  it('transform', () => {
    let testData = [
      {
        "cumulative": 18002,
        "readingDate": "2017-05-08T00:00:00.000Z",
        "unit": "kWh"
      },
      {
        "cumulative": 18270,
        "readingDate": "2017-06-18T00:00:00.000Z",
        "unit": "kWh"
      },
      {
        "cumulative": 18453,
        "readingDate": "2017-07-31T00:00:00.000Z",
        "unit": "kWh"
      },
      {
        "cumulative": 18620,
        "readingDate": "2017-08-31T00:00:00.000Z",
        "unit": "kWh"
      }
    ];

    let result = DataTransformService.transform(testData);
    
    expect(result).toEqual([ 
      { date: '2017-05', energyUsage: 268, cumulative: 18270 },
      { date: '2017-06', energyUsage: 0, cumulative: 18270 },
      { date: '2017-07', energyUsage: 183, cumulative: 18453 } 
    ]);
  });

  it('getClosestDate', () => {
    const format = 'YYYY-MM-DD';
    let mm1 = moment('2019-01-03', format);
    let mm2 = moment('2019-02-01', format);

    expect(DataTransformService.getClosestDate(mm1, mm2)).toEqual(mm2);

    mm1 = moment('2019-01-31', format);
    mm2 = moment('2019-02-01', format);

    expect(DataTransformService.getClosestDate(mm1, mm2)).toEqual(mm1);

    mm1 = moment('2017-06-18T00:00:00.000');
    mm2 = moment('2017-07-31T00:00:00.000Z');
    expect(DataTransformService.getClosestDate(mm1, mm2)).toEqual(mm1);

  });

  it('isEndOfMonth', () => {
    let testDate = new Date(2019, 0, 31);
    expect(DataTransformService.isEndOfMonth(moment(testDate))).toBeTruthy();
    
    testDate = new Date(2019, 1, 28);
    expect(DataTransformService.isEndOfMonth(moment(testDate))).toBeTruthy();
  });

  it('getDiffInDays', () => {
    let testDate = new Date(2019, 0, 1);    
    let testDate2 = new Date(2019, 0, 2);
    expect(DataTransformService.getDiffInDays(moment(testDate), moment(testDate2))).toBe(-1);
    expect(DataTransformService.getDiffInDays(moment(testDate2), moment(testDate))).toBe(1);
  });

  it('getDaysUntilMonthEnd', () => {
    let testDate = new Date(2019, 0, 1); 
    expect(DataTransformService.getDaysUntilMonthEnd(moment(testDate))).toBe(30);
  });
});