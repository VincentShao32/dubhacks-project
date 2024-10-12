"use client";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const page = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default withPageAuthRequired(page, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
