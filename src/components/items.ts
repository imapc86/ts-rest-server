import {Request, Response} from 'express'

export const getItems = (req:Request, res: Response ) => {

  res.json({
    msg: 'endpoint: getItems works!!'
  });

}

export const getItem = (req:Request, res: Response ) => {

  const { id } = req.params; 

  res.json({
    msg: 'endpoint: getItem works!!',
    id
  });

}

export const postItem = (req: Request, res: Response ) => {

  const { body } = req;

  res.json({
    msg: 'endpoint: postItem works!!',
    body
  });

}

export const putItem = (req:Request, res: Response) => {

  const { id } = req.params;

  const { body } = req;

  console.log(id);

  res.json({
    msg: 'endpoint: putItem works!!',
    body
  })

}

export const deleteItem = (req:Request, res:Response) => {

  const { id } = req.params;

  res.json({
    msg: 'endpoint: deleteItem works!!',
    id
  });

}