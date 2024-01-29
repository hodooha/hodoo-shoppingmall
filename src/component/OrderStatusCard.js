import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { currencyFormat } from "../utils/number";
import moment from "moment";
import { badgeBg } from "../constants/order.constants";

const OrderStatusCard = ({ order }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={3}>
          <img  src={order.items[0].productId.image} alt="" height={96} />
        </Col>
        <Col md={6} xs={8} className="order-info">
          <div>
            <strong>주문번호: {order.orderNum}</strong>
          </div>

          <div className="text-12">
            {moment(order.createdAt).format("YYYY-MM-DD")}
          </div>

          <div>
            {order.items.length === 1
              ? `${order.items[0].productId.name}`
              : `${order.items[0].productId.name} 외 ${
                  order.items.length - 1
                }개`}
          </div>
          <div>₩ {currencyFormat(order.totalPrice)}</div>
        </Col>
        <Col lg={3} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg={badgeBg[order.status]}>{order.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
