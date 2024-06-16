'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { CommandeStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { changeCommandeStatus } from './actions'
import { useRouter } from 'next/navigation'

const LABEL_MAP: Record<keyof typeof CommandeStatus, string> = {
  awaiting_shipment: 'Awaiting Shipment',
  fulfilled: 'Fulfilled',
  shipped: 'Shipped',
}

const StatusDropdown = ({
  id,
  commandeStatus,
}: {
  id: string
  commandeStatus: CommandeStatus
}) => {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['change-commande-status'],
    mutationFn: changeCommandeStatus,
    onSuccess: () => router.refresh(),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-52 flex justify-between items-center'>
          {LABEL_MAP[commandeStatus]}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        {Object.keys(CommandeStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
              {
                'bg-zinc-100': commandeStatus === status,
              }
            )}
            onClick={() => mutate({ id, newStatus: status as CommandeStatus })}>
            <Check
              className={cn(
                'mr-2 h-4 w-4 text-primary',
                commandeStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />
            {LABEL_MAP[status as CommandeStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown