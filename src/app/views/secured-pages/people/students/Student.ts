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
  public relationshipTierTypeId?: number;
  public relationshipTierTypeName?: string;
  // Case Manager
  public caseManager?: string;
  public caseManagerAssignmentDate?: string;
  // Caregiver
  public caregiverId?: number;
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
