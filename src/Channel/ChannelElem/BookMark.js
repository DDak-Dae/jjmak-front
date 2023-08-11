import React from 'react';
/* 라이브러리 */
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { Alert, CardActionArea, Modal, TextField } from '@mui/material';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useRef } from 'react';


function BookMark({ bookMarkChatData, removeBookMarkData, sendBookMarkData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);  //모달용
    const [showBedAlert, setShowBedAlert] = useState(false);
    const [showGoodAlert, setShowGoodAlert] = useState(false);
    const [bookMarkPhoto, setBookMarkPhoto] = useState(null); // 선택한 사진
    const [bookMarkPhotoFile, setBookMarkPhotoFile] = useState(null); // 선택한 사진의 파일
    const [bookMarkName, setBookMartName] = useState('');
    const fileInputRef = useRef(null);

    const ModalOnOff = () => {
        setIsModalOpen(!isModalOpen);
    };

    const goodAlert = () => {
        setShowGoodAlert(true);

        setTimeout(() => {
            // console.log('asdasd');
            setShowGoodAlert(false);
        }, 1000);
    }

    const FileChange = (event) => {
        const file = event.target.files[0];
        setBookMarkPhoto(URL.createObjectURL(file));
        setBookMarkPhotoFile(file)
    };

    const FileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file !== null) {
            setBookMarkPhoto(URL.createObjectURL(file));
            setBookMarkPhotoFile(file);
        }
    };

    const FileDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {showBedAlert && (
                <Alert severity="error" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1000 }}>
                    북마크로 선택된 채팅이 없습니다.
                </Alert>
            )}
            {showGoodAlert && (
                <Alert severity="success" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1000 }}>
                    북마크가 생성되었습니다.
                </Alert>
            )}
            <div style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
                {bookMarkChatData.map((chatData, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.998 }} style={{ width: "99%" }}>
                        <Card sx={{ width: "95%", margin: 1, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
                            <CardActionArea sx={{ margin: 0, backgroundColor: '#ffffff', width: "250px", height: "7vh" }} onDoubleClick={() => removeBookMarkData(chatData)}>
                                <CardContent>
                                    <div className='BookMarkFont'>{chatData.message}</div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <div>
                <div style={{ position: 'absolute', bottom: '1rem', width: '20%', textAlign: 'center' }}>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}
                            onClick={ModalOnOff}
                            disabled={bookMarkChatData.length === 0}
                        >
                            북마크 추가
                        </Button>
                    </motion.div>
                </div>
            </div>
            <Modal open={isModalOpen} onClose={ModalOnOff}>
                <div className='BookMarkModal'>
                    <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
                        <div className='BookMarkModalChat'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginTop: "2%", marginLeft: "6%", width: "22.5vw", padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                                    <TextField fullWidth label="북마크 제목" id="fullWidth" onChange={(e) => (setBookMartName(e.target.value))} />
                                </div>
                                <div
                                    style={{
                                        marginTop: '2%',
                                        marginLeft: '6%',
                                        width: '22.5vw',
                                        height: '80%',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                        backgroundColor: 'lightgray',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        marginBottom: '10px',
                                        backgroundImage: bookMarkPhoto ? `url(${bookMarkPhoto})` : 'none',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                    onDoubleClick={() => fileInputRef.current.click()} // 파일 선택 창 열기
                                    onDrop={FileDrop} // 드래그 앤 드롭 업로드
                                    onDragOver={FileDragOver} // 드래그 앤 드롭 영역에 오버했을 때의 처리
                                >
                                    <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={FileChange} />
                                    {bookMarkPhoto ? (
                                        <div style={{ width: '100%', height: '100%' }}>
                                            {/* 이 부분에 선택한 사진을 표시하는 컴포넌트나 스타일을 추가할 수 있습니다. */}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            클릭이나 드래그 앤 드롭 해서 사진 올리기
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: "2%" }}>
                            <div style={{ flexGrow: 1, overflowY: 'scroll' }} >
                                {bookMarkChatData.map((chatData, index) => (
                                    <motion.div key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} style={{ width: "99%", marginBottom: "0.3vw" }}>
                                        <Card sx={{ marginLeft: "0.5vw", marginRight: "0.5vw", boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', width: "20vw" }}>
                                            <CardActionArea sx={{ margin: 0, backgroundColor: '#ffffff', width: "100%", height: "7vh" }} onDoubleClick={() => removeBookMarkData(chatData)}>
                                                <CardContent>
                                                    <div className='BookMarkFont'>{chatData.message}</div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button variant="contained" color="success" onClick={() => { sendBookMarkData(bookMarkName, bookMarkPhotoFile); ModalOnOff(); setBookMarkPhoto(null); goodAlert(); }}>
                                        북마크 생성
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default BookMark;