import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'

export default class Head extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {title} = this.props;
        
        return <div className="cell heading sorted" 
        onClick={this.handleClick} >
            {this.sortIcon()}
            {title}
            </div>
    }

    sortIcon(){
        const {orderBy, ascending, field} = this.props;
        const icon = ascending ? faLongArrowAltUp : faLongArrowAltDown;
        if(orderBy && orderBy === field){
            return <span className='sort-icon'><FontAwesomeIcon icon={icon} /></span>;
        }
        return null;
    }


    handleClick(){
        const {field, onSort} = this.props;
        if(onSort){
             onSort(field)
        }
    }
}