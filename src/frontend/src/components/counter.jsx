import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, sub } from '../Redux/Slices/counterSlice';

const Counter = () => {
    const dispatch = useDispatch();
    const selecter = useSelector((state)=>state.counter.count)
    const handledata = ()=>{
        dispatch(add);
    }
    const handlesub = ()=>{
        dispatch(sub)
    }
  return (
    <div>
        {selecter}
      <button onClick={handledata}>Add</button>
      <button onClick={handlesub}>Sub</button>
    </div>
  )
}

export default Counter
