import * as React from 'react';
import TableRow from './tableRow';
export default class TestersTable extends React.Component {
    
    render(){
        const {data, error} = this.props;
        
        const rows = data.map(item => {
            return <TableRow key={item.firstName} {...item} />
        })

        return (<div className={'testersTable'}>
        {error && <div className={'error'}>Temporary error occurred, please try again later</div>}
        {!error && data.length > 0 && 
        <div className="table">
                <div className="cell heading sorted" onClick={() => this.handleSort('firstName')} >First name</div>
                <div className="cell heading sorted" onClick={() => this.handleSort('lastName')}>Last name</div>
                <div className="cell heading sorted" onClick={() => this.handleSort('country')}>Country</div>
                <div className="cell heading">Bugs</div>
                {rows}
                </div>
        }
      </div>)
    }

    handleSort(key){
        this.props.handleSort(key);
    }
}
