import * as React from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SelectedContext } from "../../services/api";

export default function ChatLog({ chatLog, setIsChatOpen, selectedId }) {
  const chatTitle = "< Chat/>";
  const navigate = useNavigate();

  const SelectedId = async () => {
    try {
      const response = await SelectedContext(selectedId);
      // console.log(response);

      navigate(`/channel/${response.channelId}`, {
        state: {
          msgId: selectedId,
        },
      });
    } catch (error) {
      console.error("데이터를 서버로 전송하는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="ChatCardWrap">
      <div className="ChatTitleWrap">
        <div className="ChatTitle">{chatTitle}</div>
        <div style={{ flex: 1 }}></div>
        <div className="ChatClose" onClick={() => setIsChatOpen(false)}>
          X
        </div>
      </div>

      <div className="ChatListWrap" style={{ overflow: "hidden" }}>
        {/* User */}
        <div className="UserChat">
          <img
            src=" /static/img/choi.png"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <div style={{ fontSize: "26px", fontFamily: "Black Han Sans" }}>
            {chatLog.question}
          </div>
        </div>
        {/* bot */}
        <div className="BotChat">
          <img
            src="/static/img/bot.png"
            style={{ width: "50px", height: "40px", marginRight: "10px" }}
          />
          <div style={{ fontSize: "28px", fontFamily: "Black Han Sans" }}>
            {chatLog.answer}
          </div>
        </div>
      </div>
      <div className="ChatCardButtonWrap">
        <Button
          onClick={() => SelectedId()}
          variant="contained"
          sx={{ backgroundColor: "black" }}
        >
          이동
        </Button>
      </div>
    </div>
  );
}

// {/* User */}
// <div
// style={{
//   backgroundColor: "#ffffff",
//   height: "9.375rem",
//   padding: "0.625rem",
//   border: "0.3rem solid #f0f0f0",
//   borderRadius: "1rem",
//   marginBottom: "1rem",
// }}
// >
// <img
//   src="/static/img/test.png"
//   style={{ width: "50px", height: "50px", borderRadius: "0.5rem", overflow: "auto" }}
// />
// <div style={{ padding: "1rem", fontSize: "32px" }}>
//   {chatLog.question}
// </div>
// </div>

// {/* bot */}
// <div
// style={{
//   backgroundColor: "rgba(185, 224, 255, 0.3)",
//   height: "26.125rem",
//   padding: "0.625rem",
//   borderRadius: "1rem",
//   padding: "1rem",
//   overflow: "auto"
// }}
// >
// <img
//   src="/static/img/DocuHero.png"
//   style={{ width: "50px", height: "50px", borderRadius: "0.5rem" }}
// />
// <div style={{ padding: "1rem", fontSize: "32px" }}>
//   {chatLog.answer}
// </div>
// </div>
