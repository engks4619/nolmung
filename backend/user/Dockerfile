FROM openjdk:11

COPY build/libs/user-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]