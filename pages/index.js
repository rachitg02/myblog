import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";

export const getStaticProps = async () => {
const url =process.env.ENDPOINT;
const graphcms =new GraphQLClient(url,{
  headers: {
    "Authorization": process.env.GRAPH_CMS_TOKEN
  }
});
const QUERY = gql`{
  posts{
    title,
    datePublished,
    content{
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      url
    }
  }
}`;
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    }
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
