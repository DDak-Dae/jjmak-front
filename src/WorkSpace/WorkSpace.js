import { useNavigate } from "react-router-dom";
import "../Styles/WorkSpace.css";
import LeftSideBar from "./WorkSpaceArea/LeftSideBar";
import RightSideBar from "./WorkSpaceArea/RightSideBar";
import WorkSpaceMain from "./WorkSpaceArea/WorkSpaceMain";
import WorkSpaceBar from "./WorkSpaceArea/WorkSpaceBar";
import React, { useState, useEffect } from "react";
import { CheckToken } from "../services/api";
import { GetWorkSpaceData } from "../services/api";

/* 컴포넌트 */
function WorkSpace() {
  /* 저장된 채널 정보들 */
  const [workspaceDataList, setWorkspaceDataList] = useState([]);
  const [wordCloudList, setWordCloudList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [clickedChannelId, setClickedChannelId] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  /* 보여질 채널 리스트 */
  const [showChannelList, setShowChannelList] = useState([]);
  /* 위에 달릴 체크 리스트 */
  const [clickTagList, setClickTagList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    checkTokenAndNavigate();
    getWorkSapceData();
    console.log("clickTagList", clickTagList);
  }, []);

  /* clickTagList가 변화 할 때마다 showChannelList 갱신 */
  useEffect(() => {
    if (clickTagList.length === 0) {
      setShowChannelList(workspaceDataList);
    } else {
      const filteredChannels = workspaceDataList.filter((workspaceData) =>
        clickTagList.some((clickTag) =>
          workspaceData.wordCloud
            .slice(0, 3)
            .some((cloudWord) => cloudWord === clickTag)
        )
      );

      setShowChannelList(filteredChannels);
    }
  }, [clickTagList]);

  /* Token 확인 */
  const checkTokenAndNavigate = async () => {
    const response = await CheckToken();
    if (response === "success") {
    } else {
      navigate("/");
    }
  };

  /* 페이지를 불러올 때 workspace정보도 가져옴 */
  const getWorkSapceData = async () => {
    const response = await GetWorkSpaceData();

    if (response.result === "success") {
      setWorkspaceDataList(response.channelInfoList);
      setShowChannelList(response.channelInfoList);

      console.log(workspaceDataList);
      const dummyList = new Set();
      response.channelInfoList.forEach((channelInfo) => {
        channelInfo.wordCloud.slice(0, 3).forEach((word) => {
          dummyList.add(word);
        });
      });
      setTagList(Array.from(dummyList));
    } else {
      console.log("fail");
    }
  };

  /* WordCloud를 설정하는 함수 */
  const getWordCloud = (channelId) => {
    setClickedChannelId(channelId);
    const channel = workspaceDataList.find(
      (item) => item.channelId === channelId
    ); // Find the channel with matching channelId
    setWordCloudList(channel ? channel.wordCloud : []);
    console.log("wordCloudList");
  };

  const totalSize = (channelId) => {
    let channel = workspaceDataList.find(
      (item) => item.channelId === channelId
    ); // Find the channel with matching channelId
    console.log(channel);
    setFileSize(channel ? channel.totalSize : []);
  };

  return (
    <div className="workspaceWrap">
      <div className="workspaceUpperBar">
        <WorkSpaceBar />
      </div>
      <div className="workspaceElemWrap">
        <LeftSideBar
          workspaceDataList={workspaceDataList}
          tagList={tagList}
          setTagList={setTagList}
          setClickTagList={setClickTagList}
          showChannelList={showChannelList}
          setShowChannelList={setShowChannelList}
        />
        <WorkSpaceMain
          showChannelList={showChannelList}
          getWordCloud={getWordCloud}
          clickTagList={clickTagList}
          setClickTagList={setClickTagList}
          setTagList={setTagList}
          totalSize={totalSize}
        />
        <RightSideBar wordCloudList={wordCloudList} fileSize={fileSize} />
      </div>
    </div>
  );
}

export default WorkSpace;

// <div className="workspaceWrap">
//       <div className="workspaceUpperBar">
//         <div className="logo" style={{ flex: '1' }}><img alt="Remy Sharp" src="/static/img/h1.png" style={{ width: '130px', height: 'auto', marginLeft: '25px' }} /></div>
//         <div className="menu" style={{ flex: '0 0 auto' }}><WorkSpaceBar /></div>

//       </div>
//       <div className="workspaceElemWrap">
//         <div className="leftSideBarWrap">
//           <LeftSideBar
//             workspaceDataList={workspaceDataList}
//             tagList={tagList}
//             setTagList={setTagList}
//             setClickTagList={setClickTagList}
//             showChannelList={showChannelList}
//             setShowChannelList={setShowChannelList} />
//         </div>
//         <div className="workSpaceMainWrap">
//           <WorkSpaceMain
//             showChannelList={showChannelList}
//             getWordCloud={getWordCloud}
//             clickTagList={clickTagList}
//             setClickTagList={setClickTagList}
//             setTagList={setTagList} />
//         </div>
//         <div className="rightSideBarWrap">
//           <RightSideBar wordCloudList={wordCloudList} />
//         </div>
//       </div>
//     </div>
