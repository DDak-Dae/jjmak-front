import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";

export default function LeftBarProfile() {
  const profileTitle = "< Profile/>"
  return (
    <div className="leftBarProfile" >
      <div className="ProfileTitle">{profileTitle}</div>
      <div className="ProfileWrap">
        <div className="Profile">
          <Avatar alt="Remy Sharp" src="/static/img/choi.png" style={{ width: '80px', height: '80px' }} />
          <Typography gutterBottom variant="h6" component="div" sx={{ marginLeft: '13px', fontWeight: 'bold', fontSize: '30px' }} noWrap>
            choi
          </Typography>
        </div>

      </div>

    </div>
  );
}

// <img className="ProfileTitle" src="/static/img/Profile.png" alt="Description" />
