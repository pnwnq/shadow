import { Novu } from '@novu/node';

if (!process.env.NOVU_API_KEY) {
      throw new Error('Missing Novu API Key');
}

export const novu = new Novu(process.env.NOVU_API_KEY); 