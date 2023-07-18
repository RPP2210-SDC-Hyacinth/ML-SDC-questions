## Questions and Answers Microservice System Design for Atelier

## Overview

This project replaced the legacy API for an e-commerce website with a more efficient backend system.

## Tech Stack
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

### Description

This backend system architecture for a preexisting e-commerce web-portal focused on supporting the full dataset for the existing front-end architecture and performing at a rate of at least 1,000 client requests per second under a 1% error rate in production.

This project included completing an ETL process for the client-provided dataset, building efficient API routes to communicate with a PostgreSQL database, and implementing data-driven performance optimizations including NGINX load balancing and Redis caching.

In a production environment consisting of 5 AWS EC2 t2.micro instances (1 PostgreSQL database, 1 NGINX load balancer, 3 Node.js servers), this backend service exceeds the bare minimum client expectations, as it is able to handle over 4,500 rps with <1% error rate in production.

### Installation

Information available upon request.

### Usage

This project provides the backend system architecture for the questions and answers portion of a preexisting ecommerce website.

### Contributor

Midori Li
