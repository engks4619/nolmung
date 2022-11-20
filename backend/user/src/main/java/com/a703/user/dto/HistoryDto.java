package com.a703.user.dto;

import com.a703.user.entity.UserEntity;
import lombok.Data;

@Data
public class HistoryDto {
    private UserEntity reviewer;
    private UserEntity reviewee;
    private Boolean owner;
    private Integer star;
    private String review;
    private String recordIdx;
    private String createdAt;
}
