import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

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
        <Button onClick={toggleVisiblity}>{props.buttonText}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisiblity}>cancel</Button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  ButtonText: PropTypes.string.isRequired
}
Toggleable.displayName = "Toggleable"

export default Toggleable