"use client"

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import ClientComponent from "./ClientComponent";

function Page() {
  return (
    <div>
      {/* Render Client Component after authentication */}
      <ClientComponent />
    </div>
  );
}

export default withPageAuthRequired(Page, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});