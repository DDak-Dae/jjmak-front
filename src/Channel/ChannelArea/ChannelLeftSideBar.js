/* 컴포넌트 */
import DragAndDrop from "../ChannelElem/DragAndDrop";
import { Grid } from "@mui/material";

import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import FileList from "../ChannelElem/FileList";
import { CircularProgress } from "@mui/material";
import { Divider } from "@mui/material";

import { useState } from "react";

function ChannelLeftSideBar({ channelId, files, setFiles }) {
  const [isUploading, setIsUploading] = useState(false);

  // console.log(files);
  return (
    <div className="ChannelLeftSideBarWrap">
      <DragAndDrop
        channelId={channelId}
        files={files}
        setFiles={setFiles}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
      <Divider className="divider" />
      <FileList
        files={files}
        setFiles={setFiles}
        channelId={channelId}
        isUploading={isUploading}
      />
    </div>
  );
}

export default ChannelLeftSideBar;

// <FileCard
//             file={file}
//             files={files}
//             setFiles={setFiles}
//             index={index}
//             channelId={channelId}
//           />
