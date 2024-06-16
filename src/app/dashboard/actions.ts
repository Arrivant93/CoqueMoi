"use server"

import { db } from '@/db'
import { CommandeStatus } from '@prisma/client'

export const changeCommandeStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: CommandeStatus
}) => {
  await db.commande.update({
    where: { id },
    data: { status: newStatus },
  })
}