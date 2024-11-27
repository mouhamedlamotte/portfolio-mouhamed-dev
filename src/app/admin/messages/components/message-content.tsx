"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconMail, IconMessageOff, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import Markdown from 'react-markdown'
import { MessageType } from '../types/message'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from '@/lib/axios'
import { formatDate } from '@/lib/utils'
import { Loader } from 'lucide-react'




export const MessageContent = () => {

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const {data : message, isLoading} = useQuery<MessageType>({
        queryKey: ['message', id],
        queryFn: async() => {
            return AxiosInstance.get(`/messages/${id}`).then((res) => res.data)
        },
        enabled: !!id
    })

    const {data : replies, isLoading: isLoadingReply} = useQuery<{
        content : string,
        createdAt: Date,
        via : string
    }[]>({
        queryKey: ['reply', id],
        queryFn: async() => {
            return AxiosInstance.get(`/messages/${id}/reply`).then((res) => res.data)
        },
        enabled: !!id
    })


    
  return (
    <Card className='w-full overflow-hidden h-full'>
        {
            message && !isLoading ? (
                <>
        <CardHeader className='flex-row items-center'>
            <div>
            <CardTitle className='Capitalize'>{message.name}</CardTitle>
                <Link href={`mailto:${message.email}`} className='mt-1 text-sm  underline'>{message.email}</Link>
            </div>
            
            <div className='ml-auto flex space-x-2'>
                <Button asChild>
                        <Link  href={`mailto:${message.email}`}>
                        Repondre sur Mail 
                        <IconMail />
                        </Link>
                </Button>
                <Button variant="destructive">
                        Supprimer 
                        <IconTrash />
                </Button>
            </div>
        </CardHeader>
        <Separator />
        <CardContent className='p-4 pb-32 overflow-y-auto h-full'>
            <div className='flex flex-col  w-fit'>
                <Markdown className="p-4 rounded-sm bg-accent w-fit space-y-6 text-gray-300 h-fit max-w-xl">{message.message}</Markdown>
                <span className='text-xs text-muted-foreground mt-1'>{formatDate(message.createdAt)}</span>
            </div>
            {
                replies && replies.map((reply, index) => (
                    <div className='flex flex-col  items-end' key={index}>
                    <Markdown className="p-4 rounded-sm bg-primary/75 w-fit space-y-6 text-gray-300 h-fit max-w-xl">{reply.content}</Markdown>
                    <span className='text-xs text-muted-foreground mt-1 '>{formatDate(reply.createdAt)}</span>
                </div>
                ))
            }
        </CardContent>
                </>
            ) : isLoading || isLoadingReply && <CardContent className='h-full w-full flex justify-center items-center'><Loader className='animate-spin' /></CardContent> 
        }
        {
            !id && (
<CardContent className='h-full w-full flex justify-center items-center'>
                    <div className='flex flex-col gap-4 items-center'>
                        <IconMessageOff className='h-40 w-40' />
                        <span className='text-center font-bold text-xl'>Cliquer sur un message pour voir son contenu</span>
                    </div>
            </CardContent>
            )
        }
      </Card>
  )
}
