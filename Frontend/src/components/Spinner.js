import React from 'react'
import { Spin } from 'antd';

// to give the loading impresion when the api is doing some task, we are taking the loading icon from antd
function Spinner() {
  return (
    <div className='spinner'>
  {/* lottie loading animation */}
    <Spin size='large'/>
    </div>
  )
}

export default Spinner