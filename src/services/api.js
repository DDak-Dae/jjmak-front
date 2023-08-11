import axios from "axios";
import { GetTokenFromCookie, StoreTokenInCookie } from "../Auth/token";

const SERVERURL = "http://localhost:5002";

/* Login을 하면 토큰을 받아오는 함수 
  토큰에는 openai api키와 username이 담겨있음
*/
export async function LoginApi({ userId, password }) {
  const data = {
    userId: userId,
    password: password,
  };
  try {
    const response = await axios.post(SERVERURL + "/api/login", data);
    if (response.data.result === "success") {
      StoreTokenInCookie(response.data.token);
    }
    return response.data;
  } catch (error) {
    // console.log("로그인 실패!", error);
  }
}

/* 회원가입 */
export async function JoinApi({ userId, password, openaiKey }) {
  const data = {
    userId: userId,
    password: password,
    openaiKey: openaiKey
  }
  try {
    const response = await axios.post(SERVERURL + '/api/join', data);
    // if (response.data.result === "success") {
    //   window.location.reload();
    // }
    return response.data;
  } catch (error) {
    // console.log("회원가입 실패!", error);
  }

}

/* 토큰의 유효성을 확인해 주는 함수 */
export async function CheckToken() {
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(SERVERURL + "/api/token", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("토큰이 유효합니다.");
    return response.data.result;
  } catch (error) {
    // console.log("토큰이 유효하지 않습니다.", error);
  }
}

/* 워크 스페이스 생성에 필요한 정보 담아오기 */
export async function GetWorkSpaceData() {
  const token = GetTokenFromCookie("token");
  try {
    const response = await axios.get(SERVERURL + "/api/getWorkspaceData", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = response.data;
    // // console.log(res)
    return response.data;
    /* 에러 확인용 */
  } catch (error) {
    // console.log("GetWorkSpaceWhenLogin 에러", error);
  }
}

/* 채널을 생성하기 */
export async function CreateChannel(imgFile, channelId, description) {
  const token = GetTokenFromCookie("token");

  // console.log(channelId, description);

  const formData = new FormData();

  formData.append("imgFile", imgFile)
  formData.append("channelId", channelId)
  formData.append("description", description)
  try {
    const response = await axios.post(SERVERURL + "/api/createChannel", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = response.data;
    return response.data;
    /* 에러 확인용 */
  } catch (error) {
    // console.log("Channel space  에러", error);
  }
}

/* Drop 한 파일 서버로 보내기 */
export async function SendFilesToServer(
  droppedFiles,
  channelId,
  files,
  setFiles
) {
  const token = GetTokenFromCookie("token");

  const formData = new FormData();

  droppedFiles.forEach((file) => {
    formData.append("files[]", file);
  });

  formData.append("channelId", channelId);
  for (let key of formData.keys()) {
    // console.log(key, ":", formData.get(key));
  }

  try {
    const response = await axios.post(SERVERURL + "/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("Upload successful:", response.data);
    const FileList = response.data.fileList;
    // console.log(FileList);
    setFiles(...files, FileList);
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

/* 유저 메시지를 서버에 보내서 응답받기 */
export async function SendMessageToServer(channelId, query) {
  const token = GetTokenFromCookie("token");
  // const data = {
  //   query: query,
  //   channelId: channelId,
  // };

  try {
    const response = await axios.post(SERVERURL + "/api/chat", query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

export async function DownloadPdf(image) {
  const token = GetTokenFromCookie("token");
  // console.log(token);
  const data = {
    imagePath: image,
  };
  try {
    const response = await axios.post(SERVERURL + "/api/downloadRef", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downloaded_pdf.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

/* 채널 생성에 필요한 정보 담아오기 */
export async function GetChannelData(channelId, msgId) {
  // console.log(msgId);
  // // console.log(channelId);
  const token = GetTokenFromCookie("token");
  const data = {
    channelId: channelId,
    msgId: msgId,
  };
  try {
    const response = await axios.post(SERVERURL + "/api/getChannelData", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
    /* 에러 확인용 */
  } catch (error) {
    // console.log("getChannelData 에러", error);
  }
}

/* 차트 생성에 필요한 정보 담아오기 */
export async function GetTreeData() {
  const token = GetTokenFromCookie("token");
  try {
    // axios를 사용하여 서버에서 데이터를 가져옵니다.
    const response = await axios.post(SERVERURL + "/api/tree", "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("GetTreeData 에러", error);
    throw error;
  }
}

/* 유저 수정 메시지를 서버에 보내서 응답받기 */
export async function SendModifyToServer(preMsg, postMsg) {
  const token = GetTokenFromCookie("token");
  const data = {
    preMsgId: preMsg.id,
    postMsgId: postMsg.id,
    message: postMsg.message,
  };

  try {
    const response = await axios.post(SERVERURL + "/api/modify", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("SendModifyToServer 에러", error);
  }
}

export async function GetSelectedId() {
  const token = GetTokenFromCookie("token");
  // console.log("여기까지는 들어옴");

  try {
    const response = await axios.post(SERVERURL +
      "/api/selectContext", "111" ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "GetSelectedId 에러",
      error
    );
  }
}

/* 북마크 생성을 위한 데이터 가져오기 */
export async function GetBookMarkData() {
  const token = GetTokenFromCookie('token');
     try {
      // axios를 사용하여 서버에서 데이터를 가져옵니다.
      const response = await axios.post(SERVERURL + "/api/getBookmark", "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    } catch (error) {
      console.error("GetBookMarkData 에러", error);
      throw error;
    }
}

/*북마크 데이터 추가 */
export async function SendBookMarkData(formData,bookMarkChatData) {
  const token = GetTokenFromCookie("token");
  // const data = {
  //   formData: formData,
  //   bookMarkChatData:bookMarkChatData
  // }
  // // console.log(data)

  try {
    const response = await axios.post(SERVERURL + "/api/addBookmark", formData,
      {
        headers:
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

/* Tree에서 선택한 Id 전송 */
export async function SelectedContext(selectedId) {
  const token = GetTokenFromCookie("token");
  // const data = {
  //   formData: formData,
  //   bookMarkChatData:bookMarkChatData
  // }
  // // console.log(data)

  try {
    const response = await axios.post(
      SERVERURL + "/api/selectContext",
      selectedId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("SelectedContext 오류:", error);
  }
}

/* 초기화*/
export async function Initialize() {
    const response = await axios.get(SERVERURL + "/api/initialize");
    alert(response.data)
}