import Logout from "@mui/icons-material/Logout"
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import { signOut } from "next-auth/react"
import { UserContext } from "@/context/userContext"
import { FeatureFlag } from "./featureFlag"

const AvatarMenu: React.FC = () => {
  const router = useRouter()
  const { user, loading } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ p: 0 }}
      >
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 7,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box display="flex" p={1} justifyContent="center" alignItems="center">
          <Avatar />
          <Typography ml={1}>{loading ? "...loading" : user?.username}</Typography>
        </Box>
        <Divider />
        <FeatureFlag name="adminDashboardMenuItem">
          <MenuItem onClick={() => router.push("/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin
          </MenuItem>
        </FeatureFlag>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default AvatarMenu
