/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */


export default function Button({
    isText,
    text,
    isIcon,
    icon,
    isFilter,
    filterCount,
    disabled,
    className,
    isBack,
    role,
    ...rest
}) {


    let roleStyle = 'bg-flora text-white'

    if (role === 'white' ) roleStyle = 'bg-white text-flora border border-flora'
    return (
        <>
            {
                isText ? !isBack ?
                    <button className={`bg-flora rounded-lg hover:bg-flora text-white font-bold p-2.5 w-32 ${className} ${disabled ? 'opacity-50 cursor-not-allowed	' : ''}`} {...rest}>
                        <span>{text}</span>
                    </button> : 
                    <button className={`bg-white rounded-lg hover:bg-white text-flora font-bold p-2.5 w-32 border border-flora ${className} ${disabled ? 'opacity-50 cursor-not-allowed	' : ''} `} {...rest}>
                        <span>{text}</span>
                    </button>
                    : null
            }
            {
                isIcon ?
                <button className={`${roleStyle} ${className} flex justify-center font-bold p-2.5 rounded-lg ${disabled ? 'opacity-50 cursor-not-allowed	' : ''}`} {...rest}>
                    <div className="mx-auto flex items-center ">
                        {icon}
                        {text && (
                            <span className="ml-1">{text}</span>
                        )}
                    </div>
                </button> : null
            }
            {
                isFilter ?
                <button className={`bg-white text-xs shadow flex items-center justify-between text-black font-bold p-3 rounded-lg w-full ${disabled ? 'opacity-50 cursor-not-allowed	' : ''} ${className}`} {...rest}>
                    <div className="flex items-center">
                        <svg className="mr-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.5555 4C4.47519 4 5.24989 3.37924 5.48346 2.53385H11.7222C11.9983 2.53385 12.2222 2.31 12.2222 2.03385C12.2222 1.75771 11.9983 1.53385 11.7222 1.53385H5.50089C5.29086 0.654115 4.49957 0 3.5555 0C2.61143 0 1.82014 0.654115 1.61011 1.53385H0.722168C0.446026 1.53385 0.222168 1.75771 0.222168 2.03385C0.222168 2.31 0.446026 2.53385 0.722168 2.53385H1.62754C1.86112 3.37924 2.63582 4 3.5555 4ZM3.5555 3C4.10779 3 4.5555 2.55228 4.5555 2C4.5555 1.44772 4.10779 1 3.5555 1C3.00322 1 2.5555 1.44772 2.5555 2C2.5555 2.55228 3.00322 3 3.5555 3Z" fill="#332919"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.96088 5.46615C7.19445 4.62076 7.96915 4 8.88883 4C9.80852 4 10.5832 4.62076 10.8168 5.46615H11.7222C11.9983 5.46615 12.2222 5.69 12.2222 5.96615C12.2222 6.24229 11.9983 6.46615 11.7222 6.46615H10.8342C10.6242 7.34589 9.8329 8 8.88883 8C7.94476 8 7.15347 7.34589 6.94345 6.46615L0.722168 6.46615C0.446026 6.46615 0.222168 6.24229 0.222168 5.96615C0.222168 5.69 0.446026 5.46615 0.722168 5.46615L6.96088 5.46615ZM7.88883 6C7.88883 5.44772 8.33655 5 8.88883 5C9.44112 5 9.88883 5.44772 9.88883 6C9.88883 6.55229 9.44112 7 8.88883 7C8.33655 7 7.88883 6.55229 7.88883 6Z" fill="#332919"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.48346 10.5339C5.24989 11.3792 4.47519 12 3.5555 12C2.63582 12 1.86112 11.3792 1.62754 10.5339H0.722168C0.446026 10.5339 0.222168 10.31 0.222168 10.0339C0.222168 9.75771 0.446026 9.53385 0.722168 9.53385H1.61011C1.82014 8.65412 2.61143 8 3.5555 8C4.49957 8 5.29086 8.65412 5.50089 9.53385H11.7222C11.9983 9.53385 12.2222 9.75771 12.2222 10.0339C12.2222 10.31 11.9983 10.5339 11.7222 10.5339H5.48346ZM4.5555 10C4.5555 10.5523 4.10779 11 3.5555 11C3.00322 11 2.5555 10.5523 2.5555 10C2.5555 9.44772 3.00322 9 3.5555 9C4.10779 9 4.5555 9.44772 4.5555 10Z" fill="#332919"/>
                        </svg>
                        <span>{text}</span>
                    </div>
                    {
                        filterCount !== 0 && (
                            <div className="ml-3 py-0.5 px-2 text-white bg-sun rounded-md text-xxs">{filterCount}</div>
                        )
                    }
                </button> : null

            }
        </>
    )
}