import Header from '../../components/ui/Header';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';

function Sample() {
    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithNotification={true} />
            </div>
            <div className="container">
                <Title text='Gembung' />
                <Button buttonText={"Edit"} isLong={true}/>
            </div>
        </>
    )
}

export default Sample;