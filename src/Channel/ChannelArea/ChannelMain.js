/* 컴포넌트 */
// import WorkSpaceCard from '../WorkSpaceElem/WorkSpaceCard';
import * as React from "react";
import { Grid, Card, CardContent, Skeleton, CardMedia } from "@mui/material";
import ChannelCard from "../ChannelElem/ChannelCard";
import ChatBar from "../ChannelElem/ChatBar";
import { useState } from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function ChannelMain({
  channelId,
  chatMessages,
  addMessage,
  spliceMessage,
  getChatData,
  scrollRef,
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="ChannelMainWrap"
      ref={scrollRef}
      style={{ overflow: "auto" }}
    >
      <div className="ChatRoom" style={{ position: "relative" }}>
        <Grid container spacing={0}>
          {chatMessages.map((chatMessage, index) => (
            <Grid item xs={12} sm={12} md={12} key={chatMessage}>
              <ChannelCard
                chatMessage={chatMessage}
                addMessage={addMessage}
                spliceMessage={spliceMessage}
                index={index}
                getChatData={getChatData}
                loading={loading}
                setLoading={setLoading}
              />
            </Grid>
          ))}
          {loading && (
            <Card
              sx={{
                margin: 0,
                backgroundColor: "#9F8170",
                width: "100%",
              }}
            >
              <CardContent style={{ display: "flex" }}>
                <CardContent>
                  <img
                    src="/static/img/bot.png"
                    style={{ width: "50px", height: "40px" }}
                  />
                </CardContent>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    variant="indeterminate"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light" ? "#993300" : "#993300",
                      animationDuration: "2000ms",
                      left: 0,
                      [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "butt",
                      },
                    }}
                    size={60}
                    thickness={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </Grid>
        <ChatBar
          channelId={channelId}
          addMessage={addMessage}
          loading={loading}
          setLoading={setLoading}
        ></ChatBar>
        <div className="dumpChat"></div>
      </div>
    </div>
  );
}

export default ChannelMain;

// <CardMedia
// sx={{ height: 50, width: 50 }}
// image={"/static/img/bot.png"}
// title={"hi"}
// >
// <Skeleton
// animation="wave"
// height={200}
// width={"90%"}
// style={{ left: 30 }}
// />
