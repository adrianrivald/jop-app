

export default function Button({
    isText,
    text,
    isIcon,
    icon
}) {
    return (
        <>
            {
                isText ?
                    <button className={`bg-flora hover:bg-flora text-white font-bold p-2.5 rounded-xl w-32`}>
                        {text}
                    </button> : null
            }
            {
                isIcon ?
                <button className={`bg-flora flex hover:bg-flora text-white font-bold p-2.5 rounded-xl`}>
                    {icon}
                </button> : null
            }
        </>
    )
}