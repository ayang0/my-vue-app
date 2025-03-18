# custom-spring-boot-starter 官方实践学习

[贴一个官方教程](https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html)

## 分析官方 spring-boot-starter-data-redis

### 官方仓库

打开[仓库](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project)

### 查看 redis 自动配置代码

打开 spring-boot-starter-data-redis 代码
发现里面很简单，只有一个 gradle 的构建文件

```
plugins {
	id "org.springframework.boot.starter"
}

description = "Starter for using Redis key-value data store with Spring Data Redis and the Lettuce client"

dependencies {
	api(project(":spring-boot-project:spring-boot-starters:spring-boot-starter"))
	api("io.lettuce:lettuce-core")
	api("org.springframework.data:spring-data-redis")
}
```
下面给出具体每个依赖的分析

### 基石 spring-boot-starter

找到 spring-boot-starter 库的 pom 文件或者 gradle 构建文件
打开[链接](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-starters/spring-boot-starter/build.gradle)

```
plugins {
	id "org.springframework.boot.starter"
}

description = "Core starter, including auto-configuration support, logging and YAML"

dependencies {
	api(project(":spring-boot-project:spring-boot")) // Spring Boot 引入 Spring 核心依赖
	api(project(":spring-boot-project:spring-boot-autoconfigure")) // 包括所有官方定义的 starter，即常见的 starter
	api(project(":spring-boot-project:spring-boot-starters:spring-boot-starter-logging")) // 日志
	api("jakarta.annotation:jakarta.annotation-api") // jarkarta ee标准中的annotation标准API，可以理解为中间抽象层
	api("org.springframework:spring-core") // spring核心库
	api("org.yaml:snakeyaml") // yaml解析库
}
```
spring-boot-autoconfigure库中包含了核心的自动配置文件位于META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports，可以发现里面包含了所有官方的自动配置类
扫描到对应的自动配置类（类似于SPI机制），Spring 根据机制扫描，引入该文件中的配置类，而配置类则根据条件决定是否装配。


### lettuce-core redis 客户端实现库

Redis 通信实现库。

### spring-data-redis 库

要理解 spring-data-redis 的功能，可以结合 spring-boot-autoconfigure 中的 RedisAutoConfiguration 观察就可以发现，spring-data-redis 是对 lettuce 客户端的抽象和封装，包括抽象出配置类（可以在 application.yaml 中配置参数）和核心的 RedisTemplate Bean，具体就不看实现方式了。

## 总结

可以看出实现一个官方的starter，其中有很多细节值得学习

1. 分层很优雅
   1. 一个干净的配置文件，引入所有依赖，没有具体的实现代码
   2. 具体的 XxxAutoConfiguration 文件，基于 Spring Boot 的**条件配置组件**做到自动配置
   3. 实现库-与 Spring Boot 无关
   4. 基于实现库的封装-提供核心组件 Bean 客户端最终消费的 Bean
2. 选配逻辑-利用条件装配机制可以方便选择是否适用或者将某个组件交给使用者自定义
3. 实践建议
   1. 有多个 starter 组件，那么就可以单独抽象出一个集中管理所有 starter 的 starter，类似于spring-boot-starter，比如 company-spring-boot-starter
   2. company-spring-boot-starter中引入autoconfigure，里面包含了公司所有的starter配合条件装配机制（artifactId-spring-boot-starter）
   3. 组件与 Spring Boot 的整合提供Bean组件，类似门面模式
   4. 配合依赖引入机制，按需引入，不引入额外的依赖

> 仅个人学习总结，佬们可以批评指正，欢迎交流点赞