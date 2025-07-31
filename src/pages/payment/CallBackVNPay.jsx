import React, { useEffect } from "react";
import { Result, Button, Card, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import api from "../../config/axios";

const { Paragraph, Text } = Typography;

const CallBackVNPay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const responseCode = queryParams.get("vnp_ResponseCode");
  const txnRef = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");
  const orderInfo = queryParams.get("vnp_OrderInfo");

  // Format mới: `${bloodRequestId}/${transactionId}`

const [bloodRequestId, transactionId] = orderInfo?.split("/") || [];


  const isSuccess = responseCode === "00";


  useEffect(() => {
    if (transactionId && bloodRequestId) {
      const updateStatus = async () => {
        try {
          await api.post(
            `Transaction/callback?transactionId=${transactionId}&bloodRequestId=${bloodRequestId}&status=${isSuccess ? "SUCCESS" : "FAILED"}`
          );
          console.log("Đã gửi callback thành công");
        } catch (err) {
          console.error("Gửi callback thất bại", err);
        }
      };

      updateStatus();
    }
  }, [transactionId, bloodRequestId, isSuccess]);

  return (
    <Layout className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      <div className="container mx-auto px-4 py-8 lg:py-20 flex items-center justify-center">
        <Card className="max-w-lg w-full shadow-2xl border-0 rounded-2xl text-center">
          <Result
            status={isSuccess ? "success" : "error"}
            title={isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
            subTitle={
              isSuccess
                ? "Chúng tôi đã ghi nhận thanh toán và yêu cầu máu của bạn."
                : "Thanh toán không thành công hoặc đã bị huỷ."
            }
            extra={[
              <Paragraph key="info" className="text-gray-600">
                <Text strong>Mã đơn máu:</Text> {bloodRequestId || "Không rõ"} <br />
                <Text strong>Mã giao dịch:</Text> {txnRef || "Không rõ"} <br />
                <Text strong>Số tiền:</Text>{" "}
                {amount ? `${parseInt(amount) / 100} VND` : "Không rõ"} <br />
                <Text strong>Mã phản hồi:</Text> {responseCode}
              </Paragraph>,
              <Link to="/" key="home">
                <Button size="large" className="mt-4">
                  Trở về Trang chủ
                </Button>
              </Link>,
            ]}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CallBackVNPay;
