

export default function Button(props) {
    const { isLong } = props;
    return (
        <button className={`bg-flora hover:bg-flora text-white font-bold p-2.5 rounded-xl ${isLong ? 'w-32' : 'w-8'}`}>
            {props.buttonText}
        </button>
    )
}