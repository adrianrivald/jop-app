import back from '../../assets/icons/back.svg';

export default function Header(props) {
    return (
        <div className="flex items-center rounded-b-xl" style={{boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)'}}>
            <div className="flex-none w-14 h-14">
                <img className="h-full p-5" src={back} alt="back" />
            </div>
            <div className="flex-auto w-64 font-bold text-left">
                {props.title}
            </div>
            <div className="flex-auto w-32 ...">
                
            </div>
        </div>
    )
}