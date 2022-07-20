import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"

const Home = ({ products, bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div className="products-heading">
        <h2>
          Produk terpopuler
        </h2>
        <p>Aneka Jajanan Mesir</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner />
    </>
  );
}

export async function getServerSideProps() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData}
  }
}

export default Home;