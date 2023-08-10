import { Textarea } from "@mui/joy";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { SendMessageToServer } from "../../services/api";

function ChatBar({ channelId, addMessage, loading, setLoading }) {
  const [messageData, setMessageData] = useState({ message: "", role: "user" });

  const [i, setI] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clickSendButton = () => {
    if (messageData.message === "") {
      return;
    }
    setLoading(true);
    console.log(messageData);
    addMessage(messageData);
    setMessageData({ message: "", role: "user" }); // 메시지 전송 후 입력 필드 초기화
    sendMessage(messageData);
  };

  const sendMessage = async (query) => {
    const response = await SendMessageToServer(channelId, query);
    const sourceList = response.sourceList;
    console.log(sourceList);

    addMessage({
      id: query.id,
      message: response.answer,
      role: "gpt",
      sourceList: sourceList,
    });
    // addMessage({ message: "디~~~~버~~~~깅~~~~용" + i, role: 'gpt' }); // 새로운 messageData 전달
    setI(i + 1);
    setLoading(false);
  };

  /**************TextFiled 기능*****************/

  const TextFieldInit = (e) => {
    if (e.shiftKey) {
      return; // Shift + Enter일 때 출력x
    } else if (e.keyCode === 13 && !loading) {
      e.preventDefault(); // Enter 키 개행x
      clickSendButton();
    }
  };

  return (
    <div
      className="CharBarWarp"
      style={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
        zIndex: "1000",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          name="message" // name 속성을 추가하여 이벤트 핸들러에서 식별 가능하도록 함
          label="메시지 입력"
          variant="outlined"
          size="small"
          multiline
          maxRows={4}
          minRows={1}
          value={messageData.message}
          onChange={handleInputChange}
          sx={{ flex: "1", marginRight: "8px" }}
          onKeyDown={TextFieldInit}
          InputProps={{
            endAdornment: (
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={clickSendButton}
                loading={loading}
              >
                전송
              </LoadingButton>
            ),
          }}
        />
      </Box>
    </div>
  );
}

export default ChatBar;