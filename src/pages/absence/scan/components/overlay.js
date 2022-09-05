import './overlay.css'

const Overlay = (props) => {
    return (
        <>
            <div className="scan-area">
                {/* <p className='font-sm'>Tempatkan QR Code dalam kotak</p> */}
            </div>
            <div className='overlay'>
                <p>Jika scan barcode gagal, ketik dan masukan <span className="font-bold">nomor induk karyawan</span> kedalam kotak dibawah:</p>
                <input className="text-coal font-bold w-2/4 mt-2 rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={props.onChange}/>
            </div>
        </>
    )
}

export default Overlay