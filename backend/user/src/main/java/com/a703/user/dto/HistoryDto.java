package com.a703.user.dto;

import com.a703.user.entity.UserEntity;
import lombok.Data;

@Data
public class HistoryDto {
    private UserEntity user;
    private Boolean owner;
    private Double star;
    private String review;
    private String recordIdx;
}
