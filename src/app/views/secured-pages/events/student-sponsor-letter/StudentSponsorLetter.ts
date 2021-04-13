export class StudentSponsorLetter {
  public studentSponsorLetterId?: number;
  public studentId?: number;
  public sponsorId?: number;
  public studentSponsorLetterDate?: string;
  // JOINED TABLES
  public studentSurname?: string;
  public studentGivenName?: string;
  public sponsorSurname?: string;
  public sponsorGivenName?: string;
}
