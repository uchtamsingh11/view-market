'use client'

import { useState } from 'react'
import { LuMousePointer2, LuAlarmClockCheck } from "react-icons/lu";
import { BiCross } from "react-icons/bi";
import { PiChatsBold } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineProduct, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineNotifications } from "react-icons/md";
import { AlarmsPopup } from '@/components/alarms-popup'
import { HelpPopup } from '@/components/help-popup'
import { NotificationsPopup } from '@/components/notifications-popup'
import { CalendarPopup } from '@/components/calendar-popup'

interface RightPanelProps {
  showCrosshair: boolean;
  onToggleCrosshair: () => void;
}

export default function RightPanel({ showCrosshair, onToggleCrosshair }: RightPanelProps) {
  const [isAlarmsPopupOpen, setIsAlarmsPopupOpen] = useState(false)
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false)
  const [isNotificationsPopupOpen, setIsNotificationsPopupOpen] = useState(false)
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false)

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 w-12 z-30 border-l-4 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col items-center justify-between py-4 screenshot-exclude">
        <div className="flex flex-col items-end gap-y-6">
          <div onClick={onToggleCrosshair} className="cursor-pointer">
            {showCrosshair ? <LuMousePointer2 className="w-6 h-6" /> : <BiCross className="w-6 h-6" />}
          </div>
          <div
            onClick={() => setIsAlarmsPopupOpen(true)}
            className="cursor-pointer"
          >
            <LuAlarmClockCheck className="w-6 h-6" />
          </div>
          <div className="cursor-pointer">
            <PiChatsBold className="w-6 h-6" />
          </div>
          <div
            onClick={() => setIsCalendarPopupOpen(true)}
            className="cursor-pointer"
          >
            <IoCalendarClearOutline className="w-6 h-6" />
          </div>
          <div className="cursor-pointer">
            <AiOutlineProduct className="w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-6">
          <div
            onClick={() => setIsNotificationsPopupOpen(true)}
            className="cursor-pointer"
          >
            <MdOutlineNotifications className="w-6 h-6" />
          </div>
          <div
            onClick={() => setIsHelpPopupOpen(true)}
            className="cursor-pointer"
          >
            <AiOutlineQuestionCircle className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {isAlarmsPopupOpen && <AlarmsPopup onClose={() => setIsAlarmsPopupOpen(false)} />}
      {isHelpPopupOpen && <HelpPopup onClose={() => setIsHelpPopupOpen(false)} />}
      {isNotificationsPopupOpen && <NotificationsPopup onClose={() => setIsNotificationsPopupOpen(false)} />}
      {isCalendarPopupOpen && <CalendarPopup onClose={() => setIsCalendarPopupOpen(false)} />}
    </>
  );
}
