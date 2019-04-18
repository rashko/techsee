import * as React from 'react';
import TestService from './service/testersService';
import './App.scss';
import TestersTable from './components/testersTable';
import SearchFrom from './components/searchForm';

export default class App extends React.Component {
  constructor(props) {
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
    const { testerName, data, error, validationError } = this.state;

    return (
      <div className="page">
        <h1>Search Bugs</h1>
        <SearchFrom handleSearch={this.handleSearch}
          handleChange={this.handleChange}
          testerName={testerName}
          validationError={validationError}
        />
        {data.length > 0 && <TestersTable data={data} error={error} />}
      </div>
    );
  }


  handleChange(e) {
    const testerName = e.target.value;
    const validationError = testerName.length < 2 || testerName.length > 12;
    this.setState({ testerName, validationError })
  }

  handleSearch(e) {
    e.preventDefault();
    const term = this.state.testerName;
    TestService.get({term})
    .then(data => {
      this.setState({ data, error: false })
    })
    .catch(err => {
      this.setState({ error: true })
    })
  }
}
