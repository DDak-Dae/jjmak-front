import { Button, CardMedia, Grid, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
/* 컴포넌트 */
import '../Styles/BookMarkPage.css'
import BookMarkUpperBar from './BookMarkArea/BookMarkUpperBar';
import BookMarkCard from './BookMarkArea/BookMarkCard';
import BookMarkDownload from './BookMarkArea/BookMarkPDFDownload';

import { GetBookMarkData } from '../services/api.js'
import { useEffect, useState } from 'react';


function BookMarkPage() {
  const [bookMarkList, setBookMarkList] = useState([]);  //북마크 리스트
  const [bookMarkRoleChatList, setBookMarkRoleChatList] = useState([]);  //북마크 채팅 리스트
  const [bookMarkChatList, setBookMarkChatList] = useState([]);  //북마크 채팅 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); //챗 리스트 모달 오픈
  const [isPDFOpen, setIsPDFOpen] = useState(false); //모달안에 있는 PDF 오른
  const [selectedBookMarkIndex, setSelectedBookMarkIndex] = useState(null); // 추가

  useEffect(() => {
    getBookMarkData();
  }, []);

  //모달 온오프
  const ModalOnOff = (index) => {
    setIsModalOpen(!isModalOpen);
    setIsPDFOpen(true)
    console.log(bookMarkRoleChatList);
    if (index === -1) {
      setBookMarkRoleChatList([]);
      return;
    }

    if (!isModalOpen) {
      const chatList = bookMarkList[index].chatList;
      const parsedChatList = JSON.parse(chatList); // 문자열로 된 JSON을 객체 배열로 변환
      const messages = parsedChatList.map((chat) => chat.message); // message 필드만 추출하여 배열로 만듦
      setBookMarkRoleChatList(parsedChatList);
      setBookMarkChatList(messages);
    } else {
      setBookMarkRoleChatList([]);
    }
  };

  const getBookMarkData = async () => {
    const response = await GetBookMarkData();
    // console.log(response.bookmarkList[0].imgPath +'.jpg');
    setBookMarkList(response.bookmarkList);
    if (response.result === "success") {
      // console.log("getWorkSpaceDate success")
      // console.log(response.channelInfoList)
    } else {
      console.log("fail");
    }
  }

  const PDFOnOff = () => {
    setIsPDFOpen(!isPDFOpen);
  }

  return (
    <div className="bookMarkPageWrap">

      <BookMarkUpperBar />

      <BookMarkCard bookMarkList={bookMarkList} ModalOnOff={ModalOnOff} />

      <Modal open={isModalOpen} onClose={ModalOnOff}>
        <div className='bookMarkModalMain' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className='bookMarkHidescrooll' style={{ overflowY: 'auto', margin: "20px", minWidth: '37vw', maxHeight: "75vh" }}>
            {bookMarkRoleChatList.map((chatData, index) => (
              <Card sx={{ margin: 0, backgroundColor: chatData.role === "gpt" ? "#9F8170" : "#EFDECD", }} key={index} onClick={() => ModalOnOff(index)}>
                <CardContent sx={{ padding: 0, display: "flex" }}>
                  <CardContent>
                    <img src={chatData.role === "user" ? "/static/img/choi.png" : "/static/img/bot.png"} style={{ width: '50px', height: '50px' }} />
                    {/*<CardMedia sx={{ height: 50, width: 50 }} image={chatData.role === "user" ? "/static/img/test.png" : "/static/img/DocuHero.png"} title={"hi"} />*/}
                  </CardContent>
                  <CardActionArea>
                    <CardContent style={{ userSelect: "text" }}>
                      <Typography fontSize={26}
                        color="black"
                        whiteSpace={"pre-wrap"}
                        sx={{ fontFamily: 'Black Han Sans' }}>
                        {chatData.message}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardContent>
                  </CardContent> */}
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            {isPDFOpen && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                <Button variant="contained" color="error" onClick={PDFOnOff}>
                  PDF출력
                </Button>
              </div>
            )}

            {!isPDFOpen && (
              <BookMarkDownload bookMarkChatList={bookMarkChatList} />
            )}
          </div>
          {!isPDFOpen && (
            <Button variant="contained" color="error" onClick={PDFOnOff}>
              돌아가기
            </Button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default BookMarkPage