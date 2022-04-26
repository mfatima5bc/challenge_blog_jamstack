import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '../services/prismic';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicProvider>
      <PrismicPreview repositoryName={repositoryName}>
        <Header />
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
