export class Visit {
  public visitId?: number;
  public studentId?: number;
  public visitDate?: string;
  public caseManagerUserId?: number;
  public interactionTypeId?: number;
  public visitTypeId?: number;
  public caregiverComments?: string;
  public caseManagerComments?: string;

  // Joined Tables
  public studentSurname?: string;
  public studentGivenName?: string;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;
  public interactionTypeName?: string;
  public visitTypeName?: string;
}
