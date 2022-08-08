import * as TE from 'fp-ts/TaskEither';
import {getResponseError} from '../utils/errors';
import {api, Api} from './api';
import * as E from 'fp-ts/Either';
import {pipe} from 'fp-ts/function';
import {draw} from 'io-ts/lib/Decoder';
import {Stargazer} from '../models/star';

interface StargazerApiInterface {
  listStargazers: (i: {owner: string; repo: string}) => Promise<Stargazer[]>;
}

export class StargazerApi implements StargazerApiInterface {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private api: Api) {}

  listStargazers = async ({owner, repo}: {owner: string; repo: string}) => {
    const query = TE.tryCatch(
      () => this.api.get(`${owner}/${repo}/stargazers`),
      e => {
        const responseError = getResponseError(e);
        if (responseError) {
          return responseError.data?.meta?.messages?.[0]?.code;
        }
        return e instanceof Error ? e.message : 'Unknown error';
      },
    );

    const task = pipe(
      query,
      TE.map(a => a.data ?? []),
      TE.map(as =>
        as.map(a => {
          if (!a) {
            return undefined;
          }

          const decoded = Stargazer.decode(a);

          return pipe(
            decoded,
            E.fold(
              e => {
                console.error('Error decoding Stargazers', draw(e));
                return undefined;
              },
              s => s,
            ),
          );
        }),
      ),
    );

    const result = await task();

    if (E.isLeft(result)) {
      throw new Error(result.left);
    }

    return result.right;
  };
}

export const stargazerApi = new StargazerApi(api);
