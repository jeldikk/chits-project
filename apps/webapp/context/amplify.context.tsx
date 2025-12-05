"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import config from "../amplify_outputs.json";
import React from "react";

Amplify.configure(config, {
  ssr: true,
});

interface Props {
  children: React.ReactNode;
}

export default function AmplifyProvider(props: Props) {
  return <Authenticator.Provider>{props.children}</Authenticator.Provider>;
}
