import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import FlatButton from '../../../components/button/flat';
import DropDown from '../../../components/forms/Dropdown';

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}
function Opname(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="flex-auto w-64">
          <Dropdown title="Tempat Penimbangan" defaultValue="Pilih tempat penimbangan" option={[]} />
        </div>
        <div className="flex-auto w-64">
          <Dropdown title="Gudang" defaultValue="Pilih gudang" option={[]} />
        </div>
      </div>
      <div className="flex justify-between my-3 gap-3">
        <div className="p-3 rounded-xl border border-cloud w-full">
          <p className="text-xxs mb-1">Jenis bahan baku</p>
          <DropDown option={[]} onChange={() => {}} defaultValue={'Slab'} className="mt-6" />
        </div>
        <div className="p-3 rounded-xl border border-cloud w-full">
          <p className="text-xxs mb-3">Total Berat Timbang (WET)</p>
          <p className="text-4xl font-bold">2000 kg</p>
        </div>
      </div>
      <div className="scan mt-3">
        <Button
          isIcon
          icon={
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z"
                fill="white"
              />
            </svg>
          }
          text="Scan Update"
          className="w-full mt-2"
          onClick={() => navigate(`opname/scan`)}
        />
      </div>
      <div className="mt-3">
        <p>Tulis kode barang</p>
        <div className="flex items-center mt-2 justify-between">
          <input
            className="text-coal font-bold w-3/4 h-9 rounded-lg py-2.5 px-2.5 text-xs leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => e}
          />
          <Button isText text="Submit" className="h-9 py-0 ml-2" onClick={() => {}} />
        </div>
      </div>
      <div className="mt-44 w-full">
        <FlatButton
          className="w-full rounded-xl"
          role="white"
          text="Kembali ke atas"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        />
      </div>
    </div>
  );
}

export default Opname;
