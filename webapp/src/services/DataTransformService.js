import moment from 'moment';

export default class DataTransformService {
  static transform(data = []) {
    const newData = [];

    data.forEach((d, i) => {
      const currentMonth = moment(d.readingDate);
      let nextMonth;
      
      if (data[i + 1]) {
        nextMonth = moment(data[i+1].readingDate);
      }

      if (i === 0 && nextMonth) {
        newData.push({
          date: currentMonth.format('YYYY-MM'),
          energyUsage: data[i+1].cumulative - d.cumulative,
          cumulative: data[i+1].cumulative
        });
      } else if (nextMonth){
        const closestDate = this.getClosestDate(currentMonth, nextMonth);
        const cumulative =  data[closestDate === nextMonth ? i+1 : i].cumulative;
        const energyUsageData =  cumulative - newData[newData.length - 1].cumulative;
        
        newData.push({
          date: currentMonth.format('YYYY-MM'),
          energyUsage: energyUsageData,
          cumulative
        });
      }
    });

    return newData;
  }

  static getEndOfMonth(mmt) {
    return new Date(mmt.year(), mmt.month(), mmt.daysInMonth())
  }
  // suppose mmt1 < mmt2
  static getClosestDate(mmt1, mmt2) {
    const endOfMonth = moment(this.getEndOfMonth(mmt1));
    const diff1 = Math.abs(this.getDiffInDays(mmt1, endOfMonth));
    const diff2 = Math.abs(this.getDiffInDays(endOfMonth, mmt2));

    return diff1 > diff2 ? mmt2 : mmt1;
  }
  
  static isEndOfMonth(mmt) {
    return moment
      .utc(mmt)
      .startOf('day')
      .isSame(
        moment
          .utc(mmt)
          .endOf('month')
          .startOf('day'),
      );
  }

  static getDiffInDays(mmt1, mm2) {
    return mmt1.diff(mm2, 'days');
  }

  static getDaysUntilMonthEnd(mmt) {
    return this.getDiffInDays(moment.utc(mmt).endOf('month'), mmt);
  }
}