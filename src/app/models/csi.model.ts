export class Csi {
  public csiId?: number;
  public studentId?: number;
  public userId?: number;
  public csiDate?: string;
  public csiServicesProvided?: string;
  public csiComments?: string;
  // CRC Services
  public csiServicesCounseling?: number;
  // CSI Scores
  public csiScoreFoodSecurity?: number;
  public csiScoreNutritionAndGrowth?: number;
  public csiScoreShelter?: number;
  public csiScoreCare?: number;
  public csiScoreAbuseAndExploitation?: number;
  public csiScoreLegalProtection?: number;
  public csiScoreWellness?: number;
  public csiScoreHealthCareServices?: number;
  public csiScoreEmotionalHealth?: number;
  public csiScoreSocialBehavior?: number;
  public csiScorePerformance?: number;
  public csiScoreEducationAndWork?: number;
  // JOINED TABLES
  public studentSurname?: string;
  public studentGivenName?: string;
  public caseManagerId?: string;
  public caseManagerSurname?: string;
  public caseManagerGivenName?: string;

}
