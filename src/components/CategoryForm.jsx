import React from 'react';
import axios from 'axios';
import { categFormContext } from './CategoryContainer';
import { expenseContext } from '../App';
const {useState,useEffect,useContext} = React


const CategoryForm = (props) => {

    const {editState,disableEdit,formData} = useContext(categFormContext)   
    const {dispatch} = useContext(expenseContext)
    const [categoryInput,setCategoryInput]= useState("")
    const [formErrors,setFormErrors] = useState([])


    useEffect(()=>{
        if(editState)
            {
                setCategoryInput(formData.name)
            }
        else{
            setCategoryInput("")
        }
    },[editState])

    function handleSubmit(e){

        e.preventDefault()
        axios.post(`http://localhost:5555/api/categories`,{name:categoryInput})
        .then((response)=>{
            dispatch({type:"ADD_CATEGORY",payload:response.data})
            setCategoryInput("")
            setFormErrors([])
        })
        .catch((err)=>{
            setFormErrors([...formErrors,...err.response.data.errors])
        }
        )
    }

    function handleEditForm(e){

        e.preventDefault() 

        axios.put(`http://localhost:5555/api/categories/${formData._id}`,{name:categoryInput})
        .then((response)=>{
            dispatch({type:"UPDATE_CATEGORY",payload:response.data})
            disableEdit()
            setCategoryInput("")
        })
        .catch((err)=>{
            console.log("Errors : ",err)
        })
    }

    function cancelEdit(){
        disableEdit()
    }

    return (
        <div>
            <fieldset className={editState ? "category-form-edit" : "category-form"}>
                <h2>{editState ? "Edit category":"Add category"}</h2>
                <form onSubmit={editState ? handleEditForm : handleSubmit}>
                    <input type="text" placeholder="Enter category name" value={categoryInput} onChange={(e)=>{setCategoryInput(e.target.value)}} />
                    <span className="error-msg">{Boolean(formErrors.length) && formErrors[0].msg}</span><br/>
                    <input type="submit" value={editState ? "Update" : "Create"}/>
                </form>
                { editState && <button onClick={cancelEdit} className="cancel-button"> Cancel </button>}
            </fieldset>
        </div>
    )
}

export default CategoryForm