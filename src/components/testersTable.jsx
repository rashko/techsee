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
        <div>
            <div className="row">
                <div className="th">First name</div>
                <div className="th">Last name</div>
                <div className="th">Country</div>
                <div className="th">Bugs</div>
                </div>
                {rows}
        </div>
        
        }
      </div>)
    }
}
