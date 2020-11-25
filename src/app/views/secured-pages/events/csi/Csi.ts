export class Csi {
  public csiId?: number;
  public studentId?: number;
  public caseManagerId?: number;
  public csiDate?: string;
  public csiServicesProvided?: string;
  public csiComments?: string;
  // CRC Services
  public csiServicesCounseling?: number;
  // CSI Scores
  public csiScoreFoodSecurity?: number;
  // JOINED TABLES
  public studentSurname?: string;
  public studentGivenName?: string;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;

}
