import React from 'react';

export default function(props) {
  return (
    <table>
      <tbody>
        <tr>
          {
            props.headers.map((v, k) => {
              return (<th key={k}>{v.label}</th>);
            })
          }
        </tr>
        {
          props.rowData.map((v, k) => {
            return (<tr key={k}>
              {
                 props.headers.map((header, i) => {
                  return <td key={i}>{v[header.key]}</td>;
                })
              }
            </tr>)
          })
        }
      </tbody>
    </table>
  );
}