import multer from 'multer'

const upload1 = multer({
    storage: multer.memoryStorage()
  }).array('images', 5); // 'images' is the field name in the form for multiple file upload
  
  export default upload1