import React from 'react';
import { Button, Card, Typography, Result } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/ui/Layout';

const { Paragraph } = Typography;

const DonateConfirm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); 

  const isSuccess = status === "success";

  return (
    <Layout className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      <div className="container mx-auto px-4 py-8 lg:py-20 flex items-center justify-center">
        <Card className="max-w-lg w-full shadow-2xl border-0 rounded-2xl text-center">
          <Result
            status={isSuccess ? "success" : "error"}
            title={isSuccess ? "Yêu cầu Đã Được Gửi Thành Công!" : "Gửi Yêu Cầu Thất Bại!"}
            subTitle={
              isSuccess
                ? "Vui lòng chờ xác nhận từ nhân viên của chúng tôi. Chúng tôi sẽ sớm liên hệ với bạn."
                : "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ."
            }
            extra={[
              <Paragraph key="info" className="text-gray-600 mb-4">
                {isSuccess
                  ? "Bạn có thể xem trạng thái yêu cầu tại trang “Theo dõi yêu cầu hiến máu”."
                  : "Nếu sự cố tiếp diễn, vui lòng kiểm tra lại thông tin hoặc gọi hotline hỗ trợ."}
              </Paragraph>,
              <div key="actions" className={`flex ${isSuccess ? 'flex-row gap-4 justify-center' : 'flex-col gap-2 items-center'} w-full`}>
                {isSuccess && (
                  <Link to="/track-donation">
                    <Button
                      type="primary"
                      size="large"
                      className="w-48 px-6 py-2.5 rounded-full font-semibold text-white !bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border-0"
                      style={{ minWidth: 180 }}
                    >
                      Xem trạng thái yêu cầu
                    </Button>
                  </Link>
                )}
                <Link to="/">
                  <Button
                    size="large"
                    className="w-48 px-6 py-2.5 rounded-full font-semibold !text-white !bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border-0"
                    style={{ minWidth: 180 }}
                  >
                    Trở về Trang chủ
                  </Button>
                </Link>
              </div>
            ]}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default DonateConfirm;
