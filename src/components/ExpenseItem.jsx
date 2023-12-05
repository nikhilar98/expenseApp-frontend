import React from 'react';
import axios from 'axios';
import { expenseFormContext } from './ExpenseContainer';
import { expenseContext } from '../App';
const {useContext} = React

const ExpenseItem = (props) => {

    const {enableExpenseEdit,liftExpenseFormData} = useContext(expenseFormContext)
    const {categories,dispatch2} = useContext(expenseContext)
    const {title,amount,date,categoryId,_id} = props 

    function getCategoryName(id){
        return categories.find(ele=>{
            return ele._id===id
        }).name 
    }

    function handleDelete(){
        const conf = window.confirm("Are you sure?")
        if(conf){
            axios.delete(`http://localhost:5555/api/expenses/${_id}`)
            .then((response)=>{
                dispatch2({type:"DELETE_EXPENSE",payload:response.data._id}) 
            })
            .catch((err)=>{
                console.log("error : ",err)   
            })
        }
    }

    function handleEdit(){
        
        liftExpenseFormData({
            title,
            amount,
            date,
            categoryId,
            _id
        })
        enableExpenseEdit()
    }

    return (
        <tr>
            <td>{title}</td>
            <td>{getCategoryName(categoryId)}</td>
            <td>&#8377;{amount}</td>
            <td>{date}</td>
            <td>
                <button className="edit-button" onClick={handleEdit}>Edit</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    )
}

export default ExpenseItem