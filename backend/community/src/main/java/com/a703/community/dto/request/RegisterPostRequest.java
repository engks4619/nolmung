package com.a703.community.dto.request;

import com.a703.community.type.CategoryType;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class RegisterPostRequest {

    private List<Long> dogIdx;

    private CategoryType categoryType;

    private String subject;

    private String content;

    private String location;

    private Integer pay;

    private Boolean leadLine;

    private Boolean poopBag;

    private LocalDateTime walkDate;



}
