import back from '../../assets/icons/back.svg';
import bell from '../../assets/icons/bell.svg';
import burger from '../../assets/icons/burger.svg';

export default function Header(props) {
    const { 
        title, 
        isWithNotification, 
        handleNotification, 
        handleBurgerMenu 
    } = props;
    return (
        <div className="flex p-5 items-center bg-white rounded-b-xl" style={{boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)'}}>
            <div className="flex-none w-8 h-auto">
                <img className="cursor-pointer" src={back} alt="back" />
            </div>
            <div className="flex-auto w-72 font-bold text-left">
                {title}
            </div>
            {
                isWithNotification ? (
                <div className="flex items-center justify-between w-16 ...">
                    <div className="flex-none">
                        <img src={bell} className='cursor-pointer' onClick={handleNotification} alt="notification" />
                    </div>
                    <div className="flex-none">
                        <img src={burger} className='cursor-pointer' onClick={handleBurgerMenu} alt="burger" />
                    </div>
                </div>
                ) : null
            }
        </div>
    )
}