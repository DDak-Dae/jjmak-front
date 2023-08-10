import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'

const buttonStyles = makeStyles({
  root: {
    borderRadius: "40px",
    marginleft: "5px",
    marginRight: "5px",
    color: "black",
    borderColor: "black",
    whiteSpace: "nowrap"
  }
})

export default function LeftBarTags({
  tagList,
  setTagList,
  setClickTagList
}) {
  const tagTitle = "< Tags/>"
  const buttonStyle = buttonStyles()

  function clickTag(tag) {
    console.log(tag)
    // clickTagList에 tag 추가
    setClickTagList(prevClickTagList => [...prevClickTagList, tag]);

    setTagList(prevTagList => prevTagList.filter(item => item !== tag));
  }

  return (
    /* overflow 확인 */
    <div className="leftBarTags">
      <div className="TagTitleWrap">
        <div className="TagTitle" >{tagTitle}</div>
      </div>
      <div className="TagsWrap">
        <Grid container spacing={1} sx={{ overflow: 'auto', margin: '0px 3px 3px 3px' }}>
          {
            tagList.map((tag) => (
              <Grid item >
                <Button variant='outlined' size="small" onClick={() => clickTag(tag)} style={{
                  borderRadius: "40px",
                  marginleft: "5px",
                  marginRight: "5px",
                  color: "black",
                  borderColor: "black",
                  whiteSpace: "nowrap"
                }}>{tag}</Button>
              </Grid>
            ))
          }
        </Grid>
      </div>

    </div>
  );

}
// <Button className={buttonStyle.root} variant='outlined' size="small" onClick={() => clickTag(tag)}>{tag}</Button>
// <img className="TagTitle" src="/static/img/Tags.png" alt="Description" />