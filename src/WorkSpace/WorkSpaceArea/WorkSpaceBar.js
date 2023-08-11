import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import WorkSpaceMakeChannelDialog from '../WorkSpaceElem/WorkSpaceMakeChannelDialog';
import { Initialize } from '../../services/api';

export default function WorkSpaceBar() {
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
        <MenuItem onClick={handleAddChannel}>새 페이지 생성</MenuItem>
        <MenuItem onClick={Initialize}>초기화</MenuItem>
      </Menu>
      <WorkSpaceMakeChannelDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}

// <div className="logo" style={{ flex: '1' }}><img alt="Remy Sharp" src="/static/img/h1.png" style={{ width: '130px', height: 'auto', marginLeft: '25px' }} /></div>
//         <div className="menu" style={{ flex: '0 0 auto' }}><WorkSpaceBar /></div>

// <Button
//         id="basic-button"
//         aria-controls={anchorEl ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={anchorEl ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         <img alt="Remy Sharp" src="/static/img/menu.png" style={{ width: '28px', height: '28px', marginRight: '15px' }} />
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleAddChannel}>새 채널 생성</MenuItem>
//       </Menu>

//       <WorkSpaceMakeChannelDialog open={isDialogOpen} setOpen={setIsDialogOpen} />