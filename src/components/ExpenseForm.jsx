import React from 'react';
import axios from 'axios';
import { expenseContext } from '../App';
import { expenseFormContext } from './ExpenseContainer';

const {useState,useEffect,useContext} = React

const ExpenseForm = (props) => {
                
    const {categories,dispatch2} = useContext(expenseContext)
    
    const {editExpenseState,expenseformData,disableExpenseEdit} = useContext(expenseFormContext)

    const [title,setTitle] = useState("")
    const [categoryId,setCategoryId] = useState("")
    const [amount,setAmount] = useState("")
    const [date,setDate] = useState("")
    const [formErrors,setFormErrors] = useState([])

    useEffect(()=>{
        if(editExpenseState){
            setTitle(expenseformData.title)
            setCategoryId(expenseformData.categoryId)
            setAmount(expenseformData.amount)
            setDate(expenseformData.date)
        }
        else{
            setTitle("")
            setCategoryId("")
            setAmount("")
            setDate("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editExpenseState])

    function handleSubmit(e){

        e.preventDefault()
            setFormErrors([])
            const expenseData= { 
                title,
                amount,
                date,
                categoryId
            }
            axios.post('http://localhost:5555/api/expenses',expenseData)
            .then((response)=>{
                dispatch2({type:"ADD-EXPENSE",payload:response.data})
                setTitle("")
                setCategoryId("")
                setAmount("")
                setDate("")
            })
            .catch((err)=>{
                setFormErrors(err.response.data.errors)
            })
        
       
    }

    function handleUpdate(e){
        e.preventDefault()
        setFormErrors([])
        const updatedObj = {
            title,
            categoryId,
            amount,
            date
        }

        axios.put(`http://localhost:5555/api/expenses/${expenseformData._id}`,{...updatedObj})
        .then((response)=>{
            dispatch2({type:"EDIT-EXPENSE",payload:response.data})
            setTitle("")
            setCategoryId("")
            setAmount("")
            setDate("")  
            disableExpenseEdit()
        })
        .catch((err)=>{
            setFormErrors(err.response.data.errors)
        })


    }

    function handleCancel(){
        disableExpenseEdit()
    }
    
    return (
        <div>
            <fieldset className={ editExpenseState ? "expense-form-edit" : "expense-form"}>
                <h1>{editExpenseState ? "Edit Expense" : "Add Expense"}</h1>

                <form onSubmit={editExpenseState? handleUpdate : handleSubmit} >

                    <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    <span className="error-msg">{formErrors.find(ele=>ele.path==='title') && formErrors.find(ele=>ele.path==='title').msg}</span><br/>

                    <select value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                        <option value=""> Select category </option>
                        <option value={-1}>blah blah</option>
                        {
                            categories.map(ele=>{
                                return <option key={ele._id} value={ele._id}>{ele.name}</option>
                            })
                        }
                    </select>
                    <span className="error-msg">{formErrors.find(ele=>ele.path==='categoryId') && formErrors.find(ele=>ele.path==='categoryId').msg}</span><br/>

                    <input type="number" placeholder="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                    <span className="error-msg">{formErrors.find(ele=>ele.path==='amount') && formErrors.find(ele=>ele.path==='amount').msg}</span><br/>
                    
                    <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                    <span className="error-msg">{formErrors.find(ele=>ele.path==='date') && formErrors.find(ele=>ele.path==='date').msg}</span><br/>

                    <input type="submit" value={editExpenseState ? "Update" : "Create"}/>
                </form>

                {editExpenseState && <button onClick={handleCancel} className="cancel-button">Cancel</button>}
            </fieldset>
        </div>
    )
}

export default ExpenseForm