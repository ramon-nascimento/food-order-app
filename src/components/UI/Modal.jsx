import ReactDOM from 'react-dom'
import React, { Fragment } from 'react'

import classes from './Modal.module.css'

const portalElement = document.getElementById('overlays')

export function Modal({ children, onClose }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />, 
        portalElement
      )}
      
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

function Backdrop({ onClose }) {
  return (
    <div className={classes.backdrop} onClick={onClose}></div>
  )
}

function ModalOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}