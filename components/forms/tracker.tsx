import React from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"

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
}) => (
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
            onChange={(e) => numberCreativeHours.setter(Number(e.target.value))}
          />
        </FormControl>
      </Grid>
      <Grid container item md={6}>
        <FormControl fullWidth>
          <TextField
            label="rating"
            defaultValue={rating.value}
            type="number"
            inputProps={{ min: -2, max: 2 }}
            onChange={(e) => rating.setter(Number(e.target.value))}
          />
        </FormControl>
      </Grid>
    </Grid>
    <FormControl>
      <Button variant="outlined" disabled={!overview.value} onClick={onSubmit}>
        {loading ? "...processing" : "submit"}
      </Button>
    </FormControl>
  </Grid>
)
