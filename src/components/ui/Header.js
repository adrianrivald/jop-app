import back from '../../assets/icons/back.svg';
import bell from '../../assets/icons/bell.svg';
import burger from '../../assets/icons/burger.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Drawer from './Drawer';

export default function Header({ title, isWithBack, isWithNotification, isWithBurgerMenu, handleNotification }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleBurgerMenu = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="flex p-5 items-center bg-white rounded-b-xl"
      style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)' }}
    >
      {isWithBack ? (
        <div className="flex-none w-8 h-auto">
          <img className="cursor-pointer" onClick={() => navigate(-1)} src={back} alt="back" />
        </div>
      ) : null}
      <div className="flex-auto w-72 font-bold text-left">{title}</div>
      <div className="flex items-center justify-between w-16 ...">
        {isWithNotification ? (
          <div className="flex-none">
            <img src={bell} className="cursor-pointer" onClick={handleNotification} alt="notification" />
          </div>
        ) : null}
        {isWithBurgerMenu ? (
          <div className="flex-none">
            <img src={burger} className="cursor-pointer" onClick={handleBurgerMenu} alt="burger" />
          </div>
        ) : null}
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="m-10 flex justify-between items-center">
            <p>Menu</p>
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              X
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
