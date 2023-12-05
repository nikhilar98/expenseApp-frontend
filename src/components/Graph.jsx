import React from 'react';
import { PieChart,ColumnChart } from 'react-chartkick'
import 'chartkick/chart.js'

import { expenseContext } from '../App';

const {useContext} = React

const Graph=(props)=>{
                
    const {amountByCategory,getMonthlyExpenses} = useContext(expenseContext)

    return (
        <fieldset className="graph-container">
                <legend>Expense Distribution</legend>
                <PieChart data={amountByCategory} width="300px" label="Expense" prefix="&#8377;" donut={true}/>
                <br /><br /><br /><br /><br /><br />
                <ColumnChart data={getMonthlyExpenses()} width="300px" label="Expense" xtitle="month" ytitle="expenses" prefix="&#8377;" />
        </fieldset>
    )
} 

export default Graph