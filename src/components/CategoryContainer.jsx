
import CategoryList from "./CategoryList"
import CategoryForm from "./CategoryForm"
import React from 'react';

const {useState,createContext} = React

export const categFormContext = createContext()

const CategoryContainer = (props) => {
                
    const [editState,setEditState] = useState(false) 


    const [formData,setFormData] = useState({})

    function liftFormData(data){
        setFormData(data)
    }

    function enableEdit(){
        setEditState(true)
    }
    function disableEdit(){
        setEditState(false)
    }

    return (
        <categFormContext.Provider value={{editState,enableEdit,disableEdit,formData,liftFormData}}>
            <div className="category-container">
                <CategoryForm/>
                <CategoryList/>
            </div>
        </categFormContext.Provider>
    )
}

export default CategoryContainer

