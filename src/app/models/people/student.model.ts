export class Student {
  // Personal Information
  public studentId?: number;
  public studentSurname?: string;
  public studentGivenName?: string;
  public studentName?: string;
  public studentGender?: string;
  public studentDateOfBirth?: string;
  public studentSchool?: string;
  public studentAddress?: string;
  public studentPhone?: string;
  public schoolLevelTypeId?: number;
  public classLevelTypeId?: number;
  public classRepeatYearTypeId?: number;
  public impairmentTypeId?: number;
  // JOINED TABLES
  public schoolLevelTypeName?: string;
  public classLevelTypeName?: string;
  public impairmentTypeName?: string;
  // Program Status
  public programStatus?: string;
  public programStatusStartDate?: string;
  public programStatusLevelOne?: string;
  public programStatusLevelTwo?: string;
  public programStatusLevelThree?: string;
  // Tier
  public relationshipTierTypeId?: number;
  public relationshipTierTypeName?: string;
  // Case Manager
  public caseManager?: string;
  public caseManagerAssignmentDate?: string;
  // Caregiver
  public caregiverId?: number;
  public caregiverName?: string;
  public caregiverSurname?: string;
  public caregiverGivenName?: string;
  public caregiverSupportTier?: string;
  public caregiverAddress?: string;
  public caregiverPhone?: string;
  public caregiverFamilyRelationship?: string;
  public caregiverOriginalFamilyImpact?: string;
  // Sponsor
  public sponsor?: string;
  public sponsorAssignmentDate?: string;
}
