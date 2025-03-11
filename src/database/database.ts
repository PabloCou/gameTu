import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
export const libsql = createClient({
  url: 'libsql://gametu-db-pablocou.turso.io',
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDE2ODE4OTksImlkIjoiMjJmYTI4MzAtZDRhMC00YWRmLThjZDItYjFiZmJjNTI2Yjk4In0._W6yMpCxY1H9SJghS5IyBko0KONoJAXjBgV-8AThjMmGsDAFqJmd-4jYA146-Az4yb3aP4idZoA4D-7YpxGAAQ",
  //syncUrl: 'file:./dev.db'
})

export const adapter = new PrismaLibSQL(libsql)
export const prisma = new PrismaClient({ adapter })

/* 
export const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const result = await query(args)
        
        // Synchronize the embedded replica after any write operation
        if (['create', 'update', 'delete'].includes(operation)) {
          await libsql.sync()
        }
        
        return result
      }
    }
  }
}) */