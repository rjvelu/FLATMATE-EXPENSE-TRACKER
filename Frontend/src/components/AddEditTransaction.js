import React from 'react'
import { Form, Input, Modal, Select,message } from 'antd'
import Spinner from '../components/Spinner'
import axios from "axios"

// this component is used to trigger add/ edit functions for the private expenses module
function AddEditTransaction({setShowAddEditTransactionModal, showAddEditTransactionModal, getTransactions,selectedItemForEdit,setSelectedItemForEdit}) {

   // loading state to create a loading function whenever a api call takes place, it gives a loading symbol until the data is fetched
    const [loading,setLoading] = React.useState(false)
    
    // onFinish function is called when the form is submitted, it will make an api call to backend to fetch the data
    const onFinish= async(values)=>{
        try {   
            const Cuser = JSON.parse(localStorage.getItem("child-user"))
            const Puser = JSON.parse(localStorage.getItem("parent-user"))
            setLoading(true)
            if(selectedItemForEdit){

              values.sub_category = values.category;
              values.category = values.type;
             // values.type = "Personal"
              values.user_id = Cuser._id;
              console.log("transac id =  ",selectedItemForEdit._id)
              const resp = await fetch(`http://localhost:5001/expense/personal/${selectedItemForEdit._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});


           
              getTransactions();
          
                  message.success('transaction edited successfully')
            }
            else{
            values.sub_category = values.category;
            values.category = values.type;
            values.type = "Personal"
            values.user_id = Cuser._id;
            console.log(values);
            const resp = await fetch(`http://localhost:5001/expense/${Cuser._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
              
               getTransactions();
          
                message.success('transaction added successfully')  
              }


                setShowAddEditTransactionModal(false)
                setSelectedItemForEdit(null)
                setLoading(false)

        
            } catch (error) {
                setLoading(false)
            message.error('something went wrong addedit!')
        }
    
    }
  return (<>
    
      {/* add new button in the home page, this is brought from antd, we are using a state to turn it true and false using "visible" and onCancle props */}
      <Modal title="Add Transaction" open={showAddEditTransactionModal} onCancel={() => {setShowAddEditTransactionModal(false)}} footer={false}>
        <hr />
        {loading && <Spinner />}
        {/* form element, for users to input private expense. */} 
        <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
          <Form.Item label="Amount" name='amount' >
            <Input type='text' />
          </Form.Item>

          <Form.Item label="Type" name='type' >
            <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expence">Expense</Select.Option>
            </Select>
          </Form.Item>



          <Form.Item label="Category" name='category' > 
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="investments">Investments</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="educational">Educational</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name='date' >
            <Input type='date' />
          </Form.Item>

          <Form.Item label="Reference" name='reference' >
            <Input type='text' />
          </Form.Item>

          <Form.Item label="Description" name='description'  >
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Recurring expense" name='recurring_expense'  >
          <Select>
          <Select.Option value= { true} >Yes</Select.Option>
            <Select.Option value= {false }>No</Select.Option>
            </Select>
        </Form.Item>

          <div className='d-flex justify-content-end'>
            <button className='primary' type='submit'>Save</button>
          </div> 
        </Form>


      </Modal>
      </>)
  
}

export default AddEditTransaction