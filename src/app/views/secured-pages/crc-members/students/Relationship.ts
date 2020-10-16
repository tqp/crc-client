export class Relationship {
  public relationshipId?: number;
  // Foreign Keys
  public studentId?: number;
  public personId?: number;
  public relationshipTypeId?: number;
  public concernTypeId?: string;
  public supportTierId?: string;
  // Fields
  public relationshipBloodRelative?: number;
  public relationshipFamilyOfOrigin?: number;
  public relationshipResidence?: number;
  public relationshipSupportDescription?: string;
  public relationshipComments?: string;
  public relationshipEffectiveDate?: string;
  // Metadata
  public createdOn?: string;
  public createdBy?: string;
  public updatedOn?: string;
  public updatedBy?: string;
  public deleted?: number;

  // Joined Fields
  public studentSurname?: string;
  public studentGivenName?: string;
  public relationSurname?: string;
  public relationGivenName?: string;

  // constructor(relationship: Relationship) {
  //   {
  //     this.relationshipId = relationship.relationshipId;
  //     this.studentId = relationship.studentId;
  //     this.studentSurname = relationship.studentSurname;
  //     this.studentGivenName = relationship.studentGivenName;
  //     this.personId = relationship.personId;
  //     this.relationSurname = relationship.relationSurname;
  //     this.relationGivenName = relationship.relationGivenName;
  //     this.relationshipTypeId = relationship.relationshipTypeId;
  //     this.relationshipBloodRelative = relationship.relationshipBloodRelative;
  //   }
  // }
}
