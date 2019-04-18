import * as React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './App.css';
import TestersTable from './components/testersTable';

const URL = 'https://test-api.techsee.me/api/ex/';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      testerName: '',
      data: [],
      error: false,
      validationError: true,
      
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
          <button className="search-button" onClick={this.handleSearch} disabled={validationError} >Fetch</button>
        </form>
        {data.length > 0 && <TestersTable data={data} error={error} />}
      </div>
    );
  }


  handleChange(e){
    const testerName = e.target.value;
    const validationError = testerName.length < 2 || testerName.length > 12;
    this.setState({testerName, validationError})
  }

  handleSearch(e){
    e.preventDefault();
    const term = this.state.testerName;
    axios.get(`${URL}${term}`)
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
