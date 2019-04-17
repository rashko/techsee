import * as React from "react";

export default class TableRow extends React.Component {

    render(){
        const {firstName, lastName, country, bugs} = this.props;
        return <div>
            <div className="td">{firstName}</div>
            <div className="td">{lastName}</div>
            <div className="td">{country}</div>
            <div className="td">{this.renderBugs(bugs)}</div>
        </div>
    }

    renderBugs(bugs){
        return bugs.join(', ');
    }
}