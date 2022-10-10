import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';
import DropDown from '../../../../components/forms/Dropdown';
import FlatButton from '../../../../components/button/flat';
import Divider from '../../../../components/ui/Divider';
import axios from 'axios';
// import FlatButton from '../../../../../../../../components/button/flat';

const url = process.env.REACT_APP_API_URL;

function WarehouseOpnameUpdate() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});

  const onSelectPhoto = (e) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('path', 'public/logistik/kirim');
    void uploadPhoto(formData);
  };

  const uploadPhoto = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'image/jpeg',
        Accept: 'application/json',
      },
    };
    await axios
      .post(
        `${url}upload-foto
        `,
        formData,
        config
      )
      .then((res) => {
        const data = res?.data?.data;
        setPhotos([...photos, data?.path]);
        setPayload({
          ...payload,
          path_foto: [...photos, data?.path],
        });
      });
  };

  const handleSubmit = () => {
    navigate('/warehouse');
  };

  return (
    <>
      <div className="header">
        <Header title="Update Kondisi Stock" isWithBack />
      </div>
      <div className="container">
        <Title text="WH1-G1.001/02-12/P1" />
        <div className="flex justify-between my-5 gap-3">
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Wet</p>
            <p className="text-4xl font-bold">1348</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">DRC</p>
            <p className="text-4xl font-bold">46 %</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Dry</p>
            <p className="text-4xl font-bold">1127</p>
          </div>
        </div>
        <Divider />
        <div className="input-section">
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">Total Wet</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">kg</span>
                <input
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  pattern="\d*"
                  onChange={(e) => {}}
                />
              </div>
              <Button className="text-xs w-16" isText text="Edit" onClick={() => {}} />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">DRC</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">%</span>
                <input
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  pattern="\d*"
                  onChange={(e) => {}}
                />
              </div>

              <Button className="text-xs w-16" isText text="Edit" onClick={() => {}} />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">Total Dry</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">kg</span>
                <input
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  pattern="\d*"
                  onChange={(e) => {}}
                />
              </div>
              <Button className="text-xs w-16" isText text="Edit" onClick={() => {}} />
            </div>
          </div>
        </div>
        <div className="photo-area mt-3">
          <div className="photos-container overflow-x-auto flex gap-3">
            {photos?.map((res, idx) => (
              <img
                width="200"
                alt={`photo_${idx + 1}`}
                // src={`${'https://jop.dudyali.com/storage/'}${res}`}
                src={res.includes('/storage') ? res : `${'https://jop.dudyali.com/storage/'}${res}`}
                // src={res}
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="file-upload"
            className="w-full rounded-lg bg-flora text-white font-bold p-3 block text-center flex justify-center items-center gap-2 cursor-pointer"
          >
            <svg
              className="block"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.889 8.00052C13.9141 8.00052 15.5557 9.64212 15.5557 11.6672C15.5557 13.6922 13.9141 15.3338 11.889 15.3338C9.86393 15.3338 8.22233 13.6922 8.22233 11.6672C8.22233 9.64212 9.86393 8.00052 11.889 8.00052ZM11.889 9.33332L11.8291 9.33865C11.693 9.36338 11.5857 9.47065 11.5611 9.60672L11.5557 9.66665L11.5554 11.3333L9.88746 11.3338L9.82753 11.3392C9.69146 11.3639 9.58413 11.4712 9.55946 11.6072L9.55413 11.6672L9.55946 11.727C9.58413 11.8631 9.69146 11.9704 9.82753 11.9951L9.88746 12.0005L11.5561 12L11.5564 13.6694L11.5618 13.7294C11.5865 13.8654 11.6937 13.9727 11.8298 13.9974L11.8897 14.0028L11.9497 13.9974C12.0857 13.9727 12.193 13.8654 12.2177 13.7294L12.2231 13.6694L12.2228 12L13.8921 12.0005L13.9519 11.9951C14.088 11.9704 14.1953 11.8631 14.22 11.727L14.2254 11.6672L14.22 11.6072C14.1953 11.4712 14.088 11.3639 13.9519 11.3392L13.8921 11.3338L12.2221 11.3333L12.2223 9.66665L12.2169 9.60672C12.1923 9.47065 12.085 9.36338 11.9489 9.33865L11.889 9.33332ZM9.50546 1.66919C10.0373 1.66919 10.5295 1.95084 10.7988 2.40944L11.3419 3.33382H12.7223C13.9189 3.33382 14.889 4.30387 14.889 5.50049L14.8895 8.54072C14.5934 8.25645 14.257 8.01385 13.8897 7.82232L13.889 5.50049C13.889 4.85616 13.3667 4.33382 12.7223 4.33382H11.0557C10.8784 4.33382 10.7143 4.23994 10.6245 4.08707L9.9366 2.91594C9.8468 2.76307 9.68273 2.66919 9.50546 2.66919H6.9706C6.82161 2.66919 6.6818 2.7355 6.58762 2.84772L6.5445 2.90756L5.81508 4.09546C5.72414 4.24356 5.5628 4.33382 5.389 4.33382H3.72233C3.078 4.33382 2.55566 4.85616 2.55566 5.50049V11.8338C2.55566 12.4782 3.078 13.0005 3.72233 13.0005L7.76453 13.0001C7.87946 13.3559 8.03913 13.6917 8.23693 14.0007L3.72233 14.0005C2.52571 14.0005 1.55566 13.0304 1.55566 11.8338V5.50049C1.55566 4.30387 2.52571 3.33382 3.72233 3.33382H5.10928L5.69233 2.38429C5.96516 1.93996 6.44917 1.66919 6.9706 1.66919H9.50546ZM8.22233 5.33382C9.55686 5.33382 10.6879 6.20518 11.0774 7.40998C10.7437 7.47292 10.4238 7.57432 10.1221 7.70918C9.8604 6.91045 9.10873 6.33382 8.22233 6.33382C7.11773 6.33382 6.22233 7.22925 6.22233 8.33385C6.22233 9.28672 6.88876 10.084 7.781 10.285C7.67606 10.5961 7.60553 10.9242 7.5742 11.2636C6.22896 10.9675 5.22233 9.76818 5.22233 8.33385C5.22233 6.67698 6.56548 5.33382 8.22233 5.33382Z"
                fill="#F2F5F7"
              />
            </svg>
            Tambah Foto
          </label>
          <input id="file-upload" type="file" onChange={onSelectPhoto} style={{ display: 'none' }} />
        </div>
        <div className="button-area flex mt-12 gap-2">
          <Button isText isBack text="Kembali" className="w-full" />
          <Button isText text="Simpan" className="w-full" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default WarehouseOpnameUpdate;
