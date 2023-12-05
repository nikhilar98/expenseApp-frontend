import React from 'react'
import { AreaChart} from 'react-chartkick'
import 'chartkick/chart.js'

import { expenseContext } from '../App'

const {useContext} = React

const Insights=(props)=>{

    const {expenses,amountByCategory,getMonthlyExpenses} = useContext(expenseContext)

    const total = expenses.reduce((prev,curr)=>{
        prev+=Number(curr.amount)
        return prev
    },0)

    const maxCateg = amountByCategory.sort((a,b)=>{
        return b[1]-a[1]
    })[0] ? amountByCategory.sort((a,b)=>{
        return b[1]-a[1]
    })[0][0]
    : 
    'NA'
    

    return ( 
        <fieldset className="insights-box">
            {console.log(total)}
            <legend>INSIGHTS</legend>
            <fieldset className="insight">
                <p>Total amount Spent</p>
                <hr/>
                <p className="insight-text">&#8377; {total}</p>
            </fieldset>
            <fieldset className="insight">
                <p>Most spent category</p>
                <hr/>
                <p className="insight-text">{maxCateg}</p>
            </fieldset>
            <fieldset className="insight">
                <p>Expense Trend</p>
                <hr/>
                <AreaChart data={getMonthlyExpenses()} height="200px" prefix="&#8377;"/>
            </fieldset>
        </fieldset>
    )
}

export default Insights