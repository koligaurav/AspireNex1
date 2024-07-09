import React, { useEffect, useState } from 'react'
import Questions from './Questions'


/** redux store import  */

import {useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { moveNextAction, movePrevAction } from '../redux/question_reducer'
import { PushAnswer } from '../hooks/setResult'
const Quiz = () => {
    const[check, setChecked]= useState(undefined)
    const result=useSelector(state=>state.result.result);
    const {queue, trace}=useSelector(state=>state.questions)
    const dispatch= useDispatch()

    useEffect(()=>{
     console.log(queue)
    },[queue])
    /** next button  event handler */

function onNext(){
    
    if(trace<queue.length){
   /**update the trace value by one using move next action */
   dispatch(moveNextAction());
   /**insert a new result in an array */
  if(result.length<=trace){
    dispatch(PushAnswer(check));
    }
}
   /** reset the value of the checked variable */
   setChecked(undefined)  

}
    function onPrev(){
       console.log("On onPrev click")
       if(trace>0){
        dispatch(movePrevAction());
       }
       
    
    }
    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

     /** finished exam after the last question */
     if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }
    /** finished exan after last question */
    //if(result.length && result.length >=queue.length){
      //  return <Navigate to ={'/result'} replace={true}></Navigate>

    //}
  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <Questions onChecked={onChecked}/>
      <div className='grid'>
      { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
      <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default Quiz
