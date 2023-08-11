/* 컴포넌트 */
import { Widgets } from "@material-ui/icons";
import LeftBarProfile from "../WorkSpaceElem/LeftBarProfile";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import LeftBarTags from "../WorkSpaceElem/LeftBarTags";
import Divider from "@mui/material/Divider";


export default function LeftSideBar({ workspaceDataList, tagList, setTagList, setClickTagList, showChannelList, setShowChannelList }) {
  // console.log(tagList)

  return (
    <div className="leftSideBarWrap">
      <LeftBarProfile />
      <Divider />
      <LeftBarTags
        workspaceDataList={workspaceDataList}
        tagList={tagList} setTagList={setTagList}
        setClickTagList={setClickTagList}
        showChannelList={showChannelList}
        setShowChannelList={setShowChannelList} />
      <div className="leftBarHistory"></div>
    </div>
  );
}

// <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <LeftBarProfile />
//       <Divider />
      // <LeftBarTags
      //   workspaceDataList={workspaceDataList}
      //   tagList={tagList} setTagList={setTagList}
      //   setClickTagList={setClickTagList}
      //   showChannelList={showChannelList}
      //   setShowChannelList={setShowChannelList} />
      // <div className="leftBarHistory"></div>
//     </div >