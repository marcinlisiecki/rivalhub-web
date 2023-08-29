import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {
  organizationId: string;
  organizationName: string;
  type?: string;
  typeId?: string;
  title: string;
  startStr: string;
  start: Date;
  endStr?: string;
  end?: Date;
  allDay: boolean;
  color?: string;
  borderColor?: string;
  textColor?: string;
  EventURL?: any[];
  extendedProps?: {
    organizationName: string;
    organizationId: string;
    type: string;
    backgroundColor?: string;
    description?: string;
  };
}
