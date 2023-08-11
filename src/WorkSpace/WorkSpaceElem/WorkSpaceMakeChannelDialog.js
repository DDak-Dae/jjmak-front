import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateChannel } from '../../services/api';
import Dropzone from 'react-dropzone';



export default function WorkSpaceMakeChannelDialog({ open, setOpen }) {
  const navigate = useNavigate()

  const [channelId, setChannelChannelId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const offValue = () => {
    setOpen(false); // 모달을 닫기 위해 setOpen을 false로 설정
  };

  const sendChannelData = async () => {
    const response = await CreateChannel(selectedFile, channelId, description)
    if (response.result === "success") {
      /* 새로고침 */
      window.location.reload();
    } else {
      // console.log(response.message)
    }
  }


  return (
    <div>
      <Dialog open={open} onClose={offValue}>
        <DialogTitle>새 페이지 생성</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="channelId"
            label="Page name"
            type="email"
            fullWidth
            variant="standard"
            value={channelId} // channelName 상태를 TextField의 값으로 설정
            onChange={(e) => setChannelChannelId(e.target.value)} // 입력된 값을 channelName 상태로 업데이트
          />
          <TextField
            autoFocus
            margin="dense"
            id="Description"
            label="Description"
            type="email"
            fullWidth
            variant="standard"
            value={description} // description 상태를 TextField의 값으로 설정
            onChange={(e) => setDescription(e.target.value)} // 입력된 값을 description 상태로 업데이트
          />
          <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                {selectedFile ? (
                  <div>
                    <p>선택된 이미지: {selectedFile.name}</p>
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '100%' }} />
                  </div>
                ) : (
                  <p>여기에 이미지를 드래그 앤 드롭하세요.</p>
                )}
              </div>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={sendChannelData}>페이지 생성</Button>
          <Button onClick={offValue}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
