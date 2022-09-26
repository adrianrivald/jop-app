import Mabes from "./mabes";
import Mandor from "./mandor";

function Assignment () {
  const role = JSON.parse(localStorage.getItem('userData'))?.level

  return (
        role === "mandor" ? 
        <Mandor /> : <Mabes />
  )
}

export default Assignment;