import * as React from "react";

export default class TableRow extends React.Component {

    render(){
        const {firstName, lastName, country, bugs} = this.props;
        return <>
            <div className="cell">{firstName}</div>
            <div className="cell">{lastName}</div>
            <div className="cell">{country}</div>
            <div className="cell">{this.renderBugs(bugs)}</div>
        </>
    }

    renderBugs(bugs){
        return bugs.join(', ');
    }
}