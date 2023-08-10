import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

function BookMarkCard({ bookMarkList, ModalOnOff }) {
  return (
    <div className="bookMarkPageWrapElemWrap" >
      <div className='bookMarkMain' style={{ overflowY: 'auto', maxHeight: "100vh" }}>
        <Grid container>
          {bookMarkList.map((bookMark, index) => (
            <Card sx={{ margin: 2, width: "20vw", height: '30vh' }} key={index} onClick={() => ModalOnOff(index)}>
              <CardActionArea>
                <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5" component="div">
                    {bookMark.bookmarkName}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={bookMark.imgPath}
                    alt="green iguana"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "100%"
                    }}
                  />
                </div>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default BookMarkCard;