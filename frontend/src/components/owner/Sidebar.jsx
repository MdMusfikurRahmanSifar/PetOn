import React, {useState} from 'react'
import { dummyUserData } from '../../assets/assets'
import { useLocation } from 'react-router-dom'


const Sidebar = () => {
    const user = dummyUserData;
    const location = useLocation();
    const [image, setimage] = useState('')

    


  return (
    <div>Sidebar</div>
  )
}

export default Sidebar