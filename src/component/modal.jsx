import "../App.css"
import { createPortal } from "react-dom"
import {useState, useEffect} from "react"
import PropTypes from "prop-types";
const modalRoot=document.querySelector("#modal-root")
export const Modal=({func,img})=>  {
  useEffect(() => {
    window.addEventListener("keydown", hendelEscdown)
    return () => {
      window.removeEventListener("click", hendelEscdown)
    }
  }, [])
  
  
  
  const hendelEscdown = (e) => {
    if (e.code === "Escape") {
      func();
    }
  }
  const hendleBackDrope = (e) => {
   if (e.currentTarget === e.target) {
        func();
      }
  }
 
      return createPortal(<div className="Overlay" onClick={hendleBackDrope}>
        <div className="Modal">
            
    <img src={img} alt="img" />
  </div>
</div>,modalRoot)
    
}

Modal.propTypes = {
  func: PropTypes.func.isRequired,
  img:PropTypes.string.isRequired,
};