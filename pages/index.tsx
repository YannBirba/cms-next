import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useQuery } from "urql";
import { getHeader } from "../graphql/header";
import { client, ssrCache } from "../lib/graphql";
import { Props } from "../types/Props";
import { getProps } from "../utils/getProps";

const Home: NextPage<Props> = () => {
  const [result] = useQuery({
    query: getHeader,
    variables: { id: 2 },
  });

  const { data, error, fetching } = result;
  if (fetching) {
    return <p className="bg-slate-900 text-slate-200">Loading...</p>;
  }
  if (error) {
    console.error(error);
    return (
      <p className="bg-slate-900 text-slate-200">Error: {error.message}</p>
    );
  }
  if (!data) {
    return <p className="bg-slate-900 text-slate-200">No data</p>;
  }
  return (
    <pre className="bg-slate-900 text-slate-200">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

// export const getServerSideProps: GetServerSideProps<
//   Props,
//   NextParsedUrlQuery,
//   Props
// > = async (): Promise<GetServerSidePropsResult<Props>> => {
//   await getProps(getHeader, { id: 2 });
//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//   };
// };

export const getStaticProps: GetStaticProps<
  Props,
  NextParsedUrlQuery,
  Props
> = async (): Promise<GetStaticPropsResult<Props>> => {
  await getProps(getHeader, { id: 2 });
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60,
  };
};

export default Home;
