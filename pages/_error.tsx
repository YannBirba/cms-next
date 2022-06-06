

interface StatusCode {
  statusCode: number;
}

interface InitialsProps {
  res: StatusCode;
  err: StatusCode;
}

function Error({ statusCode }: StatusCode) {
  return <></>;
}

Error.getInitialProps = ({ res, err }: InitialsProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
