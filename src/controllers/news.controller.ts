import { NextFunction, Request, Response } from 'express';
import {NewsService}  from "../services/news.service";

export class NewsController{

    static async getAll(req:Request, res:Response){
        const idUser = Number (req.query.id)
        const noticia = await NewsService.getAll(idUser)
        res.status(200).json(noticia) 
    }
    static async createNew(req:Request, res:Response){
        try{
            const noticia = req.body 
            if(!noticia)  res.status(400).json({error:'Hace falta la noticia'})
            
            const newNoticia = await NewsService.create(noticia);
            res.status(201).json(newNoticia)
        }catch(error){
            res.status(401).json({error:'Error al crear la noticia'})
        }

    }
}