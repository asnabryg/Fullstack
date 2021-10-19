import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisiblity }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonText: PropTypes.string.isRequired
}
Toggleable.displayName = "Toggleable"

export default Toggleable