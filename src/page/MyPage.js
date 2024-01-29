import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import { ColorRing } from "react-loader-spinner";
import "../style/orderStatus.style.css";
import CouponTable from "../component/CouponTable";
import { eventActions } from "../action/eventAction";

const MyPage = () => {
  const dispatch = useDispatch();
  const { loading, orderList } = useSelector((state) => state.order);
  const { couponList } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(orderActions.getOrder());
    dispatch(eventActions.getCouponList());
  }, []);

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
      <Row>
        <Col lg={6} className="mypage-col">
          <div className="mypage-title">주문 내역</div>
          {orderList.length === 0 ? (
            <div className="text-align-center empty-bag">
              주문한 내역이 없습니다.
            </div>
          ) : (
            orderList.map((o) => <OrderStatusCard order={o} />)
          )}
        </Col>
        <Col lg={6} className="mypage-col">
          <div className="mypage-title">쿠폰 내역</div>
          {couponList.length === 0 ? (
            <div className="text-align-center empty-bag">
              보유하신 쿠폰이 없습니다.
            </div>
          ) : (
            couponList.map((c) => <CouponTable coupon={c} />)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
