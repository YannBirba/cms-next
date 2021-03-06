import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";
import { type NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useQuery } from "urql";
import { getHeader } from "../graphql/header";
import { ssrCache } from "../lib/graphql";
import { type Props } from "../types/Props";
import { getProps } from "../utils/getProps";
import { type Header as HeaderType } from "../types/Header";
import { type QueryResult } from "../types/QueryResult";
import config from "../utils/config.json";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";

// const Header = dynamic(() => import("../components/Header"));

const Home: NextPage<Props> = () => {
  const [result] = useQuery({
    query: getHeader,
    variables: { id: 2 },
  });
  const queryResult: QueryResult<HeaderType> = result;
  const { data, error, fetching } = queryResult;
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
    <Header className={data.css_class} headerLevel={data.header_level}>
      {data.text}
    </Header>
  );
};

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
    revalidate: config.revalidateTime,
  };
};

export default Home;
