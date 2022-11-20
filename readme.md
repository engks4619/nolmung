# README.md

# 🐕놀면멍하니

![logo](/uploads/79dbbfae08e5c3d65d6c6272673f89c7/logo.png)

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

![0._home](/uploads/109d6d2545b30cbd70f1760901c60b96/0._home.gif)

### 채팅

![1._chat](/uploads/6e06a15f4483b7c04109bfb9705cf8a3/1._chat.gif)

### 산책 알바 후기

![2._walkreview](/uploads/5d64245481ffc977052fd3980f0b6945/2._walkreview.gif)

### 산책 스팟

![3._spot1](/uploads/5c38eaed49c0f26ed40474245fffc4d3/3._spot1.gif)

### 산책 스팟 상세

![4._spot2](/uploads/d1f8dcf7b0a5fb88110b42e34e134dd6/4._spot2.gif)

### 산책 스팟 리뷰

![5._spotreview](/uploads/be4095d84a9c282cd38adcba90086b81/5._spotreview.gif)

### 커뮤니티

![6.community](/uploads/4715239852bbd377025d019a522e1be0/6.community.gif)

### 커뮤니티 글 작성

![7._registArticle](/uploads/0562e29c8cce3596fcfb95702a635037/7._registArticle.gif)

### 내 강아지 - 삭제

![8._deleteDog](/uploads/8e9b7f27b8a9152a75fea37423657084/8._deleteDog.gif)

### 내 강아지 - 등록

![9._registDog](/uploads/289e0afc6dd039f6f10b74dd141272a2/9._registDog.gif)

### 산책하기 - 본인

![10._walk](/uploads/73e5d7a1caa196a9874a113e383831a2/10._walk.gif)

## 6. 프로젝트 산출물 📖

- ERD

![image](/uploads/2543793e1716147d9f7c3b5b1db7e778/image.png)

- Server Architecture

![image](/uploads/bf43baced284ea484bf6ff2a29e7751b/image.png)

- API Docs

https://documenter.getpostman.com/view/21981976/2s8YCjBWyX  
![image](/uploads/6ac762d80a0b78f312f01343e46196fd/image.png)

- WireFrame

![image](/uploads/f1071b55fe10d101c1d2bcf29aaaf986/image.png)
