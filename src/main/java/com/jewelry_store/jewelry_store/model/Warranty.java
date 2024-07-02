package com.jewelry_store.jewelry_store.model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Warranty {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate startDate;

    private LocalDate endDate;

    private String terms; // Điều khoản bảo hành, ví dụ: 1 năm bảo hành

   @JsonIgnore
    @OneToOne
    @JoinColumn(name = "order_id") // Tên cột trong bảng Warranty để ánh xạ tới Order
    private Orderr order; // Mối quan hệ One-to-One với Order

    // Phương thức tính toán thời gian bảo hành dựa trên totalPrice
    public void calculateWarrantyPeriod(double totalPrice) {
        // Giả sử 1000 đơn vị tiền tệ tương đương với 1 năm bảo hành
        double unitsPerYear = 1000.0; // Điều này có thể thay đổi tùy thuộc vào yêu cầu của bạn

        // Tính số năm bảo hành dựa trên tổng giá trị
        double warrantyYears = totalPrice / unitsPerYear;

        // Gán ngày bắt đầu và kết thúc dựa trên ngày tạo đơn hàng (createdAt)
        startDate = order.getCreatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        endDate = startDate.plus((long) warrantyYears, ChronoUnit.YEARS);
    }
}
