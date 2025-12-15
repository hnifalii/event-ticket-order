import { Suspense } from "react";
import CheckoutPage from "./CheckoutPage";

export default function Page({ searchParams }) {
  const id = searchParams.id

  return (<CheckoutPage id={id}/>)
}
