import Button from "../Button";

function SubmitButton ({text, isButtonDisabled, onClick}) {
    return (

        <div className="button-area mt-10 absolute bottom-20 left-1/2 transform -translate-x-1/2" style={{width: "92%"}}>
            <Button 
                className='rounded-xl w-full' 
                isText
                text={text}
                onClick={onClick}
                disabled={isButtonDisabled}
            />
        </div>
    )
}

export default SubmitButton