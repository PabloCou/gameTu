
import { HttpException } from "@/exceptions/httpException";
import { prisma } from "../database/database";
import { Noticias } from "@prisma/client";

export class NewsService {

    static async getAll(idUser : number){
        const rol = await prisma.user.findUnique({
            where:{
                id: idUser
            }})
        if(!rol) {
                    const userNews = await prisma.noticias.findMany({
                     where: {
                        userId: idUser
                    }
                })
            return userNews
         }
        const noticias =  await prisma.noticias.findMany()
        return noticias
    }
    static async create(noticia: Noticias/*, idUser: number*/){
        /*const rol = await prisma.user.findUnique({
            where:{
                id: idUser,
                role: 'Admin'
            }})*/
        try {
            return await prisma.noticias.create({
                data: {
                    ...noticia
                }
            })
        }catch (error){
            throw new HttpException(401,"Error al crear la noticia")
        }
    } 
}