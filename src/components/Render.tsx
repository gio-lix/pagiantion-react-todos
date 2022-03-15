import {FC} from "react"
import {TypeProps} from "../type/types";

interface IRender {
    items: TypeProps
}
const Render: FC<IRender> = ({items}) => {
  return (
     <div className='text-center'>
         <ul>
             <li>
                 {items.title}
             </li>
         </ul>
     </div>
  )
}
export default Render