import React from 'react';
import axios from 'axios';
import { expenseContext } from '../App';
import { categFormContext } from './CategoryContainer';
const {useContext} = React


const CategoryItem=(props)=>{
    const {enableEdit,disableEdit,liftFormData} = useContext(categFormContext)
    const {expenses,dispatch} = useContext(expenseContext)
    const {_id,name} = props 
    
    function handleDelete(e){
        if(!Boolean(expenses.find(ele=>ele.categoryId===_id))){
            const conf = window.confirm("Are you sure?")
            if(conf){
                axios.delete(`http://localhost:5555/api/categories/${_id}`)
                .then((response)=>{
                    dispatch({type:"DELETE_CATEGORY",payload:response.data._id})
                    disableEdit()
                })
                .catch((err)=>{
                    console.log("error : ",err)
                })
            }   
        }  
        else{
            alert(`Cannot delete ${name} category since an associated expense exists.`)
        }
    }

    function handleEdit(){
        liftFormData({_id,name})
        enableEdit()
    }

    return (
        <li>
        <span>{name} <button className="expense-counts">{expenses.filter(ele=>ele.categoryId===_id).length}</button></span>
        <button className="edit-button" onClick={handleEdit}>Edit</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default CategoryItem