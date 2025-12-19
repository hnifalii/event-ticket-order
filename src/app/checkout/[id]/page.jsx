import CheckoutPage from "./CheckoutPage";

export default async function Page({ params }) {
  const { id } = await params

  console.log("ID: " + id);

  return <CheckoutPage id={id} />;
}
