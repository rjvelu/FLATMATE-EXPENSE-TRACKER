import React from 'react'
import { Form, Input, Modal, Select,message } from 'antd'
import Spinner from './Spinner'
import axios from "axios"
// this component is used to trigger add/ edit functions for the group expenses module
function AddEditTransaction_1({setShowAddEditTransactionModal, showAddEditTransactionModal, getTransactions_1,selectedItemForEdit,setSelectedItemForEdit}) {
  // getting all users under the parent id and storing it in mates variable
  const mates =  JSON.parse(localStorage.getItem('all-users'));
    // loading state to create a loading function whenever a api call takes place, it gives a loading symbol until the data is fetched
    const [loading,setLoading] = React.useState(false)
    
    // onFinish function is called when the form is submitted, it will make an api call to backend to fetch the data
    const onFinish= async(values)=>{
      console.log("values",values)
        try {   
            const Cuser = JSON.parse(localStorage.getItem("child-user"))
            const Puser = JSON.parse(localStorage.getItem("parent-user"))
            setLoading(true)
            console.log(selectedItemForEdit);
            if(selectedItemForEdit){
              console.log("values",values)

              values.sub_category = values.category;
              //values.category = values.type;
              values.flat_id = Puser._id;
              values.type = "Group"
              values.users= values.mates;
              console.log("transac id =  ",selectedItemForEdit._id)
              const resp = await fetch(`http://localhost:5001/expense/group/${selectedItemForEdit._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

            //   await axios.post('http://localhost:5000/api/transactions_1/edit-transaction', {
            //     payload :{...values, userid : Cuser._id, parentid : Puser._id},
            //     transactionId: selectedItemForEdit._id  
            //   // ...values, userid : Cuser._id, parentid : Puser._id, _id: selectedItemForEdit._id
            //  });
              getTransactions_1();
              //    sends a alert kinda message in the webpage
                  message.success('transaction edited successfully')

            }else{

            console.log("in else adding expense");
            //console.log(values);

              values.sub_category = values.category;
              values.flat_id = Puser._id;
              values.type = "Group"
              values.users= values.mates;

              console.log(values);

              const resp = await fetch(`http://localhost:5001/expense/${Puser._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
              console.log(await resp.json())
              if(resp.status===201){
                console.log("success added")
              }
              getTransactions_1();
             
          //    sends a alert kinda message in the webpage
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
      <Modal title={selectedItemForEdit ? "Edit Transaction" :"Add Transaction"} open={showAddEditTransactionModal} onCancel={() => {setShowAddEditTransactionModal(false)}} footer={false}>
        <hr />
        {loading && <Spinner />}

        {/* form element, for users to input group expense. */} 
        <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
          <Form.Item label="Amount" name='amount' >
            <Input type='text' />
          </Form.Item>

          <Form.Item label="Type" name='type' >
            <Select>
            {/* <Select.Option value="income">Income</Select.Option> */}
            <Select.Option value="expence">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Paid_by" name='paidby' >
            <Select>
            {Object.values(mates).map((element,i) => {
              return <Select.Option value={element._id} key={i}>{element.firstName}</Select.Option>
            })}
            </Select>
          </Form.Item>

          
          <Form.Item label="Mates" name='mates' >
            <Select mode="multiple">
            {/* {mates.map((data) =>{

            return <Select.Option value={data.name}>{data.name}</Select.Option>
            })} */}

            {Object.values(mates).map((element,i) => {
           //   console.log("element:",element)
              return <Select.Option value={element._id} key={i}>{element.firstName}</Select.Option>
            })}
            </Select>
          </Form.Item>



          <Form.Item label="Category" name='category' > 
          <Select>
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

          <div className='d-flex justify-content-end'>
            <button className='primary' type='submit'>Save</button>
          </div> 
        </Form>


      </Modal>
      </>)
  
}

export default AddEditTransaction_1
