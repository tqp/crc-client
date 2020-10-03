export class Student {
  // Personal Information
  public studentId?: number;
  public studentSurname?: string;
  public studentGivenName?: string;
  public studentGender?: string;
  public studentDateOfBirth?: string;
  public studentSchool?: string;
  public studentGrade?: string;
  public studentAddress?: string;
  public studentPhone?: string;
  public studentImpairment?: string;
  // Program Status
  public programStatus?: string;
  public programStatusDate?: string;
  // Tier
  public tierTypeId?: number;
  public tierTypeName?: string;
  // Case Manager
  public caseManager?: string;
  public caseManagerAssignmentDate?: string;
  // Caregiver
  public caregiverId?: number;
  public caregiverName?: string;
  public caregiverSupportTier?: string;
  public caregiverAddress?: string;
  public caregiverPrimaryPhone?: string;
  public caregiverFamilyRelationship?: string;
  public caregiverOriginalFamilyImpact?: string;
  // Sponsor
  public sponsor?: string;
  public sponsorAssignmentDate?: string;
}
