// import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import AddEditTransaction_1 from '../components/AddEditTransaction_1'
import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.scss'
import Spinner from '../components/Spinner'
import axios from 'axios'
import {DatePicker, Form,message, Select, Table} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
const { RangePicker } = DatePicker;


function Groupexpense({frequency,category,type,showAddEditTransactionModal,setShowAddEditTransactionModal,getTransactions_1,transactionsData1,setSelectedItemForEdit}) {

  const [loading,setLoading] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState([]);

// this function is used to make a backend api call and delete the task in the db and frontend
const deleteTransaction = async (record) => {
  try {
    setLoading(true);

    const resp = await fetch(`http://localhost:5001/expense/group/${record._id}`, {
			method: 'DELETE',
		});

    if(resp.ok){
      message.success("Transaction Deleted successfully");
    }

    // await axios.post(`http://localhost:5001/expense/group/${record._id}`, {
    //   transactionId: record._id,
    // });
    
    getTransactions_1();
    setLoading(false);
  } catch (error) {
    setLoading(false);
    message.error("Something went wrong");
  }
};


React.useEffect(() =>{
},[])

// renders the page whenever there is a state change in frequency, selectedrange, type and category
React.useEffect(()  =>{
    getTransactions_1()
},[frequency,selectedRange, type,category])


// designing the category according to the antd design pattern for table 
  const columns1 = [{
    title:"Date",
    dataIndex:"date",
    // rendering the date field in a specific format
    render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "Amount",
    dataIndex:"amount"
  },
  {
    title: "Shared_amount",
    dataIndex:"share"
  },
  {
    title:"Type",
    dataIndex:"type"
  },
  {
    title:"Paid_by",
    dataIndex:"paidby"
  },
  {
    title:"Mates",
    dataIndex:"mates",
    // rendering multiple mates with a space
    render: mates => mates.join(' ')
  },
  {
    title: "Category",
    dataIndex:"sub_category"
  },
  {
    title:"Reference",
    dataIndex:"description"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    // based on icon clicked, triggers certain actions
    render: (text, record) => {
      return (
        <div>
        {/* when edit icon is clicked, it opens the edit form and populates it with data */} 
          <EditOutlined
            onClick={() => {
              setSelectedItemForEdit(record);
              setShowAddEditTransactionModal(true);
            }}
          />
          {/* when delete icon is clicked, it triggers the deleteTransaction function with data which needs to be deleted*/} 
          <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
        </div>
      );
    },
  },
  ]
  return (
    <>
    {/* <div>{}</div> */}
    {/* Table component of antd with columns, and datasource with contains group expense data */}
    <Table columns={columns1} dataSource={transactionsData1} />
    </>
)
}

export default Groupexpense