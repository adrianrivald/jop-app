import React from 'react';
import Header from '../../components/ui/Header';
import Toast from '../../components/ui/Toast';
import DropDown from '../../components/forms/Dropdown';
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
  const [selectedTab, setSelectedTab] = React.useState('');
  const tabList = ['Opname', 'Check-in', 'Stock', 'Check-out'];
  const saved_tab = localStorage.getItem('saved_tab');

  React.useEffect(() => {
    if (saved_tab !== null) {
      setSelectedTab(saved_tab);
    } else {
      setSelectedTab('opname');
    }
  }, [localStorage.getItem('saved_tab')]);

  const onChangeTab = (id) => {
    setSelectedTab(id);
    localStorage.setItem('saved_tab', id);
  };

  const headerTitle = () => {
    switch (localStorage.getItem('saved_tab')) {
      case 'opname':
        return 'Opname WH';
      case 'check-in':
        return 'Check-In WH';
      case 'stock':
        return 'Stock WH';
      case 'check-out':
        return 'Check-Out WH';
      default:
        return 'Opname WH';
    }
  };

  return (
    <>
      <div className="header">
        <Header title={headerTitle()} isWithBack />
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
