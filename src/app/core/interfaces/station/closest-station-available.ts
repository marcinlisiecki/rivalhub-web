import {EventType} from "@angular/router";
import {Station} from "@interfaces/station/station";


export interface ClosestStationAvailable{
  type: EventType,
  available: Date;
  stationList: Station;
}
