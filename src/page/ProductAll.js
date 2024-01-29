import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";

const ProductAll = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const { productList, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      productActions.getProductList({
        name: query.get("name"),
        category: query.get("category"),
      })
    );
  }, [query]);

  if (loading) {
    return (
      <div className="spinner">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
      <Container>
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {productList.map((i) => (
              <Col md={3} sm={12}>
                <ProductCard item={i} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
  );
};

export default ProductAll;
