/** @jsx jsx */
import { NextPage } from "next";
import { withLayout } from "../components/Layout";
import { Page as MainPage } from "../components/Page";

const Page = withLayout(MainPage) as NextPage;

export default Page;
