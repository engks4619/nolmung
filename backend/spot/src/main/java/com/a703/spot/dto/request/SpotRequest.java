package com.a703.spot.dto.request;

import lombok.*;
import org.springframework.data.relational.core.sql.In;

import javax.annotation.RegEx;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotRequest {
    private Double lat;
    private Double lng;
    private String searchValue;
    @PositiveOrZero(message = "limit distance must be zero or postivie number")
    private Integer limitDistance;
    private String category;

}
