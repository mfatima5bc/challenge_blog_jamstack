import * as prismic from '@prismicio/client';
import { CreateClientConfig } from '@prismicio/next';
import sm from '../../sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: { type: any; uid: any }): string {
  switch (doc.type) {
    case 'posts':
      return '/';
    case 'post':
      return `/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup
export function createClient(req = {}): any {
  const client = prismic.createClient(endpoint, {
    ...req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
}
