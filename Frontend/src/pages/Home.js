// import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import DefaultLayout from '../components/DefaultLayout'
import '../styles/transactions.scss'
import Spinner from '../components/Spinner'
import axios from 'axios'
import {DatePicker, Form,message, Select, Table} from 'antd'
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import moment from "moment";
import Analytics from '../components/Analytics'
import { Navigate } from 'react-router-dom'
import Groupexpense from './Groupexpense'
import AddEditTransaction_1 from '../components/AddEditTransaction_1'
import '../styles/Home.scss'
const { RangePicker } = DatePicker;


function Home() {
  // to show the addedit modal
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = React.useState(false)
  // to capture the data required for edit
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [loading,setLoading] = React.useState(false)
  // to get all the data from the backend (private expense)
  const [transactionsData, setTransactionsData] = React.useState([])
  // to get all the data from the backend (group expense)
  const [transactionsData1, setTransactionsData1] = React.useState([])
  // data frequency filter 
  const [frequency, setFrequency] = React.useState('7')
  // expense type filter
  const [type, setType] = React.useState("all");
  // expense category filter
  const [category, setCategory] = React.useState("all");
  // date range state
  const [selectedRange, setSelectedRange] = React.useState([]);
  // viewtype to select if it private,group / analytics expense page
  const [viewType, setViewType] = React.useState("table");
  const [flag, setFlag] = React.useState(true)
  const [heading, setHeading] = React.useState("Private Expense")
  // all the below states are used to highlight the page icons as and when they are selected
  const[display_view, setDisplay_view] = React.useState("display_view")
  const[display1_view, setDisplay1_view] = React.useState("display_view")
  const[display12_view, setDisplay12_view] = React.useState("display_view_n")
  // paidby user filter
  const[paidby, setPaidby] = React.useState("all")
// all-users are obtained from the localstorage
  const mates =  JSON.parse(localStorage.getItem('all-users'));


// fetches the private expenses for certain user and set it to transaction data user
  const getTransactions = async() =>{
    try {
      
      const user = JSON.parse(localStorage.getItem('child-user'))
      setLoading(true)
  
      const url = `http://localhost:5001/expense/personal/${user._id}?`+ new URLSearchParams({
        frequency: frequency,
        type: type,
        category:category,
        selectedRange: JSON.stringify(selectedRange)
    })
    console.log(frequency,type,category,selectedRange)
    console.log(url);
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
          });
          const exp = await resp.json()
        console.log(exp);
        console.log(transactionsData);
          setTransactionsData(exp)
    //  const response =  await axios.post('http://localhost:5000/api/transactions/get-all-transactions', 
    //  {
    //    userid: user._id,
    //    frequency,
    //   //  checking  a condition inside an object syntax: (down)
    //    ...(frequency === "custom" && { selectedRange }),
    //    type,category
    //  });
    // //  console.log(response.data)
    //       setTransactionsData(response.data)
          setLoading(false)
  } catch (error) {
      // if we got a response, error, even then we will take out the loading symbol
      setLoading(false)
      message.error('Something went wrong home');
  }
}

// fetches the group expenses for certain user and set it to transaction data user
const getTransactions_1 = async() =>{
  try {

    const user = JSON.parse(localStorage.getItem("child-user"));
    setLoading(true);
    const user_name = [];
    // console.log(frequency);

    const url = `http://localhost:5001/expense/group/${user._id}?`+ new URLSearchParams({
        frequency: frequency,
        type: type,
        category:category,
        paidby: paidby,
        selectedRange: JSON.stringify(selectedRange)
    });

//    let url = `http://localhost:5001/expense/group/${user._id}`;
    console.log(url);
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
          });
          const exp = await resp.json();
        console.log(exp);

         // setTransactionsData(exp)


  //  const response =  await axios.post('http://localhost:5000/api/transactions_1/get-all-transactions', 
  //  {
  //    userid: user._id,
  //    frequency,
  //   //  checking  a condition inside an object syntax: (down)
  //    ...(frequency === "custom" && { selectedRange }),
  //    type,category
  //  });
  //  console.log(response.data)
        setTransactionsData1(exp)
        setLoading(false)
} catch (error) {
    // if we got a response, error, even then we will take out the loading symbol
    setLoading(false)
    message.error('Something went wrong home');
}
}

