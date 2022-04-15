import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'b637f1218cd4482cb97a64d85dbf35eb'
 });

export const handleApiCall=(req,res)=>{app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>res.json(data))}

export const handleImage=(req,res,db)=>{
    const {id}=req.body;
  db('users').where('id','=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>res.json(entries[0].entries))
  .catch(err=>res.status(400).json('cant find id'))
}