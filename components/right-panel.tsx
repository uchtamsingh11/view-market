'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { LuMousePointer2, LuAlarmClockCheck } from "react-icons/lu";
import { PiChatsLight } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineProduct, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineNotifications } from "react-icons/md";
import { AlarmsPopup } from '@/components/alarms-popup'
import { HelpPopup } from '@/components/help-popup'
import { NotificationsPopup } from '@/components/notifications-popup'
import { CalendarPopup } from '@/components/calendar-popup'

export default function RightPanel() {
  const [isAlarmsPopupOpen, setIsAlarmsPopupOpen] = useState(false)
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false)
  const [isNotificationsPopupOpen, setIsNotificationsPopupOpen] = useState(false)
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false)

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 w-12 z-30 border-l border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col items-center justify-between py-4">
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" size="sm">
            <LuMousePointer2 className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAlarmsPopupOpen(true)}
          >
            <LuAlarmClockCheck className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm">
            <PiChatsLight className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsCalendarPopupOpen(true)}
          >
            <IoCalendarClearOutline className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm">
            <AiOutlineProduct className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsNotificationsPopupOpen(true)}
          >
            <MdOutlineNotifications className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsHelpPopupOpen(true)}
          >
            <AiOutlineQuestionCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {isAlarmsPopupOpen && <AlarmsPopup onClose={() => setIsAlarmsPopupOpen(false)} />}
      {isHelpPopupOpen && <HelpPopup onClose={() => setIsHelpPopupOpen(false)} />}
      {isNotificationsPopupOpen && <NotificationsPopup onClose={() => setIsNotificationsPopupOpen(false)} />}
      {isCalendarPopupOpen && <CalendarPopup onClose={() => setIsCalendarPopupOpen(false)} />}
    </>
  );
}
