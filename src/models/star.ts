import * as C from 'io-ts/Codec';
import {NoEmptyString} from '../utils/codecs/NoEmptyString';

export const StarInput = C.struct({
  owner: NoEmptyString,
  repo: NoEmptyString,
});
export type StarInput = C.TypeOf<typeof StarInput>;

export interface FormStarInput {
  owner: string;
  repo: string;
}

export const Stargazer = C.struct({
  login: C.string,
  id: C.number,
  node_id: C.string,
  avatar_url: C.string,
  gravatar_id: C.string,
  url: C.string,
  html_url: C.string,
  followers_url: C.string,
  following_url: C.string,
  gists_url: C.string,
  starred_url: C.string,
  subscriptions_url: C.string,
  organizations_url: C.string,
  repos_url: C.string,
  events_url: C.string,
  received_events_url: C.string,
  type: C.string,
  site_admin: C.boolean,
});

export type Stargazer = C.TypeOf<typeof Stargazer>;
