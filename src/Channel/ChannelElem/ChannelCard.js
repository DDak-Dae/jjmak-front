import * as React from "react";
import { CardActionArea, TextField } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  CardMedia,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import SourceFileList from "./SourceFileList";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { DownloadPdf } from "../../services/api";
import uuid from "react-uuid";
import { SendModifyToServer } from "../../services/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand, role }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  display: role === "gpt" ? "inline-block" : "none",
}));

const Modify = styled((props) => {
  const { role, isEditing, ...other } = props;
  return isEditing ? (
    <Button {...other} variant="contained" />
  ) : (
    <Button {...other} variant="outlined" />
  );
})(({ role }) => ({
  marginLeft: "auto",
  display: role === "user" ? "inline-block" : "none",
}));

// sx={{ maxWidth: 345 }}
export default function ChannelCard({
  chatMessage,
  addMessage,
  spliceMessage,
  index,
  getChatData,
}) {
  const [message, setMessage] = React.useState(chatMessage);
  const imageUrl =
    message.role === "user"
      ? "/static/img/choi.png"
      : "/static/img/bot.png";


  const roleHeight =
    message.role === "user"
      ? '50px'
      : '35px';
  const sourceList = message.sourceList || []; // 만약 message.sourceList가 undefined인 경우 빈 배열로 대체
  // const fileUrls = sourceList.map((item) => item[item.length - 1]);
  const role = message.role; // role 변수에 message.role 값 할당

  const [expanded, setExpanded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editMessage, setEditMessage] = React.useState(message.message);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleExpandClick = (event) => {
    event.stopPropagation(); // 이벤트 전파 중단
    setExpanded(!expanded);
  };

  const saveAllFile = async () => {
    const response = await DownloadPdf(selectedImages);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // console.log("이전:", message.message);
    // console.log("이후:", editMessage);
    const editedMessage = {
      message: editMessage,
      role: "user",
      id: uuid(),
    };
    setMessage(editedMessage);
    setIsEditing(false);

    spliceMessage(index + 1);
    const response = await SendModifyToServer(message, editedMessage);
    const sourceList = response.sourceList;
    // console.log(response);

    addMessage({
      id: editedMessage.id,
      message: response.answer,
      role: "gpt",
      sourceList: sourceList,
    }); // 새로운 messageData 전달
    // scrollToBottom(); // 스크롤을 가장 아래로 내리기
    // setMessageData(newMessageData); // 상태 업데이트
  };

  const editEnter = (e) => {
    if (e.shiftKey) {
      return; // Shift + Enter일 때 출력x
    } else if (e.keyCode === 13) {
      e.preventDefault(); // Enter 키 개행x
      handleSaveClick();
    }
  };



  // const test = () => {
  //   // console.log("click card");
  // };

  //데이터 Channel를 거쳐서 RightSideBar까지 보내기
  function CardClick() {
    if (getChatData) {
      getChatData(message);
    }
  }


  const test = () => {
    // console.log("click card");
  };

  // "#E3DAC9" 쓸 수도 있는 거
  return (
    <Card
      sx={{
        margin: 0,
        backgroundColor: role === "gpt" ? "#9F8170" : "#EFDECD",
      }}
    >
      <CardContent sx={{ padding: 0, display: "flex" }}>
        <CardContent>
          <img src={imageUrl} style={{ width: '50px', height: role === 'gpt' ? '40px' : '50px', }} />
        </CardContent>
        <CardActionArea onDoubleClick={CardClick}>
          <CardContent style={{ userSelect: "text" }}>
            {isEditing ? (
              <TextField
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                onKeyDown={editEnter}
                sx={{ width: "100%" }}
              />
            ) : (
              <Typography
                fontSize={26}
                color="black"
                whiteSpace={"pre-wrap"}
                sx={{ fontFamily: 'Black Han Sans' }}
              >
                {message.message}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardContent>
          <ExpandMore
            expand={expanded}
            role={role}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          {isEditing ? (
            <Modify
              role={role}
              id={message.id}
              onClick={handleSaveClick}
              isEditing={isEditing}
            >
              저장
            </Modify>
          ) : (
            <Modify
              role={role}
              id={message.id}
              onClick={handleEditClick}
              isEditing={isEditing}
              style={{ color: 'black', borderColor: 'black' }}
            >
              수정
            </Modify>
          )}
        </CardContent>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SourceFileList sourceList={sourceList} setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
        </CardContent>
        <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={saveAllFile}
            sx={{ fontSize: "12px" }}
            disabled={selectedImages.length === 0}
          >
            저장
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}


// <Card
//       sx={{
//         margin: 0,
//         backgroundColor: role === "gpt" ? "#9E9E9E" : "#ffffff",
//       }}
//     >
//       <CardContent sx={{ padding: 0, display: "flex" }}>
//         <CardContent>
//           <img />
//           <CardMedia
//             sx={{ height: 50, width: 50 }}
//             image={imageUrl}
//             title={"hi"}
//           />
//         </CardContent>
//         <CardActionArea onClick={CardClick}>
//           <CardContent style={{ userSelect: "text" }}>
//             {isEditing ? (
//               <TextField
//                 value={editMessage}
//                 onChange={(e) => setEditMessage(e.target.value)}
//                 onKeyDown={editEnter}
//                 sx={{ width: "100%" }}
//               />
//             ) : (
//               <Typography
//                 fontSize={18}
//                 color="text.secondary"
//                 whiteSpace={"pre-wrap"}
//               >
//                 {message.message}
//               </Typography>
//             )}
//           </CardContent>
//         </CardActionArea>
//         <CardContent>
//           <ExpandMore
//             expand={expanded}
//             role={role}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <ExpandMoreIcon />
//           </ExpandMore>
//           {isEditing ? (
//             <Modify
//               role={role}
//               id={message.id}
//               onClick={handleSaveClick}
//               isEditing={isEditing}
//             >
//               저장
//             </Modify>
//           ) : (
//             <Modify
//               role={role}
//               id={message.id}
//               onClick={handleEditClick}
//               isEditing={isEditing}
//             >
//               수정
//             </Modify>
//           )}
//         </CardContent>
//       </CardContent>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <SourceFileList sourceList={sourceList} setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
//         </CardContent>
//         <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="contained"
//             onClick={saveAllFile}
//             sx={{ fontSize: "12px" }}
//             disabled={selectedImages.length === 0}
//           >
//             저장
//           </Button>
//         </CardContent>
//       </Collapse>
//     </Card>
