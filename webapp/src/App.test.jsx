import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe('App component', () => {
  it('testing getBarChartData', () => {
    spyOn(App.prototype, 'componentDidMount');

    const app = shallow(<App></App>);
    // app.instance
    let result = app.instance().getBarChartData([
      {
        "cumulative": 17580,
        "readingDate": "2017-03-28T00:00:00.000Z",
        "unit": "kWh"
      },
      {
        "cumulative": 17759,
        "readingDate": "2017-04-15T00:00:00.000Z",
        "unit": "kWh"
      },
    ]);

    expect(result).toEqual([
      {
        date: "2017-04-15T00:00:00.000Z",
        energyUsage: 179
      }
    ]);    
  });
});