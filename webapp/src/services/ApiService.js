export default class ApiService {
  static getEnergyData() {
    return fetch('https://storage.googleapis.com/bulb-interview/meterReadingsReal.json')
      .then(response => response.json());
  }
}