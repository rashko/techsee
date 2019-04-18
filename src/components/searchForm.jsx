import * as React from 'react';
import classnames from 'classnames';
import './searchForm.scss';

export default class SearchFrom extends React.Component {

    render() {
        const { testerName, handleChange, handleSearch, validationError } = this.props;
        const inputClass = classnames('text-input', { 'has-error': validationError });

        return <form className="form">
            <label>Tester Name</label>
            <input className={inputClass} placeholder="Enter the tester name" onChange={handleChange} value={testerName} />
            <button className="search-button" onClick={handleSearch} disabled={validationError} >Fetch</button>
        </form>
    }
}