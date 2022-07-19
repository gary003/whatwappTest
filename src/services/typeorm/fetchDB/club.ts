// CreateClub: the user can create a Club, which is a group of users. Every club has a maximum number of members (default: 50). When creating a club, the user spends 50 hard_currency;
// JoinClub: the user can join an existing club by sending the club id. If the maximum number of members is already reached an error must be returned to the user. When successfully joining a club the user spends 100 soft_currency
// ListClubs: it returns a list of existing clubs
// GetClub: given the club id, it returns the details of a single club
// SendMessage: the user can send a message to its club
// GetClubMessages: it returns the list of messages shared in the club

import { Club } from "../entity/club"

export const createClub = (): Club => {
  return null
}
