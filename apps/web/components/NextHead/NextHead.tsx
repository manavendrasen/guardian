import Head from "next/head";
import React from "react";

interface NextHeadProps {
  title?: string;
  description?: string;
}

const NextHead: React.FC<NextHeadProps> = ({
  title = "Guardian",
  description = "Securely Share your Dev Secrets",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  );
};

export default NextHead;
