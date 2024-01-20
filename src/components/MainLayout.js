import React, { useState } from 'react';
import { AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineUser,AiOutlineBgColors,AiOutlinePicLeft,AiOutlinePicRight} from "react-icons/ai";
import {SiBrandfolder} from "react-icons/si";
import {BiCategory} from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa6";
import { ImBlog } from "react-icons/im";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate=useNavigate();
  return (
    <Layout className='ant-Layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-4 text-center py-3 mb-0'>
            <span className='sm-logo'>DH</span>
            <span className='lg-logo'>Dev Hub</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key=="signout"){

            }
            else{
              navigate(key);
            }
          }}

          
          items={[
            {
              key: '',
              icon: < AiOutlineDashboard className="fs-4"/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: < AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: < AiOutlineDashboard className="fs-4"/>,
              label: 'Catalog',
              children:[
                {
                  key:"product",
                  icon:<AiOutlineShoppingCart className="fs-4"/>,
                  label:"Add Product ",
                },
                {
                  key:"product-list",
                  icon:<AiOutlineShoppingCart  className="fs-4"/>,
                  label:"Product List",
                },
                {
                  key:"brand",
                  icon:<SiBrandfolder  className="fs-4"/>,
                  label:"Brand",
                },
                {
                  key:"list-brand",
                  icon:<SiBrandfolder  className="fs-4"/>,
                  label:"Brand List",
                },
                {
                  key:"category",
                  icon:<BiCategory  className="fs-4"/>,
                  label:"Category",
                },
                {
                  key:"list-category",
                  icon:<BiCategory  className="fs-4"/>,
                  label:"Category List",
                },
                {
                  key:"color",
                  icon:<AiOutlineBgColors  className="fs-4"/>,
                  label:"Color",
                },
                {
                  key:"list-color",
                  icon:<AiOutlineBgColors  className="fs-4"/>,
                  label:"Color List",
                },

              ]
            },
            {
              key: 'orders',
              icon: < FaClipboardList className="fs-4" />,
              label: 'Orders',
            },
            {
              key: 'blog',
              icon: < FaBloggerB className="fs-4" />,
              label: 'Blogs',
              children:[
                {
                  key: 'blog',
                  icon: < ImBlog  className="fs-4" />,
                  label: ' Add Blogs',
                },
                {
                  key: 'blog-list',
                  icon: < FaBloggerB className="fs-4" />,
                  label: ' Blog List',
                },
                {
                  key: 'blog-category',
                  icon: < ImBlog  className="fs-4" />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: < FaBloggerB className="fs-4" />,
                  label: 'Blog Category List',
                }
              ]
            },
            {
              key: 'enquiries',
              icon: < FaFileCircleQuestion className="fs-4" />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className='d-flex  justify-content-between  ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight size={30}/> : <AiOutlinePicLeft size={30} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoNotifications size={20}/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div>
            <div className='d-flex gap-3 align-items-center'>
              <div>
                <img width={50} height={50} src="https://media.istockphoto.com/id/470099752/photo/happy-young-man-at-office-browsing-internet-on-digitl-tablet.jpg?s=1024x1024&w=is&k=20&c=BgxGxT6ercp_-YhimN-VkkHZhuKT0Gah_y2GZGQuO1g=" alt=""/>
              </div>
              <div className='user d-flex flex-column align-items-center gap-0 '>
                <h5 className='mb-0'>Arjav</h5>
                <p className='mb-0'>arjav@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;



// #86cbb6