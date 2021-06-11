export class CsiRecord {
  public csiRecordId?: number;
  public studentId?: number;
  public caseManagerUserId?: number;
  public csiRecordDate?: string;
  public csiRecordServicesProvided?: string;
  public csiRecordComments?: string;
  // CRC Services
  public csiRecordServicesCounseling?: number;
  // CSI Scores
  public csiRecordScoreFoodSecurity?: number;
  public csiRecordScoreNutritionAndGrowth?: number;
  public csiRecordScoreShelter?: number;
  public csiRecordScoreCare?: number;
  public csiRecordScoreAbuseAndExploitation?: number;
  public csiRecordScoreLegalProtection?: number;
  public csiRecordScoreWellness?: number;
  public csiRecordScoreHealthCareServices?: number;
  public csiRecordScoreEmotionalHealth?: number;
  public csiRecordScoreSocialBehavior?: number;
  public csiRecordScorePerformance?: number;
  public csiRecordScoreEducationAndWork?: number;
  // JOINED TABLES
  public studentName?: string;
  public studentSurname?: string;
  public studentGivenName?: string;
  public caseManagerName?: string;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;

}
