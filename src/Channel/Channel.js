// import '../Styles/Main.css'
// import { Files } from '../Components/Files.js'
// import AutoGridNoWrap from '../Components/ChatCards.js'
// import TextArea from '../Components/TextArea.js'
// import MsgSendBtn from '../Components/MsgSendBtn.js'
// import ChannelBookMark from '../Components/ChannelBookMark.js'
// import ChannelBookMarkBtn from '../Components/ChannelBookMarkBtn.js'
import "../Styles/Channel.css";
import { useLocation, useParams } from "react-router-dom";
import ChannelBar from "./ChannelArea/ChannelBar";
import ChannelRightSideBar from "./ChannelArea/ChannelRightSideBar";
import ChannelLeftSideBar from "./ChannelArea/ChannelLeftSideBar";
import ChannelMain from "./ChannelArea/ChannelMain";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { GetChannelData, SendBookMarkData } from "../services/api";
import { useRef } from "react";
import uuid from "react-uuid";

function Channel() {
  const location = useLocation();
  const [msgId, setMsgId] = useState(null);
  const { channelId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookMarkChatData, setBookMarkChatData] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    if (loading) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  // 메시지 추가 함수
  const addMessage = (message) => {
    if (!message.id) {
      message.id = uuid();
    }
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const spliceMessage = (index) => {
    const chatsCopy = [...chatMessages];
    console.log(chatsCopy);
    chatsCopy.splice(index);
    console.log(chatsCopy);

    setChatMessages(chatsCopy);
  };

  useEffect(() => {
    getChannelData();
  }, []);

  const getChannelData = async () => {
    // if(location.state.msgId){
    //   setMsgId(location.state.msgId)
    // }
    // console.log(location.state.msgId);
    const response = await GetChannelData(channelId, location?.state?.msgId);

    if (response.result === "success") {
      console.log(response.messageList);
      setFiles(response.fileList);
      setChatMessages(response.messageList)
      // console.log("getWorkSpaceDate success")
      // console.log(response.channelInfoList)
      setLoading(true)
    } else {
      console.log("fail");
    }
  };

  const getChatData = (chatData) => {
    // console.log(bookMarkChatData);
    // chatData가 이전 bookMarkChatData에 이미 있는지 검사합니다.
    const isDataExist = bookMarkChatData.some(data => data.message === chatData.message && data.role === chatData.role);

    // 중복되지 않은 경우에만 chatData를 추가합니다.
    if (!isDataExist) {
      setBookMarkChatData((prevChatData) => [...prevChatData, chatData]);
    }
  }

  //북마크에서 데이터 빼기
  const removeBookMarkData = (chatDataToRemove) => {
    // bookMarkChatData 배열에서 chatDataToRemove와 일치하지 않는 요소들로 새로운 배열 생성
    const updatedBookMarkChatData = bookMarkChatData.filter(
      (chatData) =>
        chatData.message !== chatDataToRemove.message ||
        chatData.role !== chatDataToRemove.role
    );
    // 새로운 배열로 bookMarkChatData 상태 업데이트
    setBookMarkChatData(updatedBookMarkChatData);
    console.log(chatDataToRemove);
  };

  //북마크 추가 버튼누르고 서버에 데이터 보내기
  const sendBookMarkData = async (bookMarkName, bookMarkPhotoFile, setIsModalOpen) => {
    // console.log(bookMarkName);
    // console.log(bookMarkPhotoFile);
    // console.log(bookMarkChatData);

    const formData = new FormData();

    if (bookMarkPhotoFile) {
      formData.append('bookMarkPhoto', bookMarkPhotoFile);
    }
    formData.append('bookMarkName', bookMarkName);
    formData.append('bookMarkChatData', JSON.stringify(bookMarkChatData));

    const response = await SendBookMarkData(formData, bookMarkChatData);
    // console.log(response);
    setBookMarkChatData([]);
  }

  // console.log(channelId);
  return (

    <div className="ChannelWrap">
      <div className="ChannelUpperBar">
        <ChannelBar />
      </div>
      <div className="ChannelElemWrap">
        <ChannelLeftSideBar
          channelId={channelId}
          files={files}
          setFiles={setFiles}
        />
        <ChannelMain
          channelId={channelId}
          chatMessages={chatMessages}
          addMessage={addMessage}
          spliceMessage={spliceMessage}
          getChatData={getChatData}
          scrollRef={scrollRef}
        />
        <ChannelRightSideBar
          bookMarkChatData={bookMarkChatData}
          removeBookMarkData={removeBookMarkData}
          sendBookMarkData={sendBookMarkData} />
      </div>
    </div>
  );
}

export default Channel;



// (
//   loading ? (
//     <div className="ChannelWrap">
//       <div className="ChannelUpperBar">
//         <ChannelBar />
//       </div>
//       <div className="ChannelElemWrap">
//         <ChannelLeftSideBar
//           channelId={channelId}
//           files={files}
//           setFiles={setFiles}
//         />
//         <ChannelMain
//           channelId={channelId}
//           chatMessages={chatMessages}
//           addMessage={addMessage}
//           spliceMessage={spliceMessage}
//           getChatData={getChatData}
//           scrollRef={scrollRef}
//         />
//         <ChannelRightSideBar
//           bookMarkChatData={bookMarkChatData}
//           removeBookMarkData={removeBookMarkData}
//           sendBookMarkData={sendBookMarkData} />
//       </div>
//     </div>
//   ) : (
//     <>
//       로딩중
//     </>
//   )
// );

