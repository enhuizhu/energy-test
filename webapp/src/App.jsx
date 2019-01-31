import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ApiService from './services/ApiService';
import DataTransformService from './services/DataTransformService';
import Table from './components/Table';
import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      meterReadings: [],
      energyUsageData: [],
    };
  }

  componentDidMount() {
    ApiService.getEnergyData().then(result => {
      // const energyUsageData = this.getBarChartData(result.electricity);
      const energyUsageData = DataTransformService.transform(result.electricity);
      
      this.setState({
        meterReadings: result.electricity,
        energyUsageData
      });
    });
  }

  getBarChartData(meterReadings) {
    const energyUsageData = [];
    
    for(let i = 0; i < meterReadings.length - 1; i++) {
      const energyUsage =
        meterReadings[i+1].cumulative - meterReadings[i].cumulative;
        
        energyUsageData.push({
          date: meterReadings[i+1].readingDate,
          energyUsage,
        });
    }

    return energyUsageData;
  }

  render() {     
    return (
      <div>
        <h2>Energy Usage</h2>
        <BarChart 
          width={window.innerWidth - 25} 
          height={400} 
          data={this.state.energyUsageData}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="energyUsage" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
        </BarChart>
        <h2>Meter Readings</h2>
        <Table 
          headers={[{label: 'Date', key: 'readingDate'}, {label: 'Reading', key: 'cumulative'}, {label: 'Unit', key: 'unit' }]}
          rowData={this.state.meterReadings}
        >
        </Table>
      </div>
    );
  }
}
