import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import Header from '../../components/ui/Header';
import Cookies from 'universal-cookie';
import Toast from '../../components/ui/Toast';
import DropDown from '../../components/forms/Dropdown';
import './warehouse.scss';
import FlatButton from '../../components/button/flat';
import Opname from './opname';
import CheckIn from './check-in';
import Stock from './stock';
import CheckOut from './check-out';
// import FlatButton from '../../../../components/button/flat';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function TabsWH(props) {
  const slider = () => {
    switch (props.selectedTab) {
      case 'opname':
        return 'translate-x-0.25';
      case 'check-in':
        return 'translate-x-7';
      case 'stock':
        return 'translate-x-13.75';
      case 'check-out':
        return 'translate-x-20.5';
      default:
        break;
    }
  };

  return (
    <div className="tabs">
      <ul className="flex bg-white rounded-xl justify-between p-1">
        {props.tabList?.map((res, idx) => {
          const id = res.toLowerCase();
          return (
            <>
              <li
                className={`cursor-pointer rounded-xl p-1 w-1/4 text-center z-10 transition-all duration-75	 ${
                  props.selectedTab === id ? 'bg-flora text-white' : null
                }`}
                onClick={() => props.onChangeTab(id)}
              >
                <span className="font-bold">{res}</span>
              </li>
              {/* <div 
                                    className={
                                        `glider 
                                        ${slider()}`}
                                /> */}
            </>
          );
        })}
      </ul>
    </div>
  );
}

function Content(props) {
  switch (props.selectedTab) {
    case 'opname':
      return <Opname />;
    case 'check-in':
      return <CheckIn />;
    case 'stock':
      return <Stock />;
    case 'check-out':
      return <CheckOut />;
    default:
      return <Opname />;
  }
}

function Warehouse() {
  const [isActive, setIsActive] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('opname');
  const tabList = ['Opname', 'Check-in', 'Stock', 'Check-out'];

  const onChangeTab = (id) => {
    setSelectedTab(id);
  };

  return (
    <>
      <div className="header">
        <Header title="Opname WH" isWithBack />
      </div>
      <div className="container">
        <TabsWH selectedTab={selectedTab} tabList={tabList} onChangeTab={onChangeTab} />
        <div className="mt-3">
          <Content selectedTab={selectedTab} />
        </div>
        <Toast />
      </div>
    </>
  );
}

export default Warehouse;
