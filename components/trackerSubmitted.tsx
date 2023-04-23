import React, { useContext, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import { UserContext } from "@/context/userContext"
import { UPDATE_TRACKER_MUTATION } from "@/graphql/client/track/updateTrackerMutation"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TrackerSubmitted: React.FC = () => {
  const { lastPost, refetch } = useContext(UserContext)
  const session = useSession()
  const router = useRouter()

  const { overview, numberCreativeHours, rating, id } = lastPost!
  const [updateTracker, { data: _data, loading }] = useMutation(
    UPDATE_TRACKER_MUTATION
  )

  const [updatedOverview, setOverview] = useState(overview)
  const [updatedNumberCreativeHours, setNumberCreativeHours] =
    useState(numberCreativeHours)
  const [updatedRating, setRating] = useState(rating)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack mx={'auto'} py={5} spacing={7} textAlign={'center'}>
      <Typography sx={{textDecoration: 'underline'}} variant="h4">Your data for: {lastPost?.createdAt} </Typography>

      <Stack sx={{maxWidth: 360, bgcolor: 'primary.main', color: '#fff', borderRadius: '15px', p: 4}} alignItems='center' spacing={4}>
      <Typography sx={{textDecoration: 'underline'}}>Overview:</Typography>
        {overview}
      <Typography sx={{textDecoration: 'underline'}}>Number of creative hours:</Typography>
        {numberCreativeHours}
      <Typography sx={{textDecoration: 'underline'}}>Rating:</Typography>
        {rating}
        
    </Stack>
      <Button onClick={handleOpen}>Update Data</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form style={{ display: "flex", flexDirection: "column" }}>
      <FormControl sx={{ width: "100%", alignSelf: "center", mb: 5 }}>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => setOverview(e.target.value)}
          defaultValue={overview}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (updatedOverview?.length || 0)
        } }`}</Typography>
      </FormControl>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel>number creative hours</FormLabel>
        <Input
          defaultValue={numberCreativeHours}
          type="number"
          inputProps={{ min: 0, max: 24, step: 0.5 }}
          onChange={(e) => setNumberCreativeHours(Number(e.target.value))}
        />
      </FormControl>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel>rating</FormLabel>
        <Box display="flex" alignItems="center">
          {rating > 0 && "+"}
          <Input
            fullWidth
            defaultValue={rating}
            type="number"
            inputProps={{ min: -2, max: 2 }}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </Box>
      </FormControl>
      <FormControl>
        <Button
          variant="outlined"
          disabled={!updatedOverview}
          onClick={() => {
            updateTracker({
              variables: {
                tracker: {
                  user: session.data?.user.id || "",
                  numberCreativeHours: updatedNumberCreativeHours,
                  overview: updatedOverview,
                  rating: updatedRating,
                  id,
                },
              },
            })
              .then(() => refetch({ refetch: true }))
              .finally(() => router.push("/track"))
          }}
        >
          {loading ? "...processing" : "submit"}
        </Button>
      </FormControl>
    </form>
        </Box>
      </Modal>

    </Stack>
  )
  
}

export default TrackerSubmitted