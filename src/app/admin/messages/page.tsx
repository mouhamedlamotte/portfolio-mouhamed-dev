import React from 'react'
import { MessageSidebar } from './components/message-sidebar'
import { SendMessageBox } from './components/send-message-box'
import { PreviewMessage } from './components/previewMessage'

export default function Messages() {
  return (
    <div className='flex space-x-4 w-full h-full'>
        <MessageSidebar />
        <div className='w-full overflow-hidden h-full flex flex-col gap-2'>
        {/* <MessageContent /> */}
        <PreviewMessage />
        <SendMessageBox />
        </div>
    </div>
  )
}
