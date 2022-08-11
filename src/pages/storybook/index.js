import React from 'react';
import FlatButton from '../../components/button/flat'

const Storybook = () => {
    return(
        <div className="w-full h-screen p-4">
           <h1 className="font-black text-3xl text-center mb-4">STORYBOOK</h1>
            <div>
                <h2 className="font-black mb-2">Button</h2>
                <div className="flex flex-col"> 
                    {/* button fit content */}
                    <div className="mb-2">
                        <FlatButton text={"Green Button"} className={'w-fit mr-2'}/>
                        <FlatButton role="white" text={"White Button"} className={'w-fit'}/>
                    </div>
                    {/* button full */}
                    <div className="mb-2">
                        <FlatButton text={"Green Button"} className={'w-full mb-2'}/>
                        <FlatButton role="white" text={"White Button"} className={'w-full'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Storybook