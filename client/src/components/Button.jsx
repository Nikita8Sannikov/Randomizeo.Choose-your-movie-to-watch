import React from "react";

const Button = React.memo(({ className, children, onclick, type, disabled, onMouseEnter = () => {}, onMouseLeave = () => {} }) => {
  return (
    <button className={className} onClick={onclick} type={type} disabled={disabled} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;