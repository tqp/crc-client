export class Caregiver {
  public caregiverId?: number;
  public caregiverSurname?: string;
  public caregiverGivenName?: string;
  public caregiverAddress?: string;
  public caregiverPhone?: string;
  public caregiverEmail?: string;
  public caregiverSupportTier?: string;
  // Joined Tables
  public relationshipId?: number;
  public relationshipStartDate?: string;
  public relationshipTypeId?: number;
  public relationshipTypeName?: string;
  public relationshipTierTypeId?: number;
  public relationshipTierTypeName?: string;
  public relationshipFamilyOfOriginTypeId?: string;
}
