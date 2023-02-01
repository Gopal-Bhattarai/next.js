import nextConnect from 'next-connect';
import multer from 'multer';
import { updateProfilePicture } from '@/controllers/usersController';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/avatar',
    filename: function (req, file, cb) {
      const newFileName = file.fieldname + '-' + file.originalname;
      req.newfilename = newFileName
      cb(null, newFileName)
    }
  }),
  fileFilter: (req, file, cb) =>{
    if(file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|PNG|png|gif|GIF|BMP|bmp)$/)){
        cb(null,true);
    }else {
        cb(null,false);
        return cb(new Error('Only .png, .jpg .jpeg, .gif or bmp format allowed'));
    }
}
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('avatar'));

apiRoute.post((req, res) => {
  const params = req.query.avatar
  req.id = params[1]
  updateProfilePicture(req,res)
  // res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};