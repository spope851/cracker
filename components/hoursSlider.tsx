import { FormControl, Typography, Slider } from "@mui/material"
import React from "react"

export const HoursSlider: React.FC<{
  min: [number, (min: number) => void]
  max: [number, (max: number) => void]
}> = ({ min: [min, setMin], max: [max, setMax] }) => {
  return (
    <FormControl sx={{ maxWidth: 150 }}>
      <Typography gutterBottom>min/max hours</Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={[min, max]}
        onChange={(_e, newValue: number | number[]) => {
          setMin((newValue as number[])[0])
          setMax((newValue as number[])[1])
        }}
        valueLabelDisplay="auto"
        max={24}
        marks={[
          { value: 0, label: "0" },
          { value: 24, label: "24" },
        ]}
      />
    </FormControl>
  )
}
