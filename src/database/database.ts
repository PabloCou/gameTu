import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
console.log(process.env.a)
export const libsql = createClient({
  url: 'libsql://turso-prisma-db-pablocou.turso.io',
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDE1OTc2MDQsImlkIjoiYzRlMzlmYzAtYjQ5ZS00OTZmLWE0MGUtNzBkZTFiMWRiMTVlIn0.wYWLXOweY7OW3hA1xCxGPBnSEMy03kcVo_pF6VJu_RaMqN7_L0JVGQYQEvmHupyZTF0jqNCxr31DoQqaHURmDA",
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