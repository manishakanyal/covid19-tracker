import React from "react"
import { components } from "react-select"

export const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      No results found for "{props.selectProps.inputValue}"
    </components.NoOptionsMessage>
  )
}
