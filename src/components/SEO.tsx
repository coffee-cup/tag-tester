import * as React from "react";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../next-seo.config";

const SEO: React.FC = () => <DefaultSeo {...defaultConfig} />;

export default SEO;
