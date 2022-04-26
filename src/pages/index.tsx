import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import * as prismicH from '@prismicio/helpers';
import { useEffect, useState } from 'react';
import { createClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import DateFormat from '../utils/dateformat';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({
  postsPagination: { results, next_page },
}: HomeProps): unknown {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (results) {
      return results;
    }
    return [];
  });

  useEffect(() => {
    console.log(results);
  }, []);

  // const [page_next, setPageNext] = useState(postsPagination.next_page || null);
  return (
    <>
      <Head>
        <title>Spacetraveling. | posts</title>
      </Head>
      <main className={styles.Container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={styles.references}>
                  <span>
                    <FiCalendar /> <time>{post.first_publication_date}</time>
                  </span>
                  <span>
                    <FiUser /> {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
          {/* {postsPagination?.next_page ? (
            <button type="button">Carregar mais posts</button>
          ) : null} */}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient();
  // Page document for our homepage from the CMS.
  const page = await client.getAllByType('posts', {
    orderings: {
      field: 'posts.first_publication_date',
      direction: 'desc',
    },
    page: 1,
    pageSize: 3,
    // fetch: ['posts.title', 'posts.content'],
  });
  // console.log(JSON.stringify(page, null, 2)); // see result formated
  const posts = page.map((post: Post) => {
    return {
      uid: post.uid,
      first_publication_date: DateFormat(post.first_publication_date),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
  // const data: PostPagination = {
  //   results: posts,
  //   next_page: page.next_page || null,
  // };
  // TODO
  console.log({
    props: {
      PostPagination: {
        results: posts,
        next_page: page.next_page || '',
      },
    },
  });
  return Promise.resolve({
    props: {
      PostPagination: {
        results: posts,
        next_page: page.next_page || '',
      },
    },
  });
};
