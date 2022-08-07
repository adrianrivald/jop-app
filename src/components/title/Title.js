export default function Title(props) {
    const { text } = props
    return (
        <h1 className="m-1 font-bold text-coal text-xl">
            {text}
        </h1>
    )
}