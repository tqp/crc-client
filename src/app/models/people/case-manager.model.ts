export class CaseManager {
  public caseManagerUserId?: number;
  public caseManagerId?: number;
  public caseManagerName?: string;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;
  public caseManagerAddress?: string;
  public caseManagerPhone?: string;
  public caseManagerEmail?: string;
  // JOINED TABLES
  public caregiverName?: string;
  public caregiverSurname?: string;
  public caregiverGivenName?: string;
  public relationshipId?: number;
  public relationshipStartDate?: string;
}
