import React from 'react'
import useChatStore from '../../../store/ChatStore';

export const Chat = () => {
  const { chatroomOpen, setChatroomOpen } = useChatStore();
  return (
    <div className={`bg-yellow-400 transition duration-700  ${chatroomOpen ? "w-[0%]`" : 'w-[30%]' }` } >Chat</div>
  )
}
