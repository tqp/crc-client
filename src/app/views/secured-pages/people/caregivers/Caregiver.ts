export class Caregiver {
  public caregiverId?: number;
  public caregiverSurname?: string;
  public caregiverGivenName?: string;
  public caregiverAddress?: string;
  public caregiverPhone?: string;
  public caregiverEmail?: string;
  public caregiverSupportTier?: string;
  public caregiverFamilyRelationship?: string;
  public caregiverOriginalFamilyImpact?: string;
  // Joined Tables
  public relationshipStartDate?: string;
  public relationshipTierTypeId?: number;
  public relationshipTierTypeName?: string;
  public relationshipBloodRelative?: boolean;
}
