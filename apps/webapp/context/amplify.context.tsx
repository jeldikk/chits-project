"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { parseAmplifyConfig } from "aws-amplify/utils";
import config from "../amplify_outputs.json";
import React from "react";

const parsedConfig = parseAmplifyConfig(config);

Amplify.configure(parsedConfig, {
  ssr: true,
});

interface Props {
  children: React.ReactNode;
}

export default function AmplifyProvider(props: Props) {
  return <Authenticator.Provider>{props.children}</Authenticator.Provider>;
}
