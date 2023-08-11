/* 컴포넌트 */
import WorkSpaceCard from "../WorkSpaceElem/WorkSpaceCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const buttonStyles = makeStyles({
  root: {
    borderRadius: "40px",
    marginleft: "5px",
    marginRight: "5px",
    color: "#EFDECD",
    backgroundColor: "black",
    borderColor: "black",
    whiteSpace: "nowrap",
  },
});

function WorkSpaceMain({
  showChannelList,
  getWordCloud,
  clickTagList,
  setClickTagList,
  setTagList,
  totalSize,
}) {
  // // console.log(workspaceDataList)

  const buttonStyle = buttonStyles();

  function tagOnClick(clickTag) {
    // console.log(clickTag);
    // tagList에 tag 추가
    setTagList((prevClickTagList) => [...prevClickTagList, clickTag]);

    // clickTagList에서 클릭한 tag 제거
    setClickTagList((prevTagList) =>
      prevTagList.filter((item) => item !== clickTag)
    );
  }
  return (
    <div className="workSpaceMainWrap">
      <div className="workSpaceMainUp">
        <Grid container spacing={1} sx={{ overflow: "auto", margin: "3px" }}>
          {clickTagList.length === 0 && (
            <Grid sx={{ marginBottom: "5px" }}>
              <Button
                style={{
                  borderRadius: "40px",
                  marginleft: "5px",
                  marginRight: "5px",
                  color: "#EFDECD",
                  backgroundColor: "black",
                  borderColor: "black",
                  whiteSpace: "nowrap",
                }}
                variant="outlined"
                size="small"
              >
                All
              </Button>
            </Grid>
          )}

          {clickTagList.length !== 0 &&
            clickTagList.map((clickTag) => (
              <Grid key={clickTag} sx={{ marginBottom: "5px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => tagOnClick(clickTag)}
                  style={{
                    borderRadius: "40px",
                    marginleft: "5px",
                    marginRight: "5px",
                    color: "#EFDECD",
                    backgroundColor: "black",
                    borderColor: "black",
                    whiteSpace: "nowrap",
                  }}
                >
                  {clickTag}
                </Button>
              </Grid>
            ))}
        </Grid>
      </div>
      <div className="division-line"></div>

      <div className="workSpaceMainChannel">
        <Grid container spacing={2}>
          {showChannelList.map((showChannel) => (
            <Grid item xs={4} sm={4} md={4} key={showChannel.id}>
              <WorkSpaceCard
                showChannel={showChannel}
                getWordCloud={getWordCloud}
                totalSize={totalSize}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
export default WorkSpaceMain;

//fontFamily: "Domaine Display,sans-serif";

// <div className="workSpaceMainUp" >
// <Grid container spacing={1} sx={{ overflow: 'auto', margin: '3px' }}>
//   {clickTagList.length === 0 && (
//     <Grid sx={{ marginBottom: '5px' }}>
//       <Button variant='outlined' size="small" style={{ borderRadius: "40px", marginLeft: "5px", marginRight: "5px", whiteSpace: "nowrap", borderColor: "black", color: "black" }}>All</Button>
//     </Grid>
//   )}

//   {clickTagList.length !== 0 && clickTagList.map((clickTag) => (
//     <Grid key={clickTag} sx={{ marginBottom: '5px' }}>
//       <Button className='tagButton'
//         variant='outlined'
//         size="small"
//         style={{
//           borderRadius:
//             "40px", marginLeft:
//             "5px", marginRight: "5px",
//           whiteSpace: "nowrap",
//           borderColor: "black",
//           color: "black",
//           fontFamily: "Domaine Display,sans-serif",
//         }} onClick={() => tagOnClick(clickTag)}>{clickTag}</Button>
//     </Grid>
//   ))}
// </Grid>
// </div>
// <div className='division-line'></div>
// <div>
// <Grid container spacing={2}>
//   {showChannelList.map((showChannel) => (
//     <Grid item xs={4} sm={4} md={4} key={showChannel.id}>
//       <WorkSpaceCard showChannel={showChannel} getWordCloud={getWordCloud} />
//     </Grid>
//   ))}
// </Grid>
// </div>
