import React, { useEffect, useRef } from 'react';
import WordCloud from '../WorkSpaceElem/WordCloud.js'
import Divider from "@mui/material/Divider";

function RightSideBar({ wordCloudList }) {
  const cloudWordTitle = "< WordCloud/>"
  const informationTitle = "< Size/>"
  return (
    <div className='rightSideBarWrap'>
      <div className='cloudWordTitle'>{cloudWordTitle}</div>

      <div className='wordCloudWrap'>
        <div className='wordCloud'>
          <WordCloud wordCloudList={wordCloudList}></WordCloud>
        </div>
      </div>
      <Divider />
      <div className="fileInfoWrap">
        <div className="informationTitle">{informationTitle}</div>
        <div className="fileInfoDetailWrap">
          <div className="fileInfoDetail"> 100MB </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;

// <img className='informationTitle' src="/static/img/information.png" alt="Description" />
// <div>
//       <div style={{ margin: '10px' }} >
//         <img src="/static/img/information.png" alt="Description" style={{ width: '129px', height: '21px' }} />
//       </div>

//       <div className='WordCloud'>
//         <WordCloud wordCloudList={wordCloudList}></WordCloud>
//       </div>
//     </div>