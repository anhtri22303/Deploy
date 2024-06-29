import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Language } from "@mui/icons-material";

const Guarantee = () => {
  const [language, setLanguage] = useState("en");

  const programs = {
    en: [
      {
        type: "Warranty Policy",
        description:
          " Repairs or Replacements: Outline whether repairs, replacements, or refunds are offered under the warranty, and how these decisions are made. Limitations of Liability: Clarify any limitations on your liability, such as the extent of monetary compensation or the types of damages not covered. Duration: Specify the duration of the warranty period. This could be a set number of days, months, or years from the date of purchase. Modifications: State your right to modify the warranty policy and how customers will be informed of changes. Contact Information: Provide clear contact details for customers to reach out with questions or concerns about the warranty. Legal Compliance: Ensure your warranty policy complies with relevant laws and regulations in your jurisdiction.Claim Process: Explain how customers can make a warranty claim. Include details such as where to contact, what information they need to provide (like proof of purchase), and the expected timeline for resolution.Description for Warranty Policy including various conditions and details...",
      },
      {
        type: "Exchange Policy",
        description:
          "Introduction: Start with an overview of what the warranty covers and any key definitions (e.g., warranty period, eligible products Coverage: Detail what aspects of the product or service are covered under warranty. This could include defects in materials, workmanship, or specific components.Exclusions: Clearly state what is not covered by the warranty. Common exclusions include damage from misuse, unauthorized repairs, or natural wear and tear.",
      },
      {
        type: "Custom Design - Client Goods",
        description:
          "Custom design products or accessories made from precious metals with or without diamonds, colored stones...",
      },
    ],
    vi: [
      {
        type: "CHÍNH SÁCH BẢO HÀNH",
        description:
         " Sửa chữa hoặc Thay thế: Nêu rõ liệu việc sửa chữa, thay thế hoặc hoàn tiền có được cung cấp theo bảo hành hay không và cách đưa ra các quyết định này. Giới hạn trách nhiệm pháp lý: Làm rõ mọi giới hạn về trách nhiệm pháp lý của bạn, chẳng hạn như mức bồi thường bằng tiền hoặc các loại thiệt hại không Thời hạn được bảo hiểm: Chỉ định khoảng thời gian bảo hành Đây có thể là một số ngày, tháng hoặc năm nhất định kể từ ngày mua. Sửa đổi: Nêu rõ quyền sửa đổi chính sách bảo hành của bạn và cách khách hàng sẽ được thông báo về các thay đổi. Cung cấp chi tiết liên hệ rõ ràng để khách hàng có thể liên hệ khi có thắc mắc hoặc quan ngại về bảo hành Tuân thủ pháp luật: Đảm bảo chính sách bảo hành của bạn tuân thủ các luật và quy định có liên quan tại khu vực pháp lý của bạn. Quy trình yêu cầu bồi thường: Giải thích cách khách hàng có thể đưa ra yêu cầu bảo hành chi tiết như địa điểm gửi yêu cầu bảo hành. liên hệ, họ cần cung cấp thông tin gì (chẳng hạn như bằng chứng mua hàng) và thời gian giải quyết dự kiến. Mô tả về Chính sách bảo hành bao gồm các điều kiện và chi tiết khác nhau...",
      },
      {
        type: "THU ĐỔI",
        description:
         "Giới thiệu: Bắt đầu với phần tổng quan về nội dung bảo hành và bất kỳ định nghĩa chính nào (ví dụ: thời gian bảo hành, sản phẩm đủ điều kiện Phạm vi bảo hiểm: Chi tiết những khía cạnh nào của sản phẩm hoặc dịch vụ được bảo hành. Điều này có thể bao gồm các khiếm khuyết về vật liệu, tay nghề hoặc các lỗi cụ thể các thành phần loại trừ: Nêu rõ những gì không được bảo hành. Các loại trừ phổ biến bao gồm hư hỏng do sử dụng sai, sửa chữa trái phép hoặc hao mòn tự nhiên.",
      },
      {
        type: "Hàng thiết kế riêng - Hàng khách",
        description:
          "Sản phẩm trang sức hoặc phụ kiện từ kim loại quý gắn hoặc không gắn kim cương, đá màu...",
      },
    ],
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "vi" : "en"));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        startIcon={<Language />}
        onClick={toggleLanguage}
        size="medium"
        style={{
          marginBottom: "20px",
          marginRight: "20px", // Added margin to the right to align with table headers
          backgroundColor: language === "en" ? "white" : "black",
          color: language === "en" ? "black" : "white",
          fontWeight: "bold", // Added fontWeight to match table headers
        }}
      >
        {language === "en" ? "to Vn" : "to en"}
      </Button>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                {language === "en" ? "Policy Type" : "Loại Chính Sách"}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {language === "en" ? "Description" : "Mô tả"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs[language].map((program, index) => (
              <TableRow key={index} hover>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  {program.type}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>
                  {program.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Guarantee;
