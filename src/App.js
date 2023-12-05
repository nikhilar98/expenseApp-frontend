
import './App.css';
import React from 'react';
import axios from 'axios';
import ExpenseContainer from './components/ExpenseContainer';
import CategoryContainer from './components/CategoryContainer';
import Graph from './components/Graph';
import Insights from './components/Insights';




const {useReducer,useEffect,createContext} = React

export const reducer=(state,action)=>{
  switch(action.type){
      case "SET_CATEGORIES" : {
          return [...action.payload]
      }
      case "ADD_CATEGORY":{
          return [...state,action.payload]
      }
      case "DELETE_CATEGORY":{
          const result = state.filter(ele=>{
              return ele._id!==action.payload
          })
          return [...result]
      }
      case "UPDATE_CATEGORY":{
          const result=state.map(ele=>{
              if(ele._id===action.payload._id){
                  return  {_id:action.payload._id,name:action.payload.name}
              }
              else{
                  return  {...ele}
              }
          })
          return [...result]
      }
      default:{
          return [...state]
      }
  }
}

export const reducer2=(state,action)=>{  
  switch(action.type){
      case "SET_EXPENSES":{
          return [...action.payload]
      }
      case "ADD-EXPENSE":{
          return [...state,action.payload]
      }
      case "DELETE_EXPENSE":{
          const result = state.filter(ele=>{
              return ele._id!==action.payload
          })
          console.log(result)
          return [...result]
      }
      case "EDIT-EXPENSE" : {

          const {title,amount,date,categoryId} = action.payload

          const result =state.map(ele=>{
              if(ele._id===action.payload._id){
                  return {...ele,title,amount,date,categoryId}
              }
              else {
                  return {...ele}
              }
          })
          
          return [...result] 
      }
      default :{
          return [...state]
      }
  }
}
export const expenseContext = createContext()

function App(props) {
  const [categories,dispatch] = useReducer(reducer,[])
  const [expenses,dispatch2] = useReducer(reducer2,[])

  const arr = [`http://localhost:5555/api/categories`,`http://localhost:5555/api/expenses`]

  const amountByCategory = categories.map(ele=>{
    return [ele.name,expenses.filter(el=>el.categoryId===ele._id).reduce((prev,curr)=>{
            prev = prev+Number(curr.amount)
            return prev
    },0)]
    })

  const getMonthlyExpenses=()=>{
        const monthObj={}

        expenses.forEach(ele=>{
                if(monthObj.hasOwnProperty(ele.date.split("-")[1])){
                monthObj[ele.date.split("-")[1]]+=Number(ele.amount)  
                }
                else{
                        monthObj[ele.date.split("-")[1]]=Number(ele.amount)  
                }
        })

        const barData=Object.entries(monthObj).sort((a,b)=>Number(a[0])-Number(b[0])).map(ele=>{
                        switch(ele[0]){
                                case "01" : return ["Jan",ele[1]]
                                case "02" : return ["Feb",ele[1]]
                                case "03" : return ["Mar",ele[1]]
                                case "04" : return ["Apr",ele[1]]
                                case "05" : return ["May",ele[1]]
                                case "06" : return ["Jun",ele[1]]
                                case "07" : return ["Jul",ele[1]]
                                case "08" : return ["Aug",ele[1]]
                                case "09" : return ["Sep",ele[1]]
                                case "10" : return ["Oct",ele[1]]
                                case "11" : return ["Nov",ele[1]]
                                case "12" : return ["Dec",ele[1]]
                        }
                })

        return barData
    }

  useEffect(()=>{
      const data = arr.map(ele=>{
          return axios.get(ele)
          .then((response)=>{
              return response.data
          })
          .catch((err)=>{
              return err
          })
      })

      Promise.all(data)
          .then((values)=>{
              dispatch({type:"SET_CATEGORIES",payload:values[0]})
              dispatch2({type:"SET_EXPENSES",payload:values[1]})
          })
          .catch((err)=>{
              console.log("error: ",err)
      })
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
      <expenseContext.Provider value={{categories,dispatch,expenses,dispatch2,amountByCategory,getMonthlyExpenses}}>
      <div>
          <h1 id="title">Expense App</h1>
          <Insights/>
          <div style={{display:"flex",justifyContent:"center",gap:"80px"}}>
           
            <div>
            <CategoryContainer/>
            <ExpenseContainer/>
            </div>
            <Graph/>
          </div>
      </div>
      </expenseContext.Provider>
  )
}

export default App;

