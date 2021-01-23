export class CaseManager {
  public userId?: number;
  public caseManagerId?: number;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;
  public caseManagerAddress?: string;
  public caseManagerPhone?: string;
  public caseManagerEmail?: string;
  // JOINED TABLES
  public relationshipId?: number;
  public relationshipStartDate?: string;
}
