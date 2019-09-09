import React, { Component } from 'react';
import './App.css';
import {orderBy} from 'lodash';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            rates: [],
            orderedBy:'currency'
        }
    }

    componentDidMount() {
        fetch('../api/rates.json')
            .then(response => response.json())
            .then(data => {
                return this.setState({
                    rates: Object.entries(data.rates).map(rate => {
                        return {currency: rate[0], rate: rate[1]}
                    })
                });
            });
    }

    handleSort = sortKey => {

        if(this.state.orderedBy === sortKey){
            this.setState({rates:orderBy(this.state.rates, sortKey).reverse(), orderedBy: sortKey});
        }else{
            this.setState({rates:orderBy(this.state.rates, sortKey), orderedBy: sortKey});
        }
    }

    render() {

        return this.state.rates.length === 0 ? <div>Loading...</div> : (

            <table>
            <thead>
                <tr>
                    <th onClick={()=>{ this.handleSort('currency') }}>Currency</th>
                    <th onClick={()=>{this.handleSort('rate')}}>Rate</th>
                </tr></thead>
                <tbody>
                {this.state.rates.map(({currency, rate},i) => {

                    return (<tr key={currency}>
                        <td key={`${currency}0`}>{currency}</td>
                        <td key={`${currency}1`} >{rate}</td>
                    </tr>)})
                }
                </tbody>
        </table>)
    }

}

export default App;
