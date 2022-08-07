export default function Subtitle(props) {
    const { title } = props
    return (
        <h1 className="m-1 font-bold text-coal text-xl">
            {title}
        </h1>
    )
}