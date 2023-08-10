/* 컴포넌트 */
import BookMark from "../ChannelElem/BookMark";

function ChannelRightSideBar({ bookMarkChatData, removeBookMarkData, sendBookMarkData }) {
  const bookMarkTitle = "< BookMark/>"
  return (
    <div className="ChannelRightSideBarWrap">
      <div className="bookMarkTitle">
        {bookMarkTitle}
      </div>
      <BookMark bookMarkChatData={bookMarkChatData} removeBookMarkData={removeBookMarkData} sendBookMarkData={sendBookMarkData}></BookMark>
    </div>
  );
}

export default ChannelRightSideBar;
