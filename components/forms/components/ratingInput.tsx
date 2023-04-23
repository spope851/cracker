import { InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import React from "react"

export const RatingInput: React.FC<{
  label: string
  value?: number | ""
  onChange: SelectProps<number | "">["onChange"]
}> = ({ label, value, onChange }) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange}>
      <MenuItem value={-2}>-2</MenuItem>
      <MenuItem value={-1}>-1</MenuItem>
      <MenuItem value={0}>0</MenuItem>
      <MenuItem value={1}>+1</MenuItem>
      <MenuItem value={2}>+2</MenuItem>
    </Select>
  </>
)
