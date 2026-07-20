"use client";

import Image from "next/image";
import { Menu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  locationUrl: string;
  invitationUrl: string;
};

function toUtcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildDescription(event: CalendarEvent) {
  return `📍 Τοποθεσία: ${event.locationUrl}\n💌 Προσκλητήριο: ${event.invitationUrl}`;
}

function buildGoogleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: buildDescription(event),
    location: event.locationUrl,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: event.start.toISOString(),
    enddt: event.end.toISOString(),
    body: buildDescription(event),
    location: event.locationUrl,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function escapeICSText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function buildICSFile(event: CalendarEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitation//Baptism Event//EL",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@invitation`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(event.start)}`,
    `DTEND:${toUtcStamp(event.end)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `DESCRIPTION:${escapeICSText(buildDescription(event))}`,
    `LOCATION:${escapeICSText(event.locationUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function downloadICSFile(event: CalendarEvent) {
  const blob = new Blob([buildICSFile(event)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "george-baptism-day.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const itemClass = cn(
  "flex cursor-default items-center gap-2.5 px-4 py-2.5 text-cave text-xs text-accent-foreground outline-hidden select-none",
  "data-highlighted:bg-primary/15",
);

function ItemIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=''
      width={408}
      height={612}
      className='h-5 w-auto shrink-0 object-contain'
    />
  );
}

export function AddToCalendar({ event }: { event: CalendarEvent }) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "flex items-center gap-2 rounded-full border border-accent-foreground/40 bg-transparent",
          "px-5 py-2.5 text-xs text-monte tracking-widest text-accent-foreground",
          "transition-colors hover:bg-accent-foreground/10 data-popup-open:bg-accent-foreground/10",
        )}>
        ΠΡΟΣΘΗΚΗ ΣΤΟ ΗΜΕΡΟΛΟΓΙΟ
        <ChevronDown className='h-3.5 w-3.5 shrink-0' />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className='z-9999 outline-hidden'
          sideOffset={8}>
          <Menu.Popup
            className={cn(
              "min-w-56 origin-[var(--transform-origin)] overflow-hidden rounded-xl border border-accent-foreground/20",
              "bg-card py-1 shadow-lg outline-hidden transition-[scale,opacity] duration-100 ease-out",
              "data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            )}>
            <Menu.Item
              className={itemClass}
              onClick={() =>
                window.open(buildGoogleCalendarUrl(event), "_blank")
              }>
              <ItemIcon src='/dropdown/google.png' />
              Google Calendar
            </Menu.Item>
            <Menu.Item
              className={itemClass}
              onClick={() => downloadICSFile(event)}>
              <ItemIcon src='/dropdown/apple.png' />
              Apple Calendar
            </Menu.Item>
            <Menu.Item
              className={itemClass}
              onClick={() =>
                window.open(buildOutlookCalendarUrl(event), "_blank")
              }>
              <ItemIcon src='/dropdown/outlook.png' />
              Outlook Calendar
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
