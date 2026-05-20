import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { NotFoundView } from "../../features/404/view";

const NotFoundPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Docker Training</title>
      </Helmet>

      <NotFoundView />
    </>
  );
};

export default NotFoundPage;
