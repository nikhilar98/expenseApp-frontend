import React from 'react';
import CategoryItem from "./CategoryItem"
import { expenseContext } from '../App';

const {useContext} = React

const CategoryList = (props) => {
    const {categories} = useContext(expenseContext)
    return ( 
        <div>
            <h3>Listing Categories - {categories.length}</h3>
            <ul style={{listStyle:"none"}}>
            {
                categories.map(ele=>{
                    return <CategoryItem key={ele._id} {...ele}/>
                })
            }             
            </ul>
        </div>
    )
}

export default CategoryList