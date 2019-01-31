import React from 'react';
import Table from './Table';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('table component', () => {
  const headers = [{label:'a', key: 'a'}, {label:'b', key: 'b'}, {label:'c', key: 'c'}];
  const rowData = [{a: 1, b: 2, c:3}];
  
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Table 
          headers={headers}
          rowData={rowData}
        >
        </Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('testing content inside', () => {
    const table = shallow(<Table 
      headers={headers}
      rowData={rowData}
    ></Table>);
    expect(table.html()).toEqual('<table><tbody><tr><th>a</th><th>b</th><th>c</th></tr><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>');
  });
});