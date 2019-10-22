import React, {Component} from 'react';
import {connect} from 'react-redux';

class Total extends Component {

    addTotal = (pizzas) => {
        let total = 0;
        for (let i = 0; i < pizzas.length; i++) {
          total+= Number(pizzas[i].price);
          console.log('this is the total: ', total);  
        }
        return total;
      }

    render() {

        return (

            <div className = "Total">
                <p>Total: {this.addTotal(this.props.reduxState.pizzaReducer)}</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapStateToProps) (Total);