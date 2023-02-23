import React from 'react';
import SvgButtons from '../BootstrapIcons/SvgButtons.jsx';

import '../styles//Modal.css';

function Modal({ title, children, show, onClose }) {
    const display = show ? 'block' : 'none';

    console.log(children);

    return (
        <div className="modal" style={{ display }}>

            <div className="modal-window">
                <div className="modal-title-area">
                    <span id="modal-title">{title}</span>

                    <div id="close-icon" className="buttonSvg" onClick={onClose}>
                        {SvgButtons.bi_x_square}
                    </div>
                </div>
                <div className="modal-content">
                    {children}
                </div>


            </div>
        </div>
    );
};

export default Modal;
