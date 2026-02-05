import { User } from "@/src/types/User";
import { EventCategory } from "../enums/EventCategory";

export interface Event {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  dateEvent: Date;
  maxCapacity: number;
  eventCategory: EventCategory;
  imageUrl: string;
  imageFileName: string;
  createdBy: User;
  minAge: number;
  maxAge: number;
}

export namespace Event {
  export function fromJSON(json: any): Event {
    return {
      ...json,
      startTime: new Date(json.startTime),
      endTime: new Date(json.endTime),
      dateEvent: new Date(json.dateEvent),
    }
  }
}