// this function is used to make a backend api call and delete the task in the db and frontend
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);

      const resp = await fetch(`http://localhost:5001/expense/personal/${record._id}`, {
			method: 'DELETE',
		});
    
      message.success("Transaction Deleted successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };





React.useEffect(() =>{

},[])


  React.useEffect(()  =>{
      getTransactions()
  },[frequency,selectedRange, type,category])

  React.useEffect(()  =>{
      getTransactions_1()
  },[frequency,selectedRange, type,paidby])

  // designing the category according to the antd design pattern for table 
const columns = [{
  title:"Date",
  dataIndex:"date",
  render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
},
{
  title: "Amount",
  dataIndex:"amount"
},
{
  title:"Type",
  dataIndex:"type"
},
{
  title: "Category",
  dataIndex:"category"
},
{
  title:"Reference",
  dataIndex:"description"
},
{
  title: "Actions",
  dataIndex: "actions",
  render: (text, record) => {
    return (
      <div>
        <EditOutlined
          onClick={() => {
            setSelectedItemForEdit(record);
            console.log("selectedItemForEdit:",selectedItemForEdit)
            setShowAddEditTransactionModal(true);
          }}
        />
        <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
      </div>
    );
  },
},


]

return (
  // default layout for the private expense page
  <DefaultLayout>
    {/* loading till the data is loaded */}
    {loading && <Spinner />}
    <div className='addBtnParent'>
      {/* add new button */}
    <button
    className={`primary ${display_view} add_btn`} 
    onClick={() => {setShowAddEditTransactionModal(true)
      setSelectedItemForEdit(null)
    }}
  >
    ADD NEW
</button>
    </div>
   
    <div className="filter d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="d-flex flex-column">
          {/* frequency filter */}
          <h6>Select-Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <div className="mt-2">
              <RangePicker
                value={selectedRange}
                onChange={(values) => setSelectedRange(values)}
              />
            </div>
          )}
        </div>
        {/* type filter */}
        <div className={`d-flex flex-column mx-4 ${display1_view}`}>
          <h6>Select-Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expence">Expense</Select.Option>
          </Select>
        </div>

            {/* paidby filter */}
        <div className={`d-flex flex-column mx-3 ${display12_view}`}>
          <h6>Paid-By</h6>
          <Select value={paidby} onChange={(value) => setPaidby(value)}>
            <Select.Option value="all">Everyone</Select.Option>
            {Object.values(Object.values(mates)).map((element,i) => {
              console.log("maates",element._id)
              return <Select.Option value={element._id} key={i}>{element.firstName}</Select.Option>
            })}    
          </Select>
        </div>
        {/* category filter */}

        <div className="d-flex flex-column mx-3">
          <h6>Select-Category</h6>
          <Select value={category} onChange={(value) => setCategory(value)}>
          <Select.Option value="all">All</Select.Option>
          {/* based on group or private the catrgory values are changed */}
          {flag ?(<><Select.Option value="salary">Salary</Select.Option>

          <Select.Option value="investments">Investments</Select.Option>

          <Select.Option value="food">Food</Select.Option>

          <Select.Option value="entertainment">Entertainment</Select.Option>

          <Select.Option value="educational">Educational</Select.Option>

          <Select.Option value="medical">Medical</Select.Option>

          <Select.Option value="tax">Tax</Select.Option></>) : (  <><Select.Option value="food">Food</Select.Option>

          <Select.Option value="entertainment">Entertainment</Select.Option>

          <Select.Option value="educational">Educational</Select.Option>

          <Select.Option value="medical">Medical</Select.Option>

          <Select.Option value="tax">Tax</Select.Option></>) }
          </Select>
        </div>
      </div>
      <div className="d-flex flex-column mx-5">
        {<h1>{heading}</h1>}
      </div>

      <div className="d-flex">
        <div>
          <div className="view-switch mx-5">
            {/* private page */}
            <UnorderedListOutlined
              className={`mx-3 ${
                viewType === "table" ? "active-icon" : "inactive-icon"
              } `}
              onClick={() => {setViewType("table")
              setFlag(true)
              getTransactions();
              setHeading("Private Expense")
              setDisplay_view("display_view")
              setDisplay1_view("display_view")
              setDisplay12_view("display_view_n")
            }
              
            }
              size={30}
            />&nbsp;
                          {/* group page */}
            <UsergroupAddOutlined
              className={`mx-3 ${
                viewType === "group-expense" ? "active-icon" : "inactive-icon"
              } `}
              onClick={() => {setViewType("group-expense")
                setFlag(false)
                getTransactions_1();
                setHeading("Group Expense")
                setDisplay_view("display_view")
                setDisplay1_view("display_view_n")
                setDisplay12_view("display_view")
              }
            }
              size={30}
            />
             {/* private analytics */}
            <AreaChartOutlined className={`mx-3 ${
                viewType === "Private-analytics" ? "active-icon" : "inactive-icon"
              } `}
              onClick={() => {setViewType("Private-analytics")
                              setHeading("Private Analytics") 
                              setDisplay_view("display_view_n")
                              setDisplay1_view("display_view")
                              setDisplay12_view("display_view_n")
            }
          }
              size={30}/>
              {/* group analytics */}
            <BarChartOutlined className={`mx-3 ${
                viewType === "Group-analytics" ? "active-icon" : "inactive-icon"
              } `}
              onClick={() => {setViewType("Group-analytics")
                              setHeading("Group Analytics") 
                              setDisplay_view("display_view_n")
                              setDisplay1_view("display_view_n")
                              setDisplay12_view("display_view ")
            }
          }
              size={30}/>
          </div>
        </div>
        
      </div>
    </div>
{/* <h1>{viewType}</h1> */}
    <div className="table-analtics">
      {/* {viewType1} */}
      {viewType === "table" ? (
        <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div>
      ) : viewType === "group-expense" ? (
        <div className="rowspace">
          {/* when groupexpense icon is clicked, it triggers the below component */}
        <Groupexpense  frequency={frequency} category={category} type={type} 
        showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal={setShowAddEditTransactionModal} 
        setSelectedItemForEdit={setSelectedItemForEdit} getTransactions_1 = {getTransactions_1} transactionsData1={transactionsData1}
        />
        </div>) : viewType === "Private-analytics" ? (<Analytics transactions={transactionsData} getTransactions = {getTransactions} />) :
         viewType === "Group-analytics" ? (<Analytics transactions={transactionsData1} getTransactions = {getTransactions_1} />) :  <></>
       
      }
    </div>

      {/*  based on private or group expense, triggers a different add new form */}
    { flag ? (showAddEditTransactionModal && (
      <AddEditTransaction
        showAddEditTransactionModal={showAddEditTransactionModal}
        setShowAddEditTransactionModal={setShowAddEditTransactionModal}
        selectedItemForEdit={selectedItemForEdit}
        getTransactions={getTransactions}
        setSelectedItemForEdit={setSelectedItemForEdit}
      />)) : (showAddEditTransactionModal && (
        <AddEditTransaction_1
      showAddEditTransactionModal={showAddEditTransactionModal}
      setShowAddEditTransactionModal={setShowAddEditTransactionModal}
      selectedItemForEdit={selectedItemForEdit}
      getTransactions_1={getTransactions_1}
      setSelectedItemForEdit={setSelectedItemForEdit}
    />))

    }
  </DefaultLayout>
);
}

export default Home;