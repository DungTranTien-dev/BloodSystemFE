import React from 'react';
import { Button, Card, Typography, Result } from 'antd';
import { Link } from 'react-router-dom';
import Layout from '../../components/ui/Layout';

const { Paragraph } = Typography;

const DonateConfirm = () => {
  return (
    <Layout className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      <div className="container mx-auto px-4 py-8 lg:py-20 flex items-center justify-center">
        <Card className="max-w-lg w-full shadow-2xl border-0 rounded-2xl text-center">
            <Result
                status="success"
                title="Yêu cầu Đã Được Gửi Thành Công!"
                subTitle="Vui lòng chờ xác nhận từ nhân viên của chúng tôi. Chúng tôi sẽ sớm liên hệ với bạn."
                extra={[
                    <Paragraph key="info" className="text-gray-600 mb-4">
                        Bạn có thể xem trạng thái yêu cầu tại trang “Theo dõi yêu cầu hiến máu”.
                    </Paragraph>,
                    <Link to="/track-donation" key="track">
                        <Button type="primary" size="large" className="bg-purple-600 hover:bg-purple-700">
                            Xem trạng thái yêu cầu
                        </Button>
                    </Link>,
                    <Link to="/" key="home">
                        <Button size="large" className="mt-2">
                            Trở về Trang chủ
                        </Button>
                    </Link>
                ]}
            />
        </Card>
      </div>
    </Layout>
  );
};

export default DonateConfirm;