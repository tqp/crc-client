export class Relationship {
  public relationshipId?: number;
  // Foreign Keys
  public studentId?: number;
  public relationshipPersonId?: number;
  // Fields
  public relationshipType?: string;
  public relationshipTierTypeId?: string;
  public relationshipTypeId?: string;
  public relationshipStartDate?: string;
  public relationshipBloodRelative?: number;
  public relationshipFamilyOfOrigin?: number;
  public relationshipComments?: string;
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
