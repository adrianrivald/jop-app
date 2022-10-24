import Button from '../button/Button';
import DropDown from '../forms/Dropdown';
import Title from '../title/Title';

export default function Modal({ onClose, children }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto transition-all">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={onClose}></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-1/2 max-w-lg p-3 mx-auto bg-white border rounded-xl shadow-lg">
            <div className="p-3 mx-auto text-center bg-bgrey rounded-xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
