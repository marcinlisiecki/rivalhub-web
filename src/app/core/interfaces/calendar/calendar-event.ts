import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {
  organisationId: string;
  organisationName: string;
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
  extendedProps?: {
    organisationName: string;
    organisationId: string;
    type: string;
    backgroundColor?: string;
    description?: string;
  };
}
