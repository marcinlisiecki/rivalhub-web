import { NotificationStatus } from '@interfaces/user/notification/notification-status';
import { EventType } from '@interfaces/event/event-type';

export interface Notification {
  id: number;
  matchId: number;
  type: EventType;
  organizationId: number;
  status: NotificationStatus;
  eventId: number;
}
