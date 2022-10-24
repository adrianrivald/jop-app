import React from 'react';
import { saveAs } from 'file-saver';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../../components/button/Button';
import Header from '../../../../../components/ui/Header';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Title from '../../../../../components/title/Title';

const url = process.env.REACT_APP_API_URL;

function WarehouseCIQR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [stockDetail, setStockDetail] = React.useState({});

  React.useEffect(() => {
    getStockDetail();
  }, []);

  const getStockDetail = () => {
    axios
      .get(`${url}/warehouse/stock-in/detail/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setStockDetail(data);
      })
      .catch((err) => {});
  };

  const onDownloadImage = (url) => {
    saveAs(url, 'qr.jpg');
  };

  return (
    <>
      <div className="header">
        <Header title="Kode Stock Baru" isWithBack />
      </div>
      <div className="container">
        <div className="flex justify-center my-24 text-center">
          <div>
            <Title text={stockDetail?.kode} />
            <img src={stockDetail?.qr_path} alt="qr-code" className="w-full my-5" />
            <Button
              isIcon
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1665 13.6674C12.4427 13.6674 12.6667 13.8912 12.6667 14.1673C12.6667 14.4434 12.4429 14.6674 12.1668 14.6674L3.50015 14.67C3.224 14.67 3 14.4462 3 14.1701C3 13.894 3.22371 13.67 3.49985 13.67L12.1665 13.6674ZM7.76547 1.34197L7.83333 1.3374C8.08647 1.3374 8.29567 1.5255 8.3288 1.76956L8.33333 1.8374L8.33267 10.9608L10.8139 8.4805C10.9914 8.30303 11.2692 8.2869 11.4649 8.43216L11.521 8.48056C11.6985 8.6581 11.7146 8.9359 11.5693 9.13163L11.5209 9.1877L8.18913 12.5188C8.01173 12.6962 7.73413 12.7124 7.5384 12.5673L7.48233 12.519L4.14669 9.1879C3.95129 8.99276 3.95107 8.67616 4.14621 8.48076C4.32359 8.30316 4.60136 8.28683 4.7972 8.43196L4.85331 8.4803L7.33267 10.9561L7.33333 1.8374C7.33333 1.58427 7.52147 1.37508 7.76547 1.34197L7.83333 1.3374L7.76547 1.34197Z"
                    fill="#332919"
                  />
                </svg>
              }
              text="Unduh Gambar"
              className="bg-white text-black shadow mx-auto"
              onClick={() => onDownloadImage(stockDetail?.qr_path)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WarehouseCIQR;
