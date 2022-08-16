import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


/**
 * 
 * @param {Boolean} initState `true` if omitted
 * @returns {[relocated:Boolean, isRelocated:Function, setRelocated:Function]}
 * - `relocated` - current state - `true` if location was changed otherwise `false`.
 * - `isRelocated ()` - function returning current state and than setting it to `false`.
 * - `setRelocated (newState)` - function changing current state
 */
const useRelocation = (initState = true) => {

  const {pathname} = useLocation();
  
  const [relocated, setRelocated] = useState(initState)
  
  useEffect(() => setRelocated(true),[pathname])
  
  const isRelocated = () => { if (relocated) {
    setRelocated(false)
    return true
  } else {
    return false
  }}

  return [relocated, isRelocated, setRelocated]
}

export default useRelocation
