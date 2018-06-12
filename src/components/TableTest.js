import React, { Component } from 'react';

var _ = require('lodash');

/*
 * Test of loading a table from a souple of endpoints
 */
class TableTest extends Component {
  constructor() {
    super();
    this.state = {
      rows: <tr></tr>
    };
  }

  render() {
    return (
      <div className="ProgressBar">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }

  /*
   * Fetch from APIs on mount
   */
  componentDidMount(prevProps, prevState) {
    var idAge;

    fetch('https://api.myjson.com/bins/xqrsi')
    .then(results => {
      return results.json();
    }).then(data => {
      idAge = data;

      return(fetch('https://api.myjson.com/bins/szaya'));
    }).then(results => {
      return results.json();
    }).then(data => {
      this._joinTables(idAge, data);
    }).catch(error => {
      console.log('Request failed', error);
    })
  }

  /*
   * Given the idAge and idName tables, perform an outer join on the id.
   */
  _joinTables(idAge, idName) {
    let result = idAge.map(idA => {
        return {id: idA.id, age: idA.age, firstName: '', lastName: ''};
    });

    _.forEach(idName, idN => {
      let row = _.find(result, r => r.id === idN.id);
      if(row) {
        row.firstName = idN.firstName;
        row.lastName = idN.lastName;
      } else {
        result.push({id: idN.id, age: '', firstName: idN.firstName, lastName: idN.lastName});
      }
    });

    let rows = result.map(row => {
      return (
        <tr>
          <td>{row.id}</td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.age}</td>
        </tr>
      );
    });

    this.setState({rows: rows});
  }
}

export default TableTest;
