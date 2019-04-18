import * as React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './App.css';
import TestersTable from './components/testersTable';

const _URL = 'https://test-api.techsee.me/api/ex/';
const URL = '/data.json';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      testerName: '',
      data: [],
      error: false,
      validationError: true,
      orderBy: 'firstName',
      ascending: true
    }
  }
  render() {
    const {testerName, data, error, validationError} = this.state;
    const inputClass = classnames('text-input', {'has-error': validationError});
    return (
      <div className="page">
        <h1>Search Bugs</h1>
        <form className="form">
          <input className={inputClass} placeholder="Enter the tester name" onChange={this.handleChange} value={testerName} />
          <button className="search-button" onClick={this.handleSearch} disabled={validationError} >Search</button>
        </form>
        <TestersTable handleSort={this.handleSort} data={data} error={error} />
      </div>
    );
  }

  handleSort(orderBy){
    const data = [...this.state.data];
    const {ascending} = this.state;
    this.setState({
      ascending: !ascending,
      data: data.sort(this.sortingHelper(orderBy, ascending))
    })
  }

  sortingHelper(key, ascending){
    return function(a, b){
      if(a[key] < b[key]) { return ascending ? -1 : 1; }
      if(a[key] > b[key]) { return ascending ? 1 : -1; }
      return 0
    }
  }

  handleChange(e){
    const testerName = e.target.value;
    const validationError = testerName.length < 2 || testerName.length > 12;
    this.setState({testerName, validationError})
  }

  handleSearch(e){
    e.preventDefault();
    const term = this.state.testerName;
    axios.get(`${URL}`)
      .then(response => {
        let data;
        if(Array.isArray(response.data)){
          data = response.data;
        } else if(response.data === ''){
          data = [];
        } else {
          data = [response.data];
        }
        this.setState({data, error: false})
      })
      .catch(err => {
        this.setState({error: true})
      })
  }
}
