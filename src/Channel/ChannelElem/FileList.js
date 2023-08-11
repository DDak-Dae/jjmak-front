import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/joy/CircularProgress";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

// const listStyle = {
//   backgroundColor: isUploading ? "#888888" : "#ffffff",
//   border: "1px solid black",
//   width: '230px',
//   height: '400px'
// };

export default function FileList({ files, setFiles, channelId, isUploading }) {
  // const listStyle = {
  //   backgroundColor: isUploading ? "#888888" : "#ffffff",
  //   border: "1px solid black",
  //   width: '230px',
  //   height: '400px'
  // };
  const fileListTitle = "< FileList/>";

  return (
    <div className="fileListWrapper">
      <div className="fileListTitle">{fileListTitle}</div>
      <div className="inFileListWrapper">
        <List className="fileList" dense={true}>
          {files.map((file, index) => (
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              style={{
                borderBottom: "2px solid black",
                Top: "0",
                paddingTop: "0",
                paddingBottom: "0",
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={file.fileName}
                style={{ overflow: "hidden" }}
              />
            </ListItem>
          ))}
          {isUploading && (
            <div className="progressContainer">
              <CircularProgress className="fileListProgress" />
            </div>
          )}
        </List>
      </div>
    </div>
  );
}
// {isUploading && (
//   <CircularProgress className="fileListProgress"
//     color="#9F8170"
//   />
// )}
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// // // import csv from "../img/fileicon/csv.png";
// // // import doc from "../img/fileicon/doc.png";
// // // import docx from "../img/fileicon/docx.png";
// // // import enex from "../img/fileicon/enex.png";
// // // import eml from "../img/fileicon/eml.png";
// // // import epub from "../img/fileicon/epub.png";
// // // import html from "../img/fileicon/html.png";
// // // import md from "../img/fileicon/md.png";
// // // import odt from "../img/fileicon/odt.png";
// // // import pdf from "../img/fileicon/pdf.png";
// // // import ppt from "../img/fileicon/ppt.png";
// // // import pptx from "../img/fileicon/pptx.png";
// // // import txt from "../img/fileicon/txt.png";
// // // import def from "../img/fileicon/default.png";
// // // import { csv, doc, docx, enex, eml, epub, html, md, odt, pdf, ppt, pptx, txt, def } from "../../../public/static/img/fileicon"
// import { CardMedia } from '@mui/material';

// // const bull = (
// //   <Box
// //     component="span"
// //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
// //   >
// //     •
// //   </Box>
// // );

// export default function FileCard({ file, files, setFiles, index, channelId }) {
//   const fileExtension = file.fileName.split('.').pop().toLowerCase();

//   // 확장자에 따른 이미지 경로 설정
//   const imageUrl = `/static/img/fileicon/${fileExtension}.png`; // 기본 이미지 경로

//   return (
//     <Card sx={{ width: "100%", height: "100%", display: "flex" }}>
//       <CardContent sx={{ alignContent: "center" }}>
//         <CardMedia
//           sx={{ width: "32px", height: "32px" }}
//           image={imageUrl}
//           title="green iguana"
//         />
//       </CardContent>
//       <CardContent>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           {file.fileName}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

// // // const FileImg = styled.div`
// // //   width: 4rem;
// // //   height: 4rem;
// // //   border-radius: 0.5rem;
// // //   font-size: 25px;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   border-radius: 10px;
// // //   background-color: #9e9e9e;
// // //   background-image: ${(props) => {
// // //     switch (props.type) {
// // //       case "csv":
// // //         return `url(${csv})`;
// // //       case "doc":
// // //         return `url(${doc})`;
// // //       case "docx":
// // //         return `url(${docx})`;
// // //       case "enex":
// // //         return `url(${enex})`;
// // //       case "eml":
// // //         return `url(${eml})`;
// // //       case "epub":
// // //         return `url(${epub})`;
// // //       case "html":
// // //         return `url(${html})`;
// // //       case "md":
// // //         return `url(${md})`;
// // //       case "odt":
// // //         return `url(${odt})`;
// // //       case "pdf":
// // //         return `url(${pdf})`;
// // //       case "ppt":
// // //         return `url(${ppt})`;
// // //       case "pptx":
// // //         return `url(${pptx})`;
// // //       case "txt":
// // //         return `url(${txt})`;
// // //       default:
// // //         return `url(${def})`;
// // //     }
// // //   }};
// // // `;

// // // import styled from "styled-components";

// // // function FileCard({ file, files, setFiles, index, chatingName }) {
// // //   // // console.log(file.fileName.split(".").pop());
// // //   return (
// // //     <div className="file">
// // //       <FileImg type={(file.fileName || "").split(".").pop()} />
// // //       <div className="fileName">{file.fileName}</div>
// // //       <div
// // //         className="fileDeletBtn"
// // //       ></div>
// // //     </div>
// // //   );
// // // }

// // // const FileImg = styled.div`
// // //   width: 4rem;
// // //   height: 4rem;
// // //   border-radius: 0.5rem;
// // //   font-size: 25px;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   border-radius: 10px;
// // //   background-color: #9e9e9e;
// // // `;

// // // export default FileCard;
