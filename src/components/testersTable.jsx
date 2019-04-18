import * as React from 'react';
import TableRow from './tableRow';
import Head from './head';
import './testersTable.scss';

export default class TestersTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
        this.state = {
            data: props.data,
            error: props.error,
            orderBy: 'firstName',
            ascending: true
        }
    }

    componentDidMount(){
        this.handleSort(this.state.orderBy)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data }, () => this.handleSort(this.state.orderBy));
        }
    }

    render() {
        const { data, error, orderBy, ascending } = this.state;

        const rows = data.map(item => {
            return <TableRow key={item.firstName} {...item} />
        })

        return (<div className={'testersTable'}>
            {error && <div className={'error'}>Temporary error occurred, please try again later</div>}
            {!error && data.length > 0 &&
                <div className="table">
                    <Head orderBy={orderBy} ascending={ascending} field='firstName' title='First Name' onSort={this.handleSort} />
                    <Head orderBy={orderBy} ascending={ascending} field='lastName' title='Last Name' onSort={this.handleSort} />
                    <Head orderBy={orderBy} ascending={ascending} field='country' title='Country' onSort={this.handleSort} />
                    <Head title='Bugs' />
                    {rows}
                </div>
            }
        </div>)
    }

    handleSort(orderBy) {
        const data = [...this.state.data];
        const { ascending } = this.state;
        this.setState({
            orderBy,
            ascending: !ascending,
            data: data.sort(this.sortingHelper(orderBy, ascending))
        })
    }

    sortingHelper(key, ascending) {
        return function (a, b) {
            if (a[key] < b[key]) { return ascending ? -1 : 1; }
            if (a[key] > b[key]) { return ascending ? 1 : -1; }
            return 0
        }
    }
}
