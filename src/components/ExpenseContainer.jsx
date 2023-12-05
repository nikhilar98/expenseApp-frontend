import ExpenseList from "./ExpenseList"
import ExpenseForm from "./ExpenseForm"
import React from 'react';
const {useState,createContext} = React

export const expenseFormContext = createContext()

const ExpenseContainer=(props)=>{
                
    const [editExpenseState,setEditExpenseState] = useState(false)

    const [expenseformData,setExpenseformData] = useState({})

    function liftExpenseFormData(data){
        setExpenseformData(data)
    }

    function enableExpenseEdit(){
        setEditExpenseState(true)
    }
    function disableExpenseEdit(){
        setEditExpenseState(false)
    }

                
    return (
        <expenseFormContext.Provider value={{editExpenseState,expenseformData,enableExpenseEdit,disableExpenseEdit,liftExpenseFormData}}>
            <div className="expense-container">
                <ExpenseForm/>
                <ExpenseList/>
            </div>
        </expenseFormContext.Provider>
    )

}
            
export default ExpenseContainer;
