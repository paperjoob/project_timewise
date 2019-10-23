import React, {Component} from 'react';
import {connect} from 'react-redux';

class Total extends Component {

    addTotal = (hours) => {
        let total = 0;
        for (let i = 0; i < hours.length; i++) {
          total+= Number(hours.monday_hours);
          console.log('this is the total: ', total);  
        }
        return total;
      }

    render() {

        return (

            <div className="Total">
                <p>Total: {this.addTotal(this.props.reduxState.timesheet)}</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapStateToProps) (Total);