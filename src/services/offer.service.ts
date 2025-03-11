import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { GameOffer, PrismaClient, User } from "@prisma/client";
import { ValidationException } from "../exceptions/validationException"; 

export class OfferService {
  static async getById(id: number) {
    try {
      const findOffer = await prisma.gameOffer.findUnique({ where: { id } }); 
      if (!findOffer) throw new HttpException(404, "Offer not found");
      return findOffer;
    } catch (error) {
      console.error("Error al obtener la oferta por ID:", error);
      throw new HttpException(500, "Error fetching offer");
    }
  }

  
  static async getAll(title: string = "") {
    try {
      return await prisma.gameOffer.findMany({  
        where: {
          ...(title && {
            title: {
              contains: title,
              
            },
          }),
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 100,
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error al obtener todas las ofertas:", error);
      throw new HttpException(500, "Error fetching offers");
    }
  }

 
  static async create(idUser: number, offer: Partial<GameOffer>) {
    try {
    
      if (!offer.title || !offer.price) {
        throw new ValidationException("Title and price are required");
      }
  
      
      const dataToCreate = {
        title: offer.title,
        description: offer.description || undefined,  
        releaseDate: offer.releaseDate ? new Date(offer.releaseDate) : undefined,  
        price: offer.price ? offer.price : undefined,  
        active: offer.active || true,  
        idUserCreator: idUser,
        category: offer.idCategory ? { connect: { id: offer.idCategory } } : undefined,  
      };
  
      console.log('Offer data before saving:', dataToCreate);  
  

    } catch (error) {
      console.error("Error creating offer:", error);
      if (error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException(500, "Error creating offer");
    }
  }
  
  
  


  static async update(id: number, offer: Partial<GameOffer>) { 
    try {
      const findOffer = await prisma.gameOffer.findUnique({ where: { id } }); 
      if (!findOffer) throw new HttpException(404, "Offer doesn't exist");

      const updatedOffer = await prisma.gameOffer.update({  
        where: { id },
        data: { ...offer },
      });

      return updatedOffer;
    } catch (error) {
      console.error("Error al actualizar la oferta:", error);
      throw new HttpException(500, "Error updating offer");
    }
  }

  static async delete(id: number) {
    try {
      const deletedOffer = await prisma.gameOffer.delete({ where: { id } }); 
      if (!deletedOffer) throw new HttpException(404, "Offer not found");
      return deletedOffer;
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
      throw new HttpException(500, "Error deleting offer");
    }
  }

  static async rate(idUser: number, idOffer: number, value: number): Promise<void> {
    try {
      if (value < 0 || value > 5) {
        throw new ValidationException("Rating must be between 0 and 5.");
      }

      const offer = await prisma.gameOffer.findUnique({ where: { id: idOffer } });  
      if (!offer) {
        throw new HttpException(404, "Offer not found.");
      }

      await prisma.rate.upsert({
        where: { idUser_idOffer: { idUser, idOffer } },
        update: { value },
        create: { idUser, idOffer, value },
      });
    } catch (error) {
      console.error("Error al calificar la oferta:", error);
      if (error instanceof ValidationException) {
        throw error;
      }
      throw new HttpException(500, "Error rating the offer");
    }
  }

  static async getRate(idOffer: number) {
    try {
      const ratingStats = await prisma.rate.aggregate({
        where: { idOffer },
        _avg: { value: true },
        _count: { value: true },
      });

      return {
        totalRatings: ratingStats._count.value || 0,
        averageRating: ratingStats._avg.value?.toFixed(2) || 0,
      };
    } catch (error) {
      console.error("Error al obtener calificación:", error);
      throw new HttpException(500, "Error getting ratings for offer");
    }
  }

  static async getMyRate(idUser: number, idOffer: number) {
    try {
      return await prisma.rate.findUnique({
        where: { idUser_idOffer: { idUser, idOffer } },
      });
    } catch (error) {
      console.error("Error al obtener la calificación del usuario:", error);
      throw new HttpException(500, "Error getting user's rating for offer");
    }
  }
}
