/* 라이브러리 */
import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
/* 파일 */
/* 컴포넌트 */
import { SendFilesToServer } from "../../services/api";

function DragAndDrop({
  channelId,
  files,
  setFiles,
  isUploading,
  setIsUploading,
}) {
  const dragdropTitle = "< Drag & Drop/>"

  return (
    <div className="DragWrapper">
      <div className="dragdropTitle">{dragdropTitle}</div>
      <Dropzone
        onDrop={async (droppedFiles) => {
          setIsUploading(true);
          await SendFilesToServer(droppedFiles, channelId, files, setFiles);
          setIsUploading(false);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropContainerWrapper">
            <div className="dropContainer">
              <div {...getRootProps()} style={{}}>
                <input {...getInputProps()} />
                <p>파일 업로드</p>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default DragAndDrop;