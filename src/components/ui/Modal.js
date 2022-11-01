export default function Modal({ onClose, children, className }) {
  return (
    <>
      <div className={`fixed inset-0 z-10 overflow-y-auto transition-all ${className}`}>
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={onClose}></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-3/4 max-w-lg p-3 mx-auto bg-white border rounded-xl shadow-lg">
            <div className="p-3 mx-auto text-center bg-bgrey rounded-xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
