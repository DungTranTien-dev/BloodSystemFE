// File: FAQ.jsx
import React from "react";
import FAQItem from "./FAQItem";

const FAQ = () => {
  // Dữ liệu câu hỏi được định nghĩa trực tiếp trong component.
  // Trong một ứng dụng thực tế, dữ liệu này có thể đến từ một API.
  const faqData = [
    {
      question: "1. Ai có thể tham gia hiến máu?",
      answer: `- Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người bệnh.\n- Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.\n- Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh lây nhiễm qua đường truyền máu khác.\n- Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.\n- Có giấy tờ tùy thân.`,
    },
    {
      question: "2. Ai là người không nên hiến máu?",
      answer: `- Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và các virus lây qua đường truyền máu.\n- Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày...`,
    },
    {
      question: "3. Máu của tôi sẽ được làm những xét nghiệm gì?",
      answer: `- Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai, sốt rét.\n- Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.`,
    },
    {
      question: "4. Máu gồm những thành phần và chức năng gì?",
      answer: `Máu là một chất lỏng lưu thông trong các mạch máu của cơ thể, gồm nhiều thành phần, mỗi thành phần làm nhiệm vụ khác nhau:\n- Hồng cầu làm nhiệm vụ vận chuyển oxy.\n- Bạch cầu làm nhiệm vụ bảo vệ cơ thể.\n- Tiểu cầu tham gia vào quá trình đông cầm máu.\n- Huyết tương: gồm nhiều thành phần khác nhau: kháng thể, các yếu tố đông máu, các chất dinh dưỡng...`,
    },
    {
      question: "5. Tại sao lại có nhiều người cần phải được truyền máu?",
      answer: `Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì :\n- Bị mất máu do chấn thương, tai nạn, thảm họa, xuất huyết tiêu hoá...\n- Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy tuỷ xương, máu khó đông...\n- Các phương pháp điều trị hiện đại cần truyền nhiều máu: phẫu thuật tim mạch, ghép tạng...`,
    },
    {
      question: "6. Nhu cầu máu điều trị ở nước ta hiện nay?",
      answer: `- Mỗi năm nước ta cần khoảng 1.800.000 đơn vị máu điều trị.\n- Máu cần cho điều trị hằng ngày, cho cấp cứu, cho dự phòng các thảm họa, tai nạn cần truyền máu với số lượng lớn.\n- Hiện tại chúng ta đã đáp ứng được khoảng 54% nhu cầu máu cho điều trị.`,
    },
    {
      question: "7. Tại sao khi tham gia hiến máu lại cần phải có giấy CMND?",
      answer:
        "Mỗi đơn vị máu đều phải có hồ sơ, trong đó có các thông tin về người hiến máu. Theo quy định, đây là một thủ tục cần thiết trong quy trình hiến máu để đảm bảo tính xác thực thông tin về người hiến máu.",
    },
    {
      question: "8. Hiến máu nhân đạo có hại đến sức khoẻ không?",
      answer: `Hiến máu theo hướng dẫn của thày thuốc không có hại cho sức khỏe. Điều đó đã được chứng minh bằng các cơ sở khoa học và cơ sở thực tế:\nCơ sở khoa học:\n- Máu có nhiều thành phần, mỗi thành phần chỉ có đời sống nhất định và luôn được thay thế, đổi mới hằng ngày. Ví dụ: Hồng cầu sống được 120 ngày, huyết tương luôn được đổi mới hằng ngày. Việc hiến dưới 1/10 lượng máu trong cơ thể thì không có hại đến sức khỏe.\n- Nhiều công trình nghiên cứu đã chứng minh rằng, sau khi hiến máu, các chỉ số máu có thay đổi chút ít nhưng vẫn nằm trong giới hạn sinh lý bình thường không hề gây ảnh hưởng đến các hoạt động thường ngày của cơ thể.\nCơ sở thực tế:\n- Thực tế đã có hàng triệu người hiến máu nhiều lần mà sức khỏe vẫn hoàn toàn tốt. Trên thế giới có người hiến máu trên 400 lần. Ở Việt Nam, người hiến máu nhiều lần nhất đã hiến gần 100 lần, sức khỏe hoàn toàn tốt.\n- Như vậy, mỗi người nếu thấy sức khoẻ tốt, không có các bệnh lây nhiễm qua đường truyền máu, đạt tiêu chuẩn hiến máu thì có thể hiến máu từ 3-4 lần trong một năm, vừa không ảnh hưởng xấu đến sức khoẻ của bản thân, vừa đảm bảo máu có chất lượng tốt, an toàn cho người bệnh.`,
    },
    {
      question: "9. Quyền lợi đối với người hiến máu tình nguyện?",
      answer: `Quyền lợi và chế độ đối với người hiến máu tình nguyện theo Thông tư số 05/2017/TT-BYT Quy định giá tối đa và chi phí phục vụ cho việc xác định giá một đơn vị máu toàn phần, chế phẩm máu đạt tiêu chuẩn:\n- Được khám và tư vấn sức khỏe miễn phí.\n- Được kiểm tra và thông báo kết quả các xét nghiệm máu (hoàn toàn bí mật): nhóm máu, HIV, virut viêm gan B, virut viêm gan C, giang mai, sốt rét. Trong trường hợp người hiến máu có nhiễm hoặc nghi ngờ các mầm bệnh này thì sẽ được Bác sỹ mời đến để tư vấn sức khỏe.\n- Được bồi dưỡng và chăm sóc theo các quy định hiện hành:\n  + Phục vụ ăn nhẹ tại chỗ: tương đương 30.000 đồng.\n  + Hỗ trợ chi phí đi lại (bằng tiền mặt): 50.000 đồng.\n  + Lựa chọn nhận quà tặng bằng hiện vật có giá trị như sau:\n    Một đơn vị máu thể tích 250 ml: 100.000 đồng.\n    Một đơn vị máu thể tích 350 ml: 150.000 đồng.\n    Một đơn vị máu thể tích 450 ml: 180.000 đồng.\n  + Được cấp giấy chứng nhận hiến máu tình nguyện của Ban chỉ đạo hiến máu nhân đạo Tỉnh, Thành phố. Ngoài giá trị về mặt tôn vinh, giấy chứng nhận hiến máu có giá trị bồi hoàn máu, số lượng máu được bồi hoàn lại tối đa bằng lượng máu người hiến máu đã hiến. Giấy Chứng nhận này có giá trị tại các bệnh viện, các cơ sở y tế công lập trên toàn quốc.`,
    },
    {
      question: "10. Khi hiến máu có thể bị nhiễm bệnh không?",
      answer:
        "Kim dây lấy máu vô trùng, chỉ sử dụng một lần cho một người, vì vậy không thể lây bệnh cho người hiến máu.",
    },
    {
      question: "11. Ngày mai tôi sẽ hiến máu, tôi nên chuẩn bị như thế nào?",
      answer: `- Tối nay bạn không nên thức quá khuya (ngủ trước 23:00).\n- Nên ăn và không uống rượu, bia trước khi hiến máu.\n- Mang giấy CMND, đủ giấy tờ tùy thân và thẻ hiến máu (nếu có) khi đi hiến máu.`,
    },
    {
      question: "12. Những trường hợp nào cần phải trì hoãn hiến máu?",
      answer: `- Những người phải trì hoãn hiến máu trong 12 tháng kể từ thời điểm:\n  + Phục hồi hoàn toàn sau các can thiệp ngoại khoa.\n  + Khỏi bệnh sau khi mắc một trong các bệnh sốt rét, giang mai, lao, uốn ván, viêm não, viêm màng não.\n  + Kết thúc đợt tiêm vắc xin phòng bệnh dại sau khi bị động vật cắn hoặc tiêm, truyền máu, chế phẩm máu và các chế phẩm sinh học nguồn gốc từ máu.\n  + Sinh con hoặc chấm dứt thai nghén.\n- Những người phải trì hoãn hiến máu trong 06 tháng kể từ thời điểm:\n  + Xăm trổ trên da.\n  + Bấm dái tai, bấm mũi, bấm rốn hoặc các vị trí khác của cơ thể.\n  + Phơi nhiễm với máu và dịch cơ thể từ người có nguy cơ hoặc đã nhiễm các bệnh lây truyền qua đường máu.\n  + Khỏi bệnh sau khi mắc một trong các bệnh thương hàn, nhiễm trùng huyết, viêm tắc động mạch, viêm tắc tĩnh mạch, viêm tuỷ xương, viêm tụy.\n- Những người phải trì hoãn hiến máu trong 04 tuần kể từ thời điểm:\n  + Khỏi bệnh sau khi mắc một trong các bệnh viêm dạ dày ruột, viêm đường tiết niệu, viêm da nhiễm trùng, viêm phế quản, viêm phổi, sởi, ho gà, quai bị, sốt xuất huyết, kiết lỵ, rubella, tả, quai bị.\n  + Kết thúc đợt tiêm vắc xin phòng rubella, sởi, thương hàn, tả, quai bị, thủy đậu, BCG.\n- Những người phải trì hoãn hiến máu trong 07 ngày kể từ thời điểm:\n  + Khỏi bệnh sau khi mắc một trong các bệnh cúm, cảm lạnh, dị ứng mũi họng, đau nửa đầu Migraine.\n  + Tiêm các loại vắc xin, trừ các loại đã được quy định tại Điểm c Khoản 1 và Điểm b Khoản 3 Điều này.\n- Một số quy định liên quan đến nghề nghiệp và hoạt động đặc thù của người hiến máu: những người làm một số công việc và thực hiện các hoạt động đặc thù sau đây chỉ hiến máu trong ngày nghỉ hoặc chỉ được thực hiện các công việc, hoạt động này sau khi hiến máu tối thiểu 12 giờ:\n  + Người làm việc trên cao hoặc dưới độ sâu: phi công, lái cần cẩu, công nhân làm việc trên cao, người leo núi, thợ mỏ, thủy thủ, thợ lặn.\n  + Người vận hành các phương tiện giao thông công cộng: lái xe buýt, lái tàu hoả, lái tàu thuỷ.\n  + Các trường hợp khác: vận động viên chuyên nghiệp, người vận động nặng, tập luyện nặng.`,
    },
    {
      question: "13. Tôi có thể hiến máu sau khi tiêm vắc xin Covid-19 không?",
      answer:
        "Khi tiêm vắc xin ngừa Covid-19, có thể tham gia hiến máu sau: 7 NGÀY, để đảm bảo bạn không bị tác dụng phụ và đảm bảo đủ sức khỏe vào ngày hiến máu.",
    },
    {
      question:
        "14. Tôi bị nhiễm Covid-19. Tôi có thể hiến máu sau khi hồi phục không?",
      answer:
        "Khi mắc bệnh Covid-19, có thể tham gia hiến máu sau: 14 ngày kể từ thời điểm có kết quả khẳng định “ÂM TÍNH” với virus Sars-CoV-2.",
    },
    {
      question:
        "15. Khi phát hiện bất thường, cảm thấy không an toàn với túi máu vừa hiến",
      answer:
        'Sau khi tham gia hiến máu, nếu phát hiện có bất cứ điều gì khiến bạn cảm thấy túi máu không an toàn với túi máu vừa hiến (chợt nhớ ra 1 hành vi nguy cơ, có sử dụng loại thuốc nào đó mà bạn quên báo bác sĩ khi thăm khám, có xét nghiệm "DƯƠNG TÍNH" với Sars-CoV-2 bằng kỹ thuật test nhanh hoặc Real time RT-PCR,...) vui lòng báo lại cho đơn vị tiếp nhận túi máu nơi mà bạn đã tham gia hiến máu.',
    },
    {
      question: "16. Cảm thấy không khỏe sau khi hiến máu?",
      answer:
        "Sau khi hiến máu, nếu có các triệu chứng chóng mặt, mệt mỏi, buồn nôn,... hãy liên hệ ngay cho đơn vị tiếp nhận máu để được hỗ trợ về mặt y khoa.",
    },
    {
      question: "17. Có dấu hiệu sưng, phù nề nơi vết chích?",
      answer:
        "Sau khi hiến máu, nếu bạn có các dấu hiệu sưng, phù nề nơi vết chích. Xin đừng quá lo lắng, hãy chườm lạnh ngay vị trí sưng đỏ và theo dõi các dấu hiệu trên, nếu không giảm sau 24 giờ hãy liên hệ lại cho đơn vị tiếp nhận máu để được hỗ trợ.",
    },
  ];
    return (
    <>
      {/* Section tiêu đề với gradient */}
      <section className="bg-gradient-to-r from-red-700 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Lưu ý quan trọng</h1>
        </div>
      </section>

      {/* Danh sách các câu hỏi FAQ */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === 0}
          />
        ))}
      </div>
    </>
  );
};

export default FAQ;
