// todo: fetch this from the non-existent backend in an epic :)
// the organization is actually made of positions, no employees

export const initialOrganization = [
  { id: 1, sup: 0 },
  { id: 2, sup: 1 },
  { id: 3, sup: 2 },
  { id: 4, sup: 3 },
  { id: 5, sup: 3 },
  { id: 6, sup: 4 },
  { id: 7, sup: 2 },
];

// thank you http://www.randomnames.com/, what would I do without you
export const employees = [
  { id: 1, name: 'Leyla, CEO' },
  { id: 2, name: 'Bob, CMO (reports to Leyla)' },
  { id: 3, name: 'Daysha, Marketing Manager (reports to Bob)' },
  { id: 4, name: 'Nicole, Team Lead, Marketing (reports to Daysha)' },
  { id: 5, name: 'Oswald, Marketer (reports to Daysha)' },
  { id: 6, name: 'Ziva, Research Analyst (reports to Nicole)' },
  { id: 7, name: 'Denise, Communications (reports to Bob)' },
];
