export class PostGradEvent {
  public postGradEventId?: number;
  public studentId?: number;
  public postGradEventTypeId?: number;
  public postGradEventDate?: string;
  public postGradEventComments?: string;
  // JOINED TABLES
  public studentSurname?: string;
  public studentGivenName?: string;
  public postGradEventTypeName?: string;
}
