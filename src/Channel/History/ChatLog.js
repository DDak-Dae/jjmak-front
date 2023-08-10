import * as React from "react";
import { Button } from "@mui/material";

export default function ChatLog({ chatLog, setIsChatOpen }) {
  const chatTitle = "< Chat/>"

  return (
    <div className="ChatCardWrap" >
      <div className="ChatTitleWrap">
        <div className="ChatTitle">{chatTitle}</div>
        <div style={{ flex: 1 }}></div>
        <div
          className="ChatClose"
          onClick={() => setIsChatOpen(false)}
        >
          X
        </div>
      </div>

      <div className="ChatListWrap">

        {/* User */}
        <div className="UserChat">
          <img
            src=" /static/img/choi.png"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <div style={{ fontSize: "26px", fontFamily: 'Black Han Sans' }}>
            {chatLog.question}
          </div>
        </div>
        {/* bot */}
        <div className="BotChat"
        >
          <img
            src="/static/img/bot.png"
            style={{ width: "50px", height: "40px", marginRight: '10px' }}
          />
          <div style={{ fontSize: "28px", fontFamily: 'Black Han Sans' }}>
            {chatLog.answer}
          </div>
        </div>
      </div>
      <div className="ChatCardButtonWrap">
        <Button
          onClick={() => setIsChatOpen(false)}
          variant="contained"
          sx={{ backgroundColor: 'black' }}
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