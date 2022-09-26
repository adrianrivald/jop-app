import Balanced from "../balanced";
import MandorWeighing from "./mandor";


function Weighing () {
  const role = JSON.parse(localStorage.getItem('userData'))?.level

  return (
        role === "mandor" ? 
        <MandorWeighing /> : <Balanced />
  )
}

export default Weighing;