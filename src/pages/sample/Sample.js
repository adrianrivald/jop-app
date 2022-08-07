import Header from '../../components/ui/Header';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import Subtitle from '../../components/title/Subtitle';
import Table from '../../components/ui/Table';

function Sample() {
    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithNotification={true} />
            </div>
            <div className="container">
                <div className='flex justify-between items-center'>
                    <Title text='Gembung' />
                    <Button text={"Edit"} isLong={true}/>
                </div>
                <div className='mt-6'>
                    <Subtitle text='Informasi Wilayah & Cuaca' />
                    <span>-</span>
                </div>
                <Table 
                    estate={'Gembung'} 
                    estate_code={'TP0029883'} 
                    isWithHeader 
                    isWithFooter
                />
            </div>
        </>
    )
}

export default Sample;