import React from 'react'
import '../styles/default-layout.scss'
import {Menu,  Button, Dropdown, Space} from 'antd';
import {useNavigate} from "react-router-dom"

// this is the default layout compomemt used by all the application pages
function DefaultLayout(props) {
    const navigate = useNavigate();
    // antd properties, creating list of nav bar links
    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => {
                    navigate('/home')
                }}>
                    Home
                </div>
                
            )
            
        },
         {
            key: '2',
            label: (
                <div onClick={() => {
                    navigate('/profile')
               }}>Profile</div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={() => {
                    navigate('/userLogin')
                    localStorage.removeItem('child-user')
                    localStorage.removeItem('forgot-user')

               }}>Switch-User</div>
            ),
        },
        {
            key: '3',
            label: (
                // putting li instead of div is throwing warning
               <div onClick={() => {
                    localStorage.removeItem('parent-user')
                    localStorage.removeItem('child-user')
                    localStorage.removeItem('all-users')
                    localStorage.removeItem('forgot-user')
                    navigate('/login')
               }}>Logout</div>
            )
            
        },
        
        // {
        //     key: '2',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        //             2nd menu item
        //         </a>
        //     ),
        // },
        // {
        //     key: '3',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //             3rd menu item
        //         </a>
        //     ),
        // },
    ];

    // getting parent and child user values
    const user = JSON.parse(localStorage.getItem('child-user'))
    const flat = JSON.parse(localStorage.getItem('parent-user'))
    
    return (
        
        <div className='layout'>
        {/* top layout to create a header with flat_name */}
            <div className='header d-flex justify-content-between align-items-center'>
                <div>
                    <h1 className='logo'>{flat.flatName}</h1>
                </div>
                <div>
                 
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    arrow
                >
                    <button className='primary'>{user.firstName}</button>
                </Dropdown>
                </div>

            </div>
                      {/* content div where all the expense crud and analytics pages are appended */}
            <div className='content'>
                {props.children}
            </div>



        </div>
    )
}

export default DefaultLayout