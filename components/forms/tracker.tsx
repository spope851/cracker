import React, { useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"
import { RatingInput } from "./components"

type StateVar<T> = {
  value: T
  setter: (val: T) => void
}

type TrackerProps = {
  overview: StateVar<string | undefined>
  numberCreativeHours: StateVar<number>
  rating: StateVar<number>
  loading: boolean
  onSubmit: () => void
}

export const Tracker: React.FC<TrackerProps> = ({
  overview,
  numberCreativeHours,
  rating,
  loading,
  onSubmit,
}) => {
  const [hoursInvalid, setHoursInvalid] = useState(false)
  return (
    <Grid container item flexDirection="column" rowGap={5} md={4} sm={8} xs={11}>
      <FormControl>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          defaultValue={overview.value}
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => overview.setter(e.target.value)}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (overview.value?.length || 0)
        } }`}</Typography>
      </FormControl>
      <Grid container columnSpacing={5}>
        <Grid container item md={6} mb={{ md: 0, sm: 5, xs: 5 }}>
          <FormControl fullWidth>
            <TextField
              label="number creative hours"
              defaultValue={numberCreativeHours.value}
              type="number"
              inputProps={{ min: 0, max: 24, step: 0.5 }}
              onChange={(e) => {
                const input = Number(e.target.value)
                setHoursInvalid(input >= 24 || input < 0)
                numberCreativeHours.setter(input)
              }}
              error={hoursInvalid}
            />
          </FormControl>
        </Grid>
        <Grid container item md={6}>
          <FormControl fullWidth>
            <RatingInput
              label="rating"
              value={rating.value}
              onChange={(e) => rating.setter(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl>
        <Button
          variant="outlined"
          disabled={!overview.value || hoursInvalid}
          onClick={onSubmit}
        >
          {loading ? "...processing" : "submit"}
        </Button>
      </FormControl>
    </Grid>
  )
}
