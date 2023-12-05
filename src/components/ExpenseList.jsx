import ExpenseItem from "./ExpenseItem"
import React from 'react';

import { expenseContext } from "../App";

const {useContext,useState} = React

const ExpenseList=(props)=>{
    const {expenses,categories} = useContext(expenseContext)

    const [categoryId,setCategoryId] = useState("")
    const [sortBy,setSortBy] = useState("")
    const [activatedButton,setActivatedButton] = useState(0)

    const filteredExpenses=()=>{
        if(categoryId){
            return expenses.filter(ele=>{
                return ele.categoryId===categoryId
            })
        }
        else{
                return expenses
        }
    }

    const sortData = () =>{
       switch(sortBy){
            case "" : {
                return filteredExpenses()
            }
            case "amountInc" : {
                return filteredExpenses().sort((a,b)=>a.amount-b.amount)
            }
            case "amountDec" : {
                return filteredExpenses().sort((a,b)=>b.amount-a.amount)
            }
            case "dateInc" : {
                return filteredExpenses().sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime())
            }
            case "dateDec" : {
                return filteredExpenses().sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime())
            }
       }
       
    }


    return (
        <div>
            <h3>Expense Details  
                <select value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                    <option value="">All</option>
                    {
                        categories.map(ele=>{
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })
                    }
                </select>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount <button id="1" onClick={()=>{setSortBy('amountInc');setActivatedButton(1)}} style={{backgroundColor:activatedButton==1 && "rgb(58, 140, 212)"}}>&#8593;</button>
                                    <button  id="2" onClick={()=>{setSortBy('amountDec');setActivatedButton(2)}} style={{backgroundColor:activatedButton==2 && "rgb(58, 140, 212)"}}>&#8595;</button></th>
                        <th>Date <button id="3" onClick={()=>{setSortBy('dateInc');setActivatedButton(3)}} style={{backgroundColor:activatedButton==3 && "rgb(58, 140, 212)"}}>&#8593;</button>
                                 <button id="4" onClick={()=>{setSortBy('dateDec');setActivatedButton(4)}} style={{backgroundColor:activatedButton==4 && "rgb(58, 140, 212)"}}>&#8595;</button></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortData().map(ele=>{
                            return <ExpenseItem key={ele._id} {...ele}/>
                        }) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseList
