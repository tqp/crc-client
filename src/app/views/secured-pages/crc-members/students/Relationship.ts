export class Relationship {
  public relationshipId?: number;
  public studentId?: number;
  public personId?: number;
  public relationSurname?: string;
  public relationGivenName?: string;
  public relationshipTypeId?: number;
  public relationshipBloodRelative?: number;

  constructor(relationship: Relationship) {
    {
      this.relationshipId = relationship.relationshipId;
      this.studentId = relationship.studentId;
      this.personId = relationship.personId;
      this.relationSurname = relationship.relationSurname;
      this.relationGivenName = relationship.relationGivenName;
      this.relationshipTypeId = relationship.relationshipTypeId;
      this.relationshipBloodRelative = relationship.relationshipBloodRelative;
    }
  }
}
