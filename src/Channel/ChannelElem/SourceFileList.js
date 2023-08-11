import React, { useState } from 'react';
import { CardMedia, Dialog, DialogContent, Checkbox, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { DownloadPdf } from '../../services/api';

export default function SourceFileList({ sourceList, selectedImages, setSelectedImages }) {
  const [open, setOpen] = useState(false);
  // const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const pdfDownClick = async (imageInfo) => {
    const response = await DownloadPdf(imageInfo);
  };

  const handleImageClick = (imageSrc, imagedown) => {
    setSelectedImage(imageSrc);
    setOpen(true);
  };

  const handleCheckboxClick = (imageSrc) => {
    if (selectedImages.includes(imageSrc)) {
      setSelectedImages(selectedImages.filter((img) => img !== imageSrc));
    } else {
      setSelectedImages([...selectedImages, imageSrc]);
    }
  };

  const closeModal = () => {
    // setSelectedImages([]);
    setSelectedImage(null);
    setOpen(false);
  };

  // // console.log(sourceList);

  return (
    <div>
      <ImageList sx={{ width: '100%', margin: '5px auto', position: 'relative' }} variant="standard" cols={4} gap={8}>
        {sourceList.map((image, index) => (
          <ImageListItem key={index}>
            <CardMedia
              component="img"
              src={image[0]}
              style={{ width: '15vw', cursor: 'pointer' }}
              onClick={() => handleImageClick(image[0], image[1])}
            />
            <Checkbox
              checked={selectedImages.includes(image[1])}
              onClick={(e) => {
                e.stopPropagation();
                handleCheckboxClick(image[1]);
              }}
              style={{ position: 'absolute', top: 0, right: 0 }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="xl"
        PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' } }}
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Expanded"
            style={{ width: '100%', maxHeight: '89.5vh', objectFit: 'contain', cursor: 'pointer' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}