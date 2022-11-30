# README.md

# 🐕놀면멍하니

<div align="center">
    <img src="/READMEASSETS/img/Logo.png" width="30%"/>
</div>

## 1-1. 서비스 소개🐶

놀면 뭐해! 산책이나 가자~ 라는 산책가고 싶은 댕댕이의 마음을 담았습니다.  
강아지 산책 애플리케이션입니다. 강아지를 산책시킨 시간, 거리 등 산책 코스에 대한 기록을 일지로 작성할 수 있습니다. 그리고 커뮤니티 기능을 통해 대리 산책자를 구할 수도 있고, 동행자를 구할 수도 있습니다. 대리 산책자의 위치를 실시간으로 확인할 수 있어 안심하고 반려견을 맡길 수 있습니다.

## 1-2. 기획 배경

해외에서는 반려견 산책에 관한 법이 규정되어 있을 정도로, 꾸준한 산책은 중요합니다. 그러나 현실적으로 반려견 산책엔 많은 어려움이 있고, 꾸준한 산책을 장려하고 산책하는 동안 강아지 주인에게 편의성을 제공하고 싶었습니다.

강아지는 산책 중 많은 기록을 남기지만 이를 관리하기는 어렵습니다. 유의미한 기록을 정보화시켜, 견주와 강아지의 동행을 도와드립니다. 또한 애견 동반 가능 상권 정보를 얻기 어렵다는 점을 고려하여, 근처 애견 동반 카페 등의 정보를 제공하여 강아지 산책 코스 결정에 도움을 줄 예정입니다.

## 2. 팀 소개📍

| 팀원 | 양소정                                  | 김민주                     | 김창현                | 윤성도                       | 이예찬                           | 한지운                                |
| ---- | --------------------------------------- | -------------------------- | --------------------- | ---------------------------- | -------------------------------- | ------------------------------------- |
| 역할 | 팀장 / Back-end(커뮤니티 / 이미지 서버) | Back-end(채팅 / 산책 서버) | Front-end(산책 / Map) | DevOps / Back-end(유저 서버) | crawling / Full-stack(산책 스팟) | Front-end(채팅 / 커뮤니티 / 푸시알람) |

## 3. 프로젝트 진행 기간📅

2022.10.11 - 2022.11.25

## 4. 기술 스택🛠

**Front-end**

- React Native 0.70.3
- React 18.1.0
- Typescript 4.8.3
- Axios 0.27.2
- Node.js 16.18.0
- Npm 8.19.2
- reduxjs/toolkit 1.8.6
- ESLint 7.32.0
- react-native-flipper 0.174.0

**Back-end**

- JAVA 11 (openjdk 11.0.17)
- tomcat 9.0.65
- netty 4.1.84
- Spring Boot 2.7.4
- Spring Data Jpa 2.7.5
- Spring Security 5.7.5
- QueryDsl 5.0.0
- Gradle 7.5
- JWT 0.9.1
- ModelMapper 3.1.0
- MapStruct 1.5.2

**Database**

- Redis 7.0.5
- MongoDB 6.0.2
- Myql 8.0.31

**Infra**

- AWS EC2 Ubuntu 20.04
- Docker 20.10.20
- Jenkins 2.361.2
- Spring Cloud Netflix 3.1.4 (Spring Eureka)
- Spring Cloud Gateway 3.1.4

**Crawling**

- Selenium
- Scrapy

---

## 5. 기능 소개🔍

### 메인 화면

![0._home](/READMEASSETS/img/메인화면.gif)

### 채팅

![1._chat](/READMEASSETS/img/채팅.gif)

### 내 강이지 위치 보기

![8._DogGPS]/READMEASSETS/img/내강아지위치보기.gif)

### 산책 알바 후기

![2._walkreview](/READMEASSETS/img/알바후기작성.gif)

### 산책 스팟

![3._spot1](/READMEASSETS/img/산책스팟.gif)


### 산책 스팟 리뷰

![5._spotreview](/READMEASSETS/img/스팟리뷰작성.gif)

### 커뮤니티/유저후기

![6.community](/READMEASSETS/img/커뮤니티상세유저후기.gif)

### 커뮤니티 글 작성

![7._registArticle](/READMEASSETS/img/글작성.gif)

### 내 강아지 - 삭제/등록

![8._Dog](/READMEASSETS/img/내강아지관리.gif)


### 산책하기 - 본인

![10._walk](/READMEASSETS/img/산책하기-본인.gif)

## 6. 프로젝트 산출물 📖

- ERD

![image](/READMEASSETS/ERD.png)

- Server Architecture

![image](/READMEASSETS/img/Architecture.png)

- API Docs

https://documenter.getpostman.com/view/21981976/2s8YCjBWyX  
![image](/READMEASSETS/img/APIDocs.png)

- WireFrame

![image](/READMEASSETS/img/Wireframe.png)  

- 기능명세서  
[기능명세서.pdf](/READMEASSETS/docs/기능명세서.pdf)  
