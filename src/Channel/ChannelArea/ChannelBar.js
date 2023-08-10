import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom';
// import WorkSpaceMakeChannelDialog from '../WorkSpaceElem/WorkSpaceMakeChannelDialog';

export default function ChannelBar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddChannel = () => {
    setAnchorEl(null);
    setIsDialogOpen(true);
  };

  const GotoBookMark = () => {
    navigate('/bookmark');
  }

  return (
    <>
      <img alt="Remy Sharp" src="/static/img/h1.png" className='logo' />
      <div style={{ flex: 1 }}></div>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        <img alt="Remy Sharp" src="/static/img/menu.png" className="menu" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={GotoBookMark}>북마크 보기</MenuItem>
        <MenuItem onClick={() => navigate("tree")}>History</MenuItem>
      </Menu>
    </>
  );
}