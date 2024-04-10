---
title: GitLab安装
lang: zh-CN
---



# GitLab 安装

GitLab 是一个 DevOps 平台，也称为 GitOps，基于 Git 提交完成CI/CD功能，本文介绍使用 Docker-Compose 安装一个 GitLab。

## 平台

macos-arm64

## 环境

docker-desktop

## 使用镜像

zengxs/gitlab:ee

## YAML脚本

```yaml
name: gitlab
services:
  gitlab:
    image: zengxs/gitlab:ee
    ports:
      - 80:80
      - 22:22
      - 443:443
    hostname: gitlab.sunyang.eu.org
    environment:
      - GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.sunyang.eu.org'"
    volumes:
      - gitlab-config:/etc/gitlab
      - gitlab-logs:/var/log/gitlab
      - gitlab-data:/var/opt/gitlab
    shm_size: 256m
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - gitlab-runner-config:/etc/gitlab-runner
volumes:
  gitlab-config:
  gitlab-logs:
  gitlab-data:
  gitlab-runner-config:
```

> [!IMPORTANT]
>
> MacOS 的 Docker 是安装在本地的一个虚拟机中，而 GitLab 是用了 PostgreSQL 数据库，如果是挂载 MacOS 的文件到虚拟机再到Docker 容器中会出现文件权限 [bug](https://github.com/docker/for-mac/issues)，建议直接建 volumes 映射到容器中使用。

> [!IMPORTANT]
>
> 使用 arm64 架构的镜像，而 GitLab 官方目前没有提供 arm64 架构的镜像，可以使用 Github 相关作者提供的镜像或者自己编译

## 参考

- [1]  [GitLab 官网 Docker 安装教程](https://docs.gitlab.com/ee/install/docker.html)